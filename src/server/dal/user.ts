import type { Role, User } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import "server-only";

export async function createUser(data: {
  email: string;
  name?: string | undefined;
  password: string;
  role?: Role;
}) {
  const user = await prisma.user.create({
    data,
  });

  return createUserDTO(user);
}

export async function createUsers(
  dataArray: Array<{
    email: string;
    name?: string | undefined;
    password: string;
    role?: Role;
  }>,
) {
  const results = await prisma.user.createMany({
    data: dataArray,
  });

  return {
    count: results.count,
  };
}

export async function deleteAllUsers() {
  const result = await prisma.user.deleteMany();
  return {
    count: result.count,
  };
}

export async function deleteManyUsers(where: { email?: string; role?: Role }) {
  const result = await prisma.user.deleteMany({
    where,
  });

  return {
    count: result.count,
  };
}

//単一ユーザ削除
export async function deleteUser(id: number) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return createUserDTO(user);
}

export async function getUsers(orderBy: { id?: "asc" | "desc" }) {
  const users = await prisma.user.findMany({
    orderBy,
  });
  return users.map((user) => createUserDTO(user));
}

function createUserDTO(userData: User) {
  return {
    email: userData.email,
    id: userData.id,
    name: userData.name,
    role: userData.role,
  };
}
