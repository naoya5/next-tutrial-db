"use client";

import type { CreateUserData, User } from "@/lib/route-handler-helper";
import { useEffect } from "react";
import { useState } from "react";
import { createUser } from "@/app/actions/user-actions";
import { getAllUsers } from "@/app/actions/user-actions";
import { createManyUsers } from "@/app/actions/user-actions";
import { deleteAllUsers } from "@/app/actions/user-actions";
import { deleteAllPosts } from "@/app/actions/post-actions";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      // 全ユーザーを削除
      await deleteAllUsers();

      // 全投稿を削除
      await deleteAllPosts();

      // ユーザーを1件作成
      await createUser({
        email: "alice@example.com",
        name: "Alice",
        role: "ADMIN",
      });

      // 複数ユーザーを作成
      const usersToCreate: CreateUserData[] = [
        {
          email: "bob@example.com",
          name: "Bob",
          role: "USER",
        },
        {
          email: "charlie@example.com",
          name: "Charlie",
          role: "USER",
        },
        {
          email: "eve@example.com",
          name: "Eve",
          role: "USER",
        },
        {
          email: "dave@example.com",
          role: "USER",
        },
      ];
      await createManyUsers(usersToCreate);

      // ユーザー一覧を取得
      const result = await getAllUsers();
      const users =
        result.success && result.users
          ? result.users.map((u) => ({ ...u, id: String(u.id) }))
          : [];
      setUsers(users);
    }

    void fetchUsers();
  }, []);

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
        {users.map((user) => (
          <tr className="hover:bg-gray-50" key={user.id}>
            <td className="border border-gray-300 px-4 py-2">
              {user.name ?? "未設定"}
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
