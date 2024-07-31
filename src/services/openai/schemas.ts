import { z } from "zod";

export const PhotoEvaluationSchema = z.object({
  tags: z.array(z.string()),
  score: z.number().min(1).max(10),
  titulo: z.string(),
  review: z.string(),
});

export type PhotoEvaluation = z.infer<typeof PhotoEvaluationSchema>;