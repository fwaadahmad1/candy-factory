import { z } from "zod";

export const confItemSchema = z.object({
  conf_name: z.string().min(1),
  conf_setting: z.string().min(1),
});

export const addStageSchema = z.object({
  name: z.string().min(2).max(50),
  conf_name: z.string().optional(),
  conf_setting: z.string().optional(),
  conf_item: z.array(confItemSchema),
});
