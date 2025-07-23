"use client";
import type { User } from "@prisma/client";

interface UserSectionProps {
  users: User[];
}

export default function UserSection(props: UserSectionProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow">
      {props.users.map((user) => (
        <div
          className="flex items-center px-4 py-3 gap-4 hover:bg-gray-50 transition"
          key={user.id}
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">{user.name}</p>
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
        </div>
      ))}
    </div>
  );
}
