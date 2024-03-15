import { z } from "zod";

export const orderItemSchema = z.object({
  candyType: z.string().min(1),
  quantity: z.number().positive(),
});

export const addOrderSchema = z.object({
  client_name: z.string().min(2).max(50),
  dueDate: z.date(),
  candyType: z.string().optional(),
  quantity: z.number().optional(),
  orderItem: z.array(orderItemSchema),
});
