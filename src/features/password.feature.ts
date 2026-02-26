import { RESET_STORAGE_KEY, STEPS_RESET_PASSWORD_LOGIN } from "../constants";

type Step = "email" | "verify" | "reset";

export function getInitialResetState() {
    if (typeof window === "undefined") {
        return {
            step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as Step,
            email: "",
            secondsLeft: 300,
        };
    }

    const saved = localStorage.getItem(RESET_STORAGE_KEY);

    if (!saved) {
        return {
            step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as Step,
            email: "",
            secondsLeft: 300,
        };
    }

    try {
        const parsed = JSON.parse(saved);

        // 🔒 Validar que el flujo realmente esté activo
        if (!parsed?.isActive) {
            return {
                step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as Step,
                email: "",
                secondsLeft: 300,
            };
        }

        return {
            step: parsed.step ?? (STEPS_RESET_PASSWORD_LOGIN.EMAIL as Step),
            email: parsed.email ?? "",
            secondsLeft: parsed.secondsLeft ?? 300,
        };
    } catch {
        localStorage.removeItem(RESET_STORAGE_KEY);
        return {
            step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as Step,
            email: "",
            secondsLeft: 300,
        };
    }
}
