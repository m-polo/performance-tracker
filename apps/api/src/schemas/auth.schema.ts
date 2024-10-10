import { z } from "zod";

export const getTokenSchema = z.object({
  name: z.string(),
  email: z.string(),
});
