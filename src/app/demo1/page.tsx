import { prisma } from "@/server/db/prisma";
import { Role } from "@prisma/client";

async function fetchUsers() {
  try {
    // 全投稿を削除
    await prisma.post.deleteMany();

    // 全ユーザーを削除
    await prisma.user.deleteMany();

    // ユーザーを1件作成
    await prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
        password: "password123",
        role: Role.ADMIN,
      },
    });

    // 複数ユーザーを作成
    await prisma.user.createMany({
      data: [
        {
          email: "bob@example.com",
          name: "Bob",
          password: "password123",
          role: Role.USER,
        },
        {
          email: "charlie@example.com",
          name: "Charlie",
          password: "password123",
          role: Role.USER,
        },
        {
          email: "eve@example.com",
          name: "Eve",
          password: "password123",
          role: Role.USER,
        },
        {
          email: "dave@example.com",
          password: "password123",
          role: Role.USER,
        },
      ],
    });

    // ユーザー一覧を取得
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return users;
  } catch (error) {
    console.error("データ取得エラー:", error);
    return [];
  }
}

async function Page() {
  const message = process.env.DEBUG_MESSAGE;
  const users = await fetchUsers();
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Hello Galaxy</h1>
          <p className="text-sm text-gray-500">{message}</p>
          <br />
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
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Page;
