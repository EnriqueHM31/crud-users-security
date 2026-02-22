import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "../store/user.store";
import { useCurrentUserId } from "./useAuth";
import type { User } from "../types/user.types";

export const useUsers = (): User[] => useUserStore((state) => state.users);

export const useUserActions = () =>
  useUserStore(
    useShallow((state) => ({
      createUser: state.createUser,
      updateUser: state.updateUser,
      deleteUser: state.deleteUser,
    }))
  );

export const useAuthenticatedUser = (): User | undefined => {
  const currentUserId = useCurrentUserId();
  return useUserStore((state) =>
    currentUserId ? state.users.find((user) => user.id === currentUserId) : undefined,
  );
};