const fs = require('fs');
const path = require('path');

// Función para convertir números romanos a números arábigos
function romanToArabic(roman) {
  const romanNumerals = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15, 'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19, 'XX': 20,
    'XXI': 21, 'XXII': 22, 'XXIII': 23, 'XXIV': 24, 'XXV': 25, 'XXVI': 26, 'XXVII': 27, 'XXVIII': 28, 'XXIX': 29, 'XXX': 30,
    'XXXI': 31, 'XXXII': 32, 'XXXIII': 33, 'XXXIV': 34, 'XXXV': 35, 'XXXVI': 36, 'XXXVII': 37, 'XXXVIII': 38, 'XXXIX': 39, 'XL': 40,
    'XLI': 41, 'XLII': 42, 'XLIII': 43, 'XLIV': 44, 'XLV': 45, 'XLVI': 46, 'XLVII': 47, 'XLVIII': 48, 'XLIX': 49, 'L': 50,
    'LI': 51, 'LII': 52, 'LIII': 53, 'LIV': 54, 'LV': 55, 'LVI': 56, 'LVII': 57, 'LVIII': 58, 'LIX': 59, 'LX': 60,
    'LXI': 61, 'LXII': 62, 'LXIII': 63, 'LXIV': 64, 'LXV': 65, 'LXVI': 66, 'LXVII': 67, 'LXVIII': 68, 'LXIX': 69, 'LXX': 70,
    'LXXI': 71, 'LXXII': 72, 'LXXIII': 73, 'LXXIV': 74, 'LXXV': 75, 'LXXVI': 76, 'LXXVII': 77, 'LXXVIII': 78, 'LXXIX': 79, 'LXXX': 80,
    'LXXXI': 81, 'LXXXII': 82, 'LXXXIII': 83, 'LXXXIV': 84, 'LXXXV': 85, 'LXXXVI': 86, 'LXXXVII': 87, 'LXXXVIII': 88, 'LXXXIX': 89, 'XC': 90,
    'XCI': 91, 'XCII': 92, 'XCIII': 93, 'XCIV': 94, 'XCV': 95, 'XCVI': 96, 'XCVII': 97, 'XCVIII': 98, 'XCIX': 99, 'C': 100
  };
  
  return romanNumerals[roman] || parseInt(roman) || 1;
}

// Función para limpiar el título del capítulo
function cleanChapterTitle(title) {
  // Remover "CAPÍTULO" y números romanos del inicio
  return title.replace(/^CAPÍTULO\s+[IVX]+\.?\s*–?\s*/i, '').trim();
}

// Función para adaptar la estructura
function adaptStructure(newData) {
  const adaptedStructure = {
    title: "Summa Contra Gentiles",
    author: "Saint Thomas Aquinas",
    subtitle: "On the Truth of the Catholic Faith",
    languages: ["en", "es"],
    structure: {
      books: []
    },
    metadata: {
      totalChapters: 0,
      lastUpdated: new Date().toISOString()
    }
  };

  // Mapear los títulos de los libros al inglés
  const bookTitles = {
    '1': 'God',
    '2': 'Creation', 
    '3': 'Providence',
    '4': 'Salvation'
  };

  const bookDescriptions = {
    '1': 'The first book deals with God and divine things, insofar as they can be known by natural reason.',
    '2': 'The second book treats of creatures, insofar as they proceed from God as their cause.',
    '3': 'The third book considers creatures insofar as they are ordered to God as their end.',
    '4': 'The fourth book treats of the mysteries of the faith that are above reason.'
  };

  // Adaptar cada libro
  newData.structure.books.forEach(book => {
    const adaptedBook = {
      id: book.id,
      title: bookTitles[book.id] || book.title,
      subtitle: `Book ${book.id}`,
      description: bookDescriptions[book.id] || book.description,
      chapters: []
    };

    // Adaptar cada capítulo
    book.chapters.forEach(chapter => {
      const adaptedChapter = {
        id: romanToArabic(chapter.id),
        title: cleanChapterTitle(chapter.title),
        content: {
          es: chapter.content.es,
          en: `Chapter ${romanToArabic(chapter.id)}: ${cleanChapterTitle(chapter.title)}` // Placeholder en inglés
        }
      };
      
      adaptedBook.chapters.push(adaptedChapter);
    });

    adaptedStructure.structure.books.push(adaptedBook);
    adaptedStructure.metadata.totalChapters += adaptedBook.chapters.length;
  });

  return adaptedStructure;
}

// Función principal
function main() {
  try {
    console.log('Adapting Suma Contra Gentiles structure...');
    
    // Leer el nuevo archivo
    const newFilePath = path.join(__dirname, '../public/sumaContraGentiles.json');
    const newData = JSON.parse(fs.readFileSync(newFilePath, 'utf8'));
    
    // Adaptar la estructura
    const adaptedData = adaptStructure(newData);
    
    // Guardar como contraGentiles.json
    const outputPath = path.join(__dirname, '../public/contraGentiles.json');
    fs.writeFileSync(outputPath, JSON.stringify(adaptedData, null, 2));
    
    console.log('Structure adapted successfully!');
    console.log(`Total books: ${adaptedData.structure.books.length}`);
    console.log(`Total chapters: ${adaptedData.metadata.totalChapters}`);
    console.log(`Output saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error adapting structure:', error);
  }
}

// Ejecutar si el script se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  adaptStructure,
  romanToArabic,
  cleanChapterTitle
};

