"use client";
import { useState, useTransition } from "react";
import { createUser, deleteUser } from "@/app/actions/user-actions";
import type { User } from "@prisma/client";

interface UserSectionProps {
  users: User[];
}

export default function UserSection(props: UserSectionProps) {
  const [form, setForm] = useState<{
    email: string;
    name: string;
    role: "ADMIN" | "USER";
  }>({
    email: "",
    name: "",
    role: "USER",
  });
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>(props.users);

  function handleUserRegisterFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value as "ADMIN" | "USER" });
  }

  // ユーザー登録関数
  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await createUser(form);
      if (res.success) {
        setForm({ email: "", name: "", role: "USER" });
        if (res.user) {
          setUsers((prev) => [...prev, res.user]);
        }
      } else {
        setError(res.error ?? "登録に失敗しました");
      }
    });
  }

  // ユーザー削除関数
  function handleDeleteUser(id: number) {
    setError("");
    startTransition(async () => {
      const res = await deleteUser(id);
      if (res.success) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        setError(res.error ?? "削除に失敗しました");
      }
    });
  }
  return (
    <div className="w-full">
      {/* ユーザー登録フォーム */}
      <form
        className="mb-8 p-4 bg-white flex flex-col gap-4"
        onSubmit={handleAddUser}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
            name="name"
            onChange={handleUserRegisterFormChange}
            placeholder="名前"
            required
            type="text"
            value={form.name}
          />
          <input
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
            name="email"
            onChange={handleUserRegisterFormChange}
            placeholder="メールアドレス"
            required
            type="email"
            value={form.email}
          />
          <select
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
            name="role"
            onChange={handleUserRegisterFormChange}
            value={form.role}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded font-bold hover:bg-purple-700 transition disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading ? "登録中..." : "ユーザー登録"}
        </button>
      </form>
      {/* ユーザーリスト */}
      <div className="w-full bg-white rounded-xl shadow">
        {users.map((user) => (
          <div
            className="flex items-center px-4 py-3 gap-4 hover:bg-gray-50 transition"
            key={user.id}
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {user.name}
              </p>
              <p className="text-sm text-blue-600 truncate">{user.email}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                user.role === "ADMIN"
                  ? "bg-purple-100 text-purple-700 border-purple-200"
                  : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              {user.role}
            </span>
            <button
              aria-label="削除"
              className="ml-4 p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center flex-shrink-0"
              onClick={() => handleDeleteUser(user.id)}
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" fill="#f87171" r="10" />
                <line
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="2"
                  x1="8"
                  x2="16"
                  y1="8"
                  y2="16"
                />
                <line
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="2"
                  x1="16"
                  x2="8"
                  y1="8"
                  y2="16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
