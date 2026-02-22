export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
  id: UUID;
  username: string;
  name: string;
  password: string;
  email: string;
}

export interface CreateUserInput {
  username: string;
  name: string;
  password: string;
  email: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: UUID;
}
