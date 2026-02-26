import { z } from "zod";
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "La contraseña actual es obligatoria"),
        newPassword: z
            .string()
            .min(8, "Debe tener mínimo 8 caracteres")
            .regex(/[A-Z]/, "Debe incluir una mayúscula [A-Z]")
            .regex(/[0-9]/, "Debe incluir un número [0-9]")
            .regex(/[@$!%*?&#]/, "Debe incluir un carácter especial [@$!%*?&#]"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las nuevas contraseñas no coinciden",
        path: ["confirmPassword"],
    });
