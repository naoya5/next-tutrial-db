import { prisma } from "@/server/db/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// zod schema for user creation
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string(),
  role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
});

// zod schema for users
const usersSchema = z.array(userSchema);

export async function DELETE() {
  try {
    await prisma.user.deleteMany({});

    return NextResponse.json(
      { message: "All users deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting users", error);
    return NextResponse.json(
      { error: "Error deleting users" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        email: true,
        id: true,
        name: true,
        password: false,
        role: true,
      },
    });

    // フロントエンドが期待する形式に合わせる
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  // 配列かどうかで単一/複数作成を判定
  if (Array.isArray(body)) {
    // 複数ユーザー作成
    const result = usersSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 },
      );
    }

    try {
      const users = await prisma.user.createMany({
        data: result.data,
        skipDuplicates: true,
      });

      return NextResponse.json({ count: users.count }, { status: 201 });
    } catch (error) {
      console.error("ユーザー作成エラー:", error);
      return NextResponse.json(
        { error: "複数ユーザーの作成に失敗しました" },
        { status: 500 },
      );
    }
  } else {
    // 単一ユーザー作成
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 },
      );
    }

    try {
      const user = await prisma.user.create({
        data: result.data,
      });

      return NextResponse.json({ user }, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: "ユーザーの作成に失敗しました" },
        { status: 500 },
      );
    }
  }
}

export async function PUT(request: NextRequest) {
  const body: unknown = await request.json();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const result = userSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      data: {
        email: result.data.email,
        name: result.data.name,
        role: result.data.role,
      },
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
