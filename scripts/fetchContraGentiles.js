const fs = require('fs');
const path = require('path');

// URLs de los libros de la Suma Contra Gentiles
const BOOK_URLS = {
  '1': 'https://isidore.co/aquinas/english/ContraGentiles1.htm',
  '2': 'https://isidore.co/aquinas/english/ContraGentiles2.htm',
  '3a': 'https://isidore.co/aquinas/english/ContraGentiles3a.htm',
  '3b': 'https://isidore.co/aquinas/english/ContraGentiles3b.htm',
  '4': 'https://isidore.co/aquinas/english/ContraGentiles4.htm'
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

// Función para extraer capítulos del contenido HTML
function extractChapters(htmlContent, bookId) {
  const chapters = [];
  
  // Buscar todos los capítulos y títulos
  const chapterMatches = [];
  const chapterRegex = /<span style="font-weight: bold">Chapter (\d+)<\/span>/gi;
  let match;
  
  while ((match = chapterRegex.exec(htmlContent)) !== null) {
    chapterMatches.push({
      number: parseInt(match[1]),
      index: match.index
    });
  }
  
  // Buscar todos los títulos
  const titleMatches = [];
  const titleRegex = /<span style="font-weight: bold">([^<]+)<\/span>/gi;
  let titleMatch;
  
  while ((titleMatch = titleRegex.exec(htmlContent)) !== null) {
    const title = titleMatch[1].trim();
    // Filtrar solo títulos que no son "Chapter X"
    if (!title.startsWith('Chapter ')) {
      titleMatches.push({
        title: title,
        index: titleMatch.index
      });
    }
  }
  
  // Emparejar capítulos con títulos
  for (let i = 0; i < chapterMatches.length; i++) {
    const chapter = chapterMatches[i];
    const nextChapter = chapterMatches[i + 1];
    
    // Buscar el título que sigue al capítulo
    let chapterTitle = '';
    for (const titleMatch of titleMatches) {
      if (titleMatch.index > chapter.index && 
          (!nextChapter || titleMatch.index < nextChapter.index)) {
        chapterTitle = titleMatch.title;
        break;
      }
    }
    
    // Si no se encontró título específico, usar un título genérico
    if (!chapterTitle) {
      chapterTitle = `Chapter ${chapter.number}`;
    }
    
    // Extraer el contenido del capítulo
    const chapterContent = extractChapterContent(htmlContent, chapter.number);
    
    chapters.push({
      id: chapter.number,
      title: chapterTitle,
      content: {
        en: chapterContent
      }
    });
  }
  
  return chapters;
}

// Función para extraer el contenido de un capítulo específico
function extractChapterContent(htmlContent, chapterNumber) {
  // Buscar el inicio del capítulo
  const chapterStartRegex = new RegExp(`<span style="font-weight: bold">Chapter ${chapterNumber}<\\/span>`, 'i');
  const startMatch = chapterStartRegex.exec(htmlContent);
  
  if (!startMatch) return '';
  
  const startIndex = startMatch.index;
  
  // Buscar el siguiente capítulo o el final del contenido
  const nextChapterRegex = new RegExp(`<span style="font-weight: bold">Chapter ${chapterNumber + 1}<\\/span>`, 'i');
  const nextMatch = nextChapterRegex.exec(htmlContent);
  
  const endIndex = nextMatch ? nextMatch.index : htmlContent.length;
  
  // Extraer el contenido del capítulo
  let chapterContent = htmlContent.substring(startIndex, endIndex);
  
  // Limpiar el contenido HTML
  chapterContent = cleanHtmlContent(chapterContent);
  
  return chapterContent;
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
  
  // Limpiar espacios extra y saltos de línea
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
}

// Función principal para obtener todos los libros
async function fetchAllContraGentiles() {
  const structure = {
    title: "Summa Contra Gentiles",
    author: "Saint Thomas Aquinas",
    subtitle: "On the Truth of the Catholic Faith",
    languages: ["en"],
    structure: {
      books: []
    },
    metadata: {
      totalChapters: 0,
      lastUpdated: new Date().toISOString()
    }
  };
  
  const bookTitles = {
    '1': 'God',
    '2': 'Creation',
    '3a': 'Providence (Part 1)',
    '3b': 'Providence (Part 2)',
    '4': 'Salvation'
  };
  
  const bookDescriptions = {
    '1': 'The first book deals with God and divine things, insofar as they can be known by natural reason.',
    '2': 'The second book treats of creatures, insofar as they proceed from God as their cause.',
    '3a': 'The third book (part 1) considers creatures insofar as they are ordered to God as their end.',
    '3b': 'The third book (part 2) continues the consideration of creatures ordered to God as their end.',
    '4': 'The fourth book treats of the mysteries of the faith that are above reason.'
  };
  
  for (const [bookId, url] of Object.entries(BOOK_URLS)) {
    console.log(`Fetching Book ${bookId}...`);
    
    try {
      const content = await fetchContent(url);
      const chapters = extractChapters(content, bookId);
      
      const book = {
        id: bookId,
        title: bookTitles[bookId],
        subtitle: `Book ${bookId}`,
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
    console.log('Starting to fetch Summa Contra Gentiles...');
    const structure = await fetchAllContraGentiles();
    
    const outputPath = path.join(__dirname, '../public/contraGentiles.json');
    saveToJson(structure, outputPath);
    
    console.log('Summa Contra Gentiles extraction completed!');
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
  fetchAllContraGentiles,
  extractChapters,
  cleanHtmlContent
};
