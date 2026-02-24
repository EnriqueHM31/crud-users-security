export interface ModalEmailProps {
    email: string;
    handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendCode: (e: React.FormEvent) => void;
}

export default function ModalEmail({ email, handleChangeEmail, handleSendCode }: ModalEmailProps) {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-100">Recuperar contraseña</h2>
            <p className="mt-2 mb-5 text-sm text-slate-400">Ingresa tu correo electrónico para recibir un código de verificación.</p>

            <form onSubmit={handleSendCode} className="grid gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Correo electrónico"
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />

                <button type="submit" className="rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900">
                    Enviar código
                </button>
            </form>
        </>
    );
}
