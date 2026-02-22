import { create } from "zustand";
import type { CreateUserInput, UpdateUserInput, User, UserRole, UUID } from "../types/user.types";

const generateUUID = (): UUID => crypto.randomUUID() as UUID;
const normalizeRole = (role: UserRole | undefined): UserRole =>
  role === "admin" ? "admin" : "user";

const initialUsers: User[] = [
  {
    id: generateUUID(),
    username: "admin",
    name: "System Admin",
    password: "admin123",
    email: "admin@security.lab",
    role: "admin",
  },
  {
    id: generateUUID(),
    username: "analyst",
    name: "Security Analyst",
    password: "analyst123",
    email: "analyst@security.lab",
    role: "user",
  },
];

interface UserState {
  users: User[];
  createUser: (payload: CreateUserInput) => User;
  updateUser: (payload: UpdateUserInput) => void;
  deleteUser: (id: UUID) => void;
  getUserById: (id: UUID) => User | undefined;
  findUserByCredentials: (username: string, password: string) => User | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: initialUsers,
  createUser: (payload) => {
    const newUser: User = {
      id: generateUUID(),
      ...payload,
      role: normalizeRole(payload.role),
    };

    set((state) => ({
      users: [...state.users, newUser],
    }));

    return newUser;
  },
  updateUser: (payload) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === payload.id
          ? {
            ...user,
            ...payload,
            role: normalizeRole(payload.role ?? user.role),
          }
          : user,
      ),
    }));
  },
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  getUserById: (id) => get().users.find((user) => user.id === id),
  findUserByCredentials: (username, password) =>
    get().users.find((user) => user.username === username && user.password === password),
}));
