import { z } from "zod";

export const ingredientItemSchema = z.object({
  ingredient: z.string().min(1),
  quantity: z.string().min(1),
});

export const addCandySchema = z.object({
  candyName: z.string().min(2).max(50),
  ingredient: z.string().optional(),
  quantity: z.string().optional(),
  ingredientItem: z.array(ingredientItemSchema),
});
