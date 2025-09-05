import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'contraGentiles.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading Contra Gentiles data:', error);
    
    // Return minimal structure if file can't be loaded
    return NextResponse.json({
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
    });
  }
}
