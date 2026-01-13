import z from "zod";

export const env = z
  .object({
    DATABASE_URL: z.url(),
    DATABASE_TOKEN: z.string(),
    AUTH_COOKIE_NAME: z.string(),
    AUTH_SECRET_KEY: z.string(),
  })
  .parse(process.env);
