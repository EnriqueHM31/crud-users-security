import { RESET_STORAGE_KEY } from "../constants";

type Step = "email" | "verify" | "reset";

export function getInitialResetState() {
    if (typeof window === "undefined") {
        return {
            step: "email" as Step,
            email: "",
            secondsLeft: 300,
        };
    }

    const saved = localStorage.getItem(RESET_STORAGE_KEY);

    if (!saved) {
        return {
            step: "email" as Step,
            email: "",
            secondsLeft: 300,
        };
    }

    try {
        const parsed = JSON.parse(saved);

        // 🔒 Validar que el flujo realmente esté activo
        if (!parsed?.isActive) {
            return {
                step: "email" as Step,
                email: "",
                secondsLeft: 300,
            };
        }

        return {
            step: parsed.step ?? "email",
            email: parsed.email ?? "",
            secondsLeft: parsed.secondsLeft ?? 300,
        };
    } catch {
        localStorage.removeItem(RESET_STORAGE_KEY);
        return {
            step: "email" as Step,
            email: "",
            secondsLeft: 300,
        };
    }
}
