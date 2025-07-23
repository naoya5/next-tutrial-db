"use server";

import { deleteAllPosts as dalDeleteAllPosts } from "@/server/dal/post";

// 全投稿削除
export async function deleteAllPosts() {
  try {
    const result = await dalDeleteAllPosts();
    return {
      message: `全ての投稿が削除されました（${result.count}件）`,
      success: true,
    };
  } catch (error) {
    console.error("投稿削除エラー:", error);
    return { error: "全ての投稿の削除に失敗しました", success: false };
  }
}
