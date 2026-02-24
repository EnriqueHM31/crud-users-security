import { FaLock } from "react-icons/fa";

export interface ModalResetProps {
    changePassword: {
        newPassword: string;
        confirmPassword: string;
    };
    handleChangePassword: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ModalReset({ changePassword, handleChangePassword, handleSubmit }: ModalResetProps) {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-100">Nueva contraseña</h2>

            <form onSubmit={(e) => handleSubmit(e)} className="mt-4 grid gap-4">
                <div className="relative">
                    <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={changePassword.newPassword}
                        onChange={handleChangePassword}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-white outline-none focus:border-blue-500"
                    />
                </div>

                <div className="relative">
                    <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={changePassword.confirmPassword}
                        onChange={handleChangePassword}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-white outline-none focus:border-blue-500"
                    />
                </div>

                <button type="submit" className="rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900">
                    Actualizar contraseña
                </button>
            </form>
        </>
    );
}
