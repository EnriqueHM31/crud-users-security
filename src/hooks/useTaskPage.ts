import { useEffect, useState } from "react";
import { useAuthenticatedUser } from "./useUsersStore";
import { useTaskStore } from "../store/task.store";
import { useOpen } from "./useOpen";
import type { Task } from "../types/task.types";
import type { UUID } from "../types/user.types";

export function useTaskPage() {
    const user = useAuthenticatedUser();
    const { fetchTasks, tasks, createTask, updateTask, deleteTask } = useTaskStore();
    const [taskEliminated, setTaskEliminated] = useState<Task | null>(null);

    const openModalCreateTask = useOpen();
    const openModalDeleteTask = useOpen();

    useEffect(() => {
        if (!user) return;
        void fetchTasks(user.id_usuario);
    }, [fetchTasks, user]);

    const handleSubmitCompleteTask = async ({ id_tarea }: { id_tarea: UUID }) => {
        await updateTask(id_tarea, true);
    };

    const handleSubmitDeleteTask = async () => {
        if (!taskEliminated) return;

        await deleteTask(taskEliminated.id_tarea);
        handleTaskDeleted();
    };

    const handleTaskDeletedModal = (task: Task | null) => {
        openModalDeleteTask.open();
        setTaskEliminated(task);
    };

    const handleTaskDeleted = () => {
        openModalDeleteTask.close();
        setTaskEliminated(null);
    };

    return {
        tasks,
        createTask,
        updateTask,
        deleteTask,
        handleSubmitCompleteTask,
        handleSubmitDeleteTask,
        handleTaskDeletedModal,
        handleTaskDeleted,
        openModalCreateTask,
        openModalDeleteTask,
        taskEliminated,
    };
}
