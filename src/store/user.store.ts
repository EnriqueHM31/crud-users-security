import { create } from "zustand";
import type { CreateUserInput, UpdateUserInput, User, UserRole, UUID } from "../types/user.types";
import { toast } from "sonner";

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
    username: "user",
    name: "Security Analyst",
    password: "user123",
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
  findUserByCredentials: (username: string, password: string) => User | null;
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
    toast.success("Usuario creado correctamente.");
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
    toast.success("Usuario actualizado correctamente.");
  },
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
    toast.success("Usuario eliminado correctamente.");
  },
  getUserById: (id) => get().users.find((user) => user.id === id),
  findUserByCredentials: (username, password) => {
    const user = get().users.find((user) => user.username === username);
    if (!user) {
      toast.error("Usuario no encontrado.");
      return null;
    }
    if (user.password !== password) {
      toast.error("Contraseña incorrecta.");
      return null;
    }
    return user;
  }


}));
