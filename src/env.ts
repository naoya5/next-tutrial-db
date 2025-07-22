import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DEBUG_MESSAGE: process.env.DEBUG_MESSAGE,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  server: {
    /**
     * Prisma Client がデータベースへ接続するためのデータベース接続先
     */
    DATABASE_URL: z.string().url(),
    /**
     * デバッグメッセージ
     */
    DEBUG_MESSAGE: z.string(),
    /**
     * Prisma CLI がデータベースの操作をするためのデータベース接続先
     */
    DIRECT_URL: z.string().url(),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
