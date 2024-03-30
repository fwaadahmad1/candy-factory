import { z } from "zod";

export const addInventorySchema = z.object({
  ingredient: z.string().min(1),
  quantity: z.number().positive(),
  reorderLevel: z.number().positive(),
});
