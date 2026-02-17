import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Import seed data
import { pythonBasicsCards } from "../../../../prisma/seed-data/python-basics";
import { javascriptFundamentalsCards } from "../../../../prisma/seed-data/javascript-fundamentals";
import { htmlCssEssentialsCards } from "../../../../prisma/seed-data/html-css-essentials";
import { sqlFundamentalsCards } from "../../../../prisma/seed-data/sql-fundamentals";
import { gitCommandLineCards } from "../../../../prisma/seed-data/git-command-line";
import { dataStructuresAlgorithmsCards } from "../../../../prisma/seed-data/data-structures-algorithms";

const DECKS = [
  {
    name: "Python Basics",
    description:
      "Learn Python from scratch — variables, data types, loops, functions, list comprehensions, error handling, and more.",
    cards: pythonBasicsCards,
  },
  {
    name: "JavaScript Fundamentals",
    description:
      "Master JavaScript essentials — variables, arrays, objects, functions, async/await, DOM basics, and ES6+ features.",
    cards: javascriptFundamentalsCards,
  },
  {
    name: "HTML & CSS Essentials",
    description:
      "Build solid web foundations — semantic HTML, CSS selectors, box model, flexbox, grid, and responsive design.",
    cards: htmlCssEssentialsCards,
  },
  {
    name: "SQL Fundamentals",
    description:
      "Query databases with confidence — SELECT, JOINs, GROUP BY, subqueries, and data manipulation.",
    cards: sqlFundamentalsCards,
  },
  {
    name: "Git & Command Line",
    description:
      "Navigate the terminal and master version control — git commands, branching, merging, and CLI basics.",
    cards: gitCommandLineCards,
  },
  {
    name: "Data Structures & Algorithms",
    description:
      "Think like a programmer — arrays, linked lists, trees, sorting, searching, Big O, and recursion.",
    cards: dataStructuresAlgorithmsCards,
  },
];

export async function POST() {
  try {
    // Check if already seeded
    const existingDecks = await prisma.deck.count({ where: { isPrebuilt: true } });
    if (existingDecks > 0) {
      return NextResponse.json({
        message: "Already seeded",
        decks: existingDecks,
      });
    }

    const results = [];
    for (const deckData of DECKS) {
      const deck = await prisma.deck.create({
        data: {
          name: deckData.name,
          description: deckData.description,
          isPrebuilt: true,
          userId: null,
          cards: {
            create: deckData.cards.map((card, index) => ({
              type: card.type,
              front: card.front,
              back: card.back,
              codeTemplate: "codeTemplate" in card ? card.codeTemplate : null,
              codeLanguage: "codeLanguage" in card ? card.codeLanguage : null,
              expectedOutput: "expectedOutput" in card ? card.expectedOutput : null,
              codeSnippet: "codeSnippet" in card ? card.codeSnippet : null,
              blankAnswers: "blankAnswers" in card ? card.blankAnswers : [],
              position: card.position ?? index,
            })),
          },
        },
      });
      results.push({ name: deck.name, cards: deckData.cards.length });
    }

    const totalCards = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
    return NextResponse.json({
      message: "Seeding complete",
      decks: results,
      totalCards,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Seed failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
