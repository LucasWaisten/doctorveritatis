const fs = require('fs');
const path = require('path');

// URLs de los libros de la Suma Contra Gentiles en español
const BOOK_URLS = {
  '1': 'https://tomasdeaquino.org/suma-contra-gentiles/libro-dios-su-existencia-y-su-naturaleza/',
  '2': 'https://tomasdeaquino.org/suma-contra-gentiles/libro-ii-la-creacion-y-las-criaturas/',
  '3': 'https://tomasdeaquino.org/suma-contra-gentiles/libro-iii-dios-fin-ultimo-y-gobernador-supremo/',
  '4': 'https://tomasdeaquino.org/suma-contra-gentiles/libro-iv-misterios-divinos-y-postrimerias/'
};

// Función para obtener el contenido de una URL
async function fetchContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Función para extraer los enlaces a los capítulos de una página de libro
function extractChapterLinks(htmlContent) {
  const chapters = [];
  
  // Buscar enlaces que contengan "capitulo" en el href
  const linkRegex = /<a[^>]*href="([^"]*capitulo[^"]*)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const href = match[1];
    const title = match[2].trim();
    
    // Extraer el número del capítulo del título
    const chapterNumberMatch = title.match(/CAPÍTULO\s+([IVX]+|[0-9]+)/i);
    if (chapterNumberMatch) {
      const chapterNumber = chapterNumberMatch[1];
      chapters.push({
        number: chapterNumber,
        title: title,
        url: href.startsWith('http') ? href : `https://tomasdeaquino.org${href}`
      });
    }
  }
  
  return chapters;
}

// Función para extraer el contenido de un capítulo
function extractChapterContent(htmlContent) {
  // Buscar el contenido principal del capítulo
  // Intentar diferentes patrones para encontrar el contenido
  
  // Patrón 1: Buscar contenido dentro de elementos de párrafo
  const contentRegex = /<p[^>]*>([^<]*(?:<[^>]*>[^<]*<\/[^>]*>[^<]*)*)<\/p>/gi;
  const paragraphs = [];
  let match;
  
  while ((match = contentRegex.exec(htmlContent)) !== null) {
    const paragraph = cleanHtmlContent(match[1]);
    if (paragraph.trim().length > 50) { // Solo párrafos con contenido sustancial
      paragraphs.push(paragraph);
    }
  }
  
  // Si no se encontraron párrafos, intentar con div
  if (paragraphs.length === 0) {
    const divRegex = /<div[^>]*>([^<]*(?:<[^>]*>[^<]*<\/[^>]*>[^<]*)*)<\/div>/gi;
    while ((match = divRegex.exec(htmlContent)) !== null) {
      const content = cleanHtmlContent(match[1]);
      if (content.trim().length > 50) {
        paragraphs.push(content);
      }
    }
  }
  
  return paragraphs.join('\n\n');
}

// Función para limpiar contenido HTML
function cleanHtmlContent(content) {
  // Remover tags HTML básicos
  content = content.replace(/<[^>]*>/g, '');
  
  // Remover caracteres especiales HTML
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&#8217;/g, "'");
  content = content.replace(/&#8216;/g, "'");
  content = content.replace(/&#8220;/g, '"');
  content = content.replace(/&#8221;/g, '"');
  content = content.replace(/&#8230;/g, '...');
  
  // Limpiar espacios extra y saltos de línea
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
}

// Función para obtener el contenido de un capítulo específico
async function fetchChapterContent(chapterUrl) {
  try {
    console.log(`  Fetching chapter: ${chapterUrl}`);
    const content = await fetchContent(chapterUrl);
    return extractChapterContent(content);
  } catch (error) {
    console.error(`Error fetching chapter ${chapterUrl}:`, error);
    return '';
  }
}

// Función principal para obtener todos los libros
async function fetchAllContraGentilesSpanish() {
  const structure = {
    title: "Suma Contra Gentiles",
    author: "Santo Tomás de Aquino",
    subtitle: "Sobre la Verdad de la Fe Católica",
    languages: ["es"],
    structure: {
      books: []
    },
    metadata: {
      totalChapters: 0,
      lastUpdated: new Date().toISOString()
    }
  };
  
  const bookTitles = {
    '1': 'Dios: su existencia y su naturaleza',
    '2': 'La creación y las criaturas',
    '3': 'Dios, fin último y gobernador supremo',
    '4': 'Misterios divinos y postrimerías'
  };
  
  const bookDescriptions = {
    '1': 'El primer libro trata sobre Dios y las cosas divinas, en cuanto pueden ser conocidas por la razón natural.',
    '2': 'El segundo libro trata de las criaturas, en cuanto proceden de Dios como su causa.',
    '3': 'El tercer libro considera las criaturas en cuanto están ordenadas a Dios como su fin.',
    '4': 'El cuarto libro trata de los misterios de la fe que están por encima de la razón.'
  };
  
  for (const [bookId, url] of Object.entries(BOOK_URLS)) {
    console.log(`Fetching Book ${bookId}...`);
    
    try {
      const bookPageContent = await fetchContent(url);
      const chapterLinks = extractChapterLinks(bookPageContent);
      
      console.log(`Found ${chapterLinks.length} chapters in Book ${bookId}`);
      
      const chapters = [];
      
      // Obtener el contenido de cada capítulo
      for (const chapterLink of chapterLinks) {
        const chapterContent = await fetchChapterContent(chapterLink.url);
        
        if (chapterContent.trim()) {
          chapters.push({
            id: chapterLink.number,
            title: chapterLink.title,
            content: {
              es: chapterContent
            }
          });
        }
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      const book = {
        id: bookId,
        title: bookTitles[bookId],
        subtitle: `Libro ${bookId}`,
        description: bookDescriptions[bookId],
        chapters: chapters
      };
      
      structure.structure.books.push(book);
      structure.metadata.totalChapters += chapters.length;
      
      console.log(`Book ${bookId}: ${chapters.length} chapters extracted`);
    } catch (error) {
      console.error(`Error processing Book ${bookId}:`, error);
    }
  }
  
  return structure;
}

// Función para guardar el resultado en un archivo JSON
function saveToJson(structure, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2));
    console.log(`Data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error saving file:', error);
  }
}

// Ejecutar el script
async function main() {
  try {
    console.log('Starting to fetch Suma Contra Gentiles (Spanish)...');
    const structure = await fetchAllContraGentilesSpanish();
    
    const outputPath = path.join(__dirname, '../public/sumaContraGentiles.json');
    saveToJson(structure, outputPath);
    
    console.log('Suma Contra Gentiles (Spanish) extraction completed!');
    console.log(`Total books: ${structure.structure.books.length}`);
    console.log(`Total chapters: ${structure.metadata.totalChapters}`);
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

// Ejecutar si el script se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  fetchAllContraGentilesSpanish,
  extractChapterLinks,
  extractChapterContent,
  cleanHtmlContent
};
