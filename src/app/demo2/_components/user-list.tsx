"use client";

import { postApi, type User, userApi } from "@/lib/route-handler-helper";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(undefined);

        //delete all posts
        await postApi.deleteAll();

        //delete all users
        await userApi.deleteAll();

        //create user
        await userApi.create({
          email: "test@test.com",
          name: "test",
          password: "test",
          role: "ADMIN",
        });

        //create multiple users
        // 複数ユーザー作成（API経由）
        await userApi.createMany([
          {
            email: "bob@example.com",
            name: "Bob",
            password: "bob",
            role: "USER",
          },
          {
            email: "charlie@example.com",
            name: "Charlie",
            password: "charlie",
            role: "USER",
          },
          {
            email: "eve@example.com",
            name: "Eve",
            password: "eve",
            role: "USER",
          },
          {
            email: "dave@example.com",
            password: "dave",
            role: "USER",
          },
        ]);

        //fetch users
        const data = await userApi.getAll();
        // APIレスポンスが期待通りの形式であることを確認
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]);
          setError("ユーザーデータの取得に失敗しました");
        }
      } catch (error_) {
        console.error("ユーザー取得エラー:", error_);
        setError("ユーザーデータの取得に失敗しました");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    void fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">名前</th>
          <th className="border border-gray-300 px-4 py-2">メール</th>
          <th className="border border-gray-300 px-4 py-2">ロール</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((user) => (
            <tr className="hover:bg-gray-50" key={user.id}>
              <td className="border border-gray-300 px-4 py-2">
                {user.name ?? "未設定"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              colSpan={3}
            >
              ユーザーが見つかりません
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
