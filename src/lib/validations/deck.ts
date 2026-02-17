import { z } from "zod";

export const deckSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  folder: z.string().max(200).optional(),
});

export const standardCardSchema = z.object({
  type: z.literal("STANDARD"),
  front: z.string().min(1, "Front content is required"),
  back: z.string().min(1, "Back content is required"),
});

export const codeCardSchema = z.object({
  type: z.literal("CODE"),
  front: z.string().min(1, "Front content is required"),
  back: z.string().min(1, "Back content is required"),
  codeTemplate: z.string().min(1, "Code template is required"),
  codeLanguage: z.enum(["javascript", "python"]),
  expectedOutput: z.string().optional(),
});

export const fillInBlankCardSchema = z.object({
  type: z.literal("FILL_IN_BLANK"),
  front: z.string().min(1, "Front content is required"),
  back: z.string().min(1, "Back content is required"),
  codeSnippet: z.string().min(1, "Code snippet is required"),
  blankAnswers: z.array(z.string()).min(1, "At least one blank answer is required"),
});

export const cardSchema = z.discriminatedUnion("type", [
  standardCardSchema,
  codeCardSchema,
  fillInBlankCardSchema,
]);

export type DeckInput = z.infer<typeof deckSchema>;
export type CardInput = z.infer<typeof cardSchema>;
