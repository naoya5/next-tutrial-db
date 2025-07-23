import { getUsers } from "@/server/dal/user";
import UserSection from "./_components/user-section";

export const dynamic = "force-dynamic";

async function Page() {
  const users = await getUsers({ id: "asc" });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-white/50 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 tracking-tight drop-shadow">
          ユーザーリスト
        </h1>
        <UserSection users={users} />
      </div>
    </main>
  );
}

export default Page;
