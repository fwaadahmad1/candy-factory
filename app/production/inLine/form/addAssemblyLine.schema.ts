import { z } from "zod";

export const addAssemblyLineSchema = z.object({
  name: z.string().min(1),
});
