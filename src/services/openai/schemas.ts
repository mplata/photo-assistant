import { z } from "zod";

export const PhotoEvaluationSchema = z.object({
  tags: z.array(z.string()),
  score: z.number().min(1).max(10),
  titulo: z.string(),
  review: z.string(),
});

export const AlbumEvaluationSchema = z.object({
  title: z.array(z.string()).length(5),
  review: z.string(),
  photos: z.array(
    PhotoEvaluationSchema,
  ),
});

export type PhotoEvaluation = z.infer<typeof PhotoEvaluationSchema>;
export type AlbumEvaluation = z.infer<typeof AlbumEvaluationSchema>;