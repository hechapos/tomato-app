import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { pythonBasicsCards } from "./seed-data/python-basics";
import { javascriptFundamentalsCards } from "./seed-data/javascript-fundamentals";
import { htmlCssEssentialsCards } from "./seed-data/html-css-essentials";
import { sqlFundamentalsCards } from "./seed-data/sql-fundamentals";
import { gitCommandLineCards } from "./seed-data/git-command-line";
import { dataStructuresAlgorithmsCards } from "./seed-data/data-structures-algorithms";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

async function main() {
  console.log("Seeding database...");

  // Clear existing prebuilt decks
  await prisma.deck.deleteMany({ where: { isPrebuilt: true } });

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

    console.log(
      `  Created deck: ${deck.name} (${deckData.cards.length} cards)`
    );
  }

  const totalCards = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
  console.log(`\nSeeding complete! Created ${DECKS.length} decks with ${totalCards} total cards.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
