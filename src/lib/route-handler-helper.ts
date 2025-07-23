// API通信のためのユーティリティ関数
export interface ApiResponse {
  count?: number;
  error?: string;
  message?: string;
  user?: User;
}

//ユーザー作成用
export interface CreateUserData {
  email: string;
  name?: string;
  password: string;
  role?: "ADMIN" | "USER";
}

//レスポンス用
export interface User {
  email: string;
  id: string;
  name: null | string;
  role: string;
}

export interface UsersResponse {
  users: User[];
}

//ユーザ関連のAPI
export const userApi = {
  //one user create
  create: async (userData: CreateUserData): Promise<ApiResponse> => {
    const response = await fetch("/api/users", {
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response.json() as Promise<ApiResponse>;
  },

  //multiple users create
  createMany: async (userData: CreateUserData[]): Promise<ApiResponse> => {
    const response = await fetch("api/users", {
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response.json() as Promise<ApiResponse>;
  },

  //all users fetch
  // 全ユーザー削除
  deleteAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`/api/users`, {
      method: "DELETE",
    });
    return response.json() as Promise<ApiResponse>;
  },

  // ユーザー一覧取得
  getAll: async (): Promise<UsersResponse> => {
    const response = await fetch(`/api/users`, {
      cache: "no-store",
      method: "GET",
    });
    return response.json() as Promise<UsersResponse>;
  },
};

//投稿関連API
export const postApi = {
  // 全投稿削除
  deleteAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
    });
    return response.json() as Promise<ApiResponse>;
  },
};
