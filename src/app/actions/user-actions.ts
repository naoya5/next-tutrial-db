"use server";

import UserSchema from "@/schemas/user.schema";
import {
  createUser as dalCreateUser,
  createUsers as dalCreateUsers,
  deleteAllUsers as dalDeleteAllUsers,
  deleteUser as dalDeleteUser,
  getUsers as dalGetUsers,
} from "@/server/dal/user";
import { Role } from "@prisma/client";

// ユーザー作成用の型
export interface CreateUserData {
  email: string;
  name?: string;
  password?: string;
  role?: "ADMIN" | "USER";
}

//create users
export async function createManyUsers(userData: CreateUserData[]) {
  try {
    //validate input data
    for (const user of userData) {
      const parseResult = UserSchema.omit({ id: true }).safeParse(user);
      if (!parseResult.success) {
        throw new Error("Invalid user data");
      }
    }

    const result = await dalCreateUsers(
      userData.map((user) => ({
        email: user.email,
        name: user.name,
        password: user.password ?? "",
        role: user.role === "ADMIN" ? Role.ADMIN : Role.USER,
      })),
    );

    return {
      count: result.count,
      success: true,
    };
  } catch (error) {
    console.error("Error creating users:", error);
    return {
      error: "Failed to create users",
      success: false,
    };
  }
}

// ユーザー作成
export async function createUser(userData: CreateUserData) {
  try {
    //validate input data
    const parseResult = UserSchema.omit({ id: true }).safeParse(userData);
    if (!parseResult.success) {
      throw new Error("Invalid user data");
    }

    const user = await dalCreateUser({
      email: userData.email,
      name: userData.name,
      password: userData.password ?? "",
      role: userData.role === "ADMIN" ? Role.ADMIN : Role.USER,
    });
    return { success: true, user };
  } catch (error) {
    console.error("ユーザー作成エラー:", error);
    return { error: "ユーザーの作成に失敗しました", success: false };
  }
}

// 全ユーザー削除
export async function deleteAllUsers() {
  try {
    await dalDeleteAllUsers();
    return { message: "全ユーザーが削除されました", success: true };
  } catch (error) {
    console.error("ユーザー削除エラー:", error);
    return { error: "全ユーザーの削除に失敗しました", success: false };
  }
}

// ユーザー削除
export async function deleteUser(id: number) {
  try {
    const user = await dalDeleteUser(id);
    return { success: true, user };
  } catch (error) {
    console.error("ユーザー削除エラー:", error);
    return { error: "ユーザーの削除に失敗しました", success: false };
  }
}

// ユーザー一覧取得
export async function getAllUsers(orderBy: "asc" | "desc" = "asc") {
  try {
    const users = await dalGetUsers({ id: orderBy });
    return { success: true, users };
  } catch (error) {
    console.error("ユーザー一覧取得エラー:", error);
    return { error: "ユーザー一覧の取得に失敗しました", success: false };
  }
}
