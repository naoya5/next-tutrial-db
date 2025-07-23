import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function DELETE() {
  try {
    await prisma.post.deleteMany({});

    return NextResponse.json({ message: "全ての投稿が削除されました" });
  } catch (error) {
    console.error("投稿削除エラー:", error);
    return NextResponse.json(
      { error: "全ての投稿の削除に失敗しました" },
      { status: 500 },
    );
  }
}
