import { useEffect, useState } from "react";
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isAuthenticated,
    isAuthorized,
  } = useAuth();

  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    if (isAuthenticated && isAuthorized) {
      navigate("/app", { replace: true });
    }
  }, [
    isAuthenticated,
    isAuthorized,
    navigate,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);

      const destination =
        location.state?.from || "/app";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      if (
        error?.code === "auth/invalid-credential"
      ) {
        setError(
          "El correo o la contraseña no son correctos."
        );
      } else if (
        error?.code === "auth/user-not-found"
      ) {
        setError(
          "No existe una cuenta con ese correo."
        );
      } else if (
        error?.code === "auth/wrong-password"
      ) {
        setError(
          "La contraseña no es correcta."
        );
      } else if (
        error?.code === "auth/too-many-requests"
      ) {
        setError(
          "Demasiados intentos. Espera un momento y vuelve a intentarlo."
        );
      } else {
        setError(
          error?.message ||
            "No hemos podido iniciar sesión."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-5 py-10 transition-colors duration-300 ${
        isDark
          ? "bg-[#050505] text-white"
          : "bg-[#f7f7f7] text-black"
      }`}
    >
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="mx-auto mb-6 flex items-center gap-2"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              <Zap
                size={18}
                fill="currentColor"
              />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Lead Rescue
            </span>
          </button>

          <h1 className="text-3xl font-semibold tracking-[-0.03em]">
            Bienvenido de nuevo
          </h1>

          <p
            className={`mt-2 text-sm ${
              isDark
                ? "text-white/50"
                : "text-black/50"
            }`}
          >
            Accede a tu espacio de trabajo
          </p>
        </div>

        {/* LOGIN CARD */}
        <div
          className={`rounded-[2rem] border p-7 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-white/[0.045]"
              : "border-black/10 bg-white shadow-xl shadow-black/[0.04]"
          }`}
        >
          <div className="mb-7 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark
                  ? "bg-white/10"
                  : "bg-black/[0.05]"
              }`}
            >
              <LockKeyhole size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Iniciar sesión
              </p>

              <p
                className={`text-xs ${
                  isDark
                    ? "text-white/40"
                    : "text-black/40"
                }`}
              >
                Entra para continuar
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label
                className={`mb-2 block text-sm font-medium ${
                  isDark
                    ? "text-white/80"
                    : "text-black/80"
                }`}
              >
                Correo electrónico
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="tu@email.com"
                autoComplete="email"
                required
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition ${
                  isDark
                    ? "border-white/10 bg-white/[0.05] text-white placeholder:text-white/25 focus:border-white/30"
                    : "border-black/10 bg-black/[0.02] text-black placeholder:text-black/30 focus:border-black/25"
                }`}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                className={`mb-2 block text-sm font-medium ${
                  isDark
                    ? "text-white/80"
                    : "text-black/80"
                }`}
              >
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition ${
                  isDark
                    ? "border-white/10 bg-white/[0.05] text-white placeholder:text-white/25 focus:border-white/30"
                    : "border-black/10 bg-black/[0.02] text-black placeholder:text-black/30 focus:border-black/25"
                }`}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm leading-5 ${
                  isDark
                    ? "border-red-400/20 bg-red-400/10 text-red-200"
                    : "border-red-500/20 bg-red-50 text-red-700"
                }`}
              >
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`group flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              {loading
                ? "Entrando..."
                : "Entrar en Lead Rescue"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          {/* SECURITY */}
          <div
            className={`mt-6 flex items-center gap-3 border-t pt-5 text-xs ${
              isDark
                ? "border-white/10 text-white/40"
                : "border-black/10 text-black/40"
            }`}
          >
            <ShieldCheck size={16} />

            <span>
              Tu acceso está protegido.
            </span>
          </div>
        </div>

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className={`mx-auto mt-6 block text-sm transition ${
            isDark
              ? "text-white/40 hover:text-white/70"
              : "text-black/40 hover:text-black/70"
          }`}
        >
          ← Volver a Lead Rescue
        </button>
      </div>
    </div>
  );
}

export default Login;