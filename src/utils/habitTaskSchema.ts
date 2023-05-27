import { z } from "zod";

export const habitTaskSchema = z.object({
  id: z.number(),
  action: z.string(),
  day: z.coerce.number(),
  duration: z.coerce.number(),
});
