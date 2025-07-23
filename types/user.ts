export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: "ADMIN" | "USER";
}
