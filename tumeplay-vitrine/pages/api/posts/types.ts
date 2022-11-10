import { z } from "zod";

const ZImage = z.object({
  url: z.string(),
  formats: z.optional(
    z
      .object({
        small: z.optional(
          z.object({
            url: z.string(),
          })
        ),
        thumbnail: z.optional(
          z.object({
            url: z.string(),
          })
        ),
      })
      .nullable()
  ),
});

const ZTheme = z.object({
  id: z.number(),
  title: z.string(),
  image: ZImage,
  level: z.optional(z.number()),
  color: z.string(),
  border_color: z.string(),
});
export type Theme = z.infer<typeof ZTheme>;

const ZTag = z.object({
  title: z.string(),
  image: ZImage,
});

export const ZPost = z.object({
  id: z.number(),
  title: z.string(),
  text: z.string(),
  image: ZImage,
  title_mobile: z.string(),
  thematique_mobile: ZTheme,
  etiquette: z.nullable(ZTag),
});
export type Post = z.infer<typeof ZPost>;
