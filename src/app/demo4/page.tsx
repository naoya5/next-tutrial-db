import { getUsers } from "@/server/dal/user";

async function Page() {
  const users = await getUsers({ id: "asc" });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white/50 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 tracking-tight drop-shadow">
          ユーザーリスト
        </h1>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Page;
