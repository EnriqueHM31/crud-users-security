export type UUID = string;

export type UserRole = "admin" | "user";

export interface User {
  id: UUID;
  username: string;
  name: string;
  password: string;
  email: string;
  role?: UserRole;
}

export interface CreateUserInput {
  username: string;
  name: string;
  password: string;
  email: string;
  role?: UserRole;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: UUID;
}
