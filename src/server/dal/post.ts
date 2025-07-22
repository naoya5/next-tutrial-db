import "server-only";

import { prisma } from "@/server/db/prisma";

export async function deleteAllPosts() {
  const post = await prisma.post.deleteMany();
  return {
    count: post.count,
  };
}
