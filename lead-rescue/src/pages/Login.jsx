import { useEffect, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated, isAuthorized } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isAuthorized) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, isAuthorized, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);

      const destination =
        location.state?.from || "/app";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error(error);

      if (error?.code === "auth/invalid-credential") {
        setError("El correo o la contraseña no son correctos.");
      } else if (error?.code === "auth/user-not-found") {
        setError("No existe una cuenta con ese correo.");
      } else if (error?.code === "auth/wrong-password") {
        setError("La contraseña no es correcta.");
      } else if (error?.code === "auth/too-many-requests") {
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

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        isDark
          ? "bg-black text-white"
          : "bg-[#f5f5f7] text-black"
      }`}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${
              isDark
                ? "border-white/10 bg-white/[0.06]"
                : "border-black/10 bg-white"
            }`}
          >
            <LockKeyhole size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Lead Rescue
          </h1>

          <p
            className={`mt-2 text-sm ${
              isDark ? "text-white/50" : "text-black/50"
            }`}
          >
            Accede a tu espacio de trabajo
          </p>
        </div>

        <div
          className={`rounded-3xl border p-7 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-white/[0.05]"
              : "border-black/10 bg-white/80 shadow-xl shadow-black/5"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-white/80" : "text-black/80"
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
                    ? "border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus:border-white/25"
                    : "border-black/10 bg-white text-black placeholder:text-black/30 focus:border-black/20"
                }`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-white/80" : "text-black/80"
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
                    ? "border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus:border-white/25"
                    : "border-black/10 bg-white text-black placeholder:text-black/30 focus:border-black/20"
                }`}
              />
            </div>

            {error && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  isDark
                    ? "border-red-400/20 bg-red-400/10 text-red-200"
                    : "border-red-500/20 bg-red-50 text-red-700"
                }`}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-black py-3.5 text-sm font-semibold transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div
            className={`mt-6 pt-5 border-t flex items-center gap-3 text-xs ${
              isDark
                ? "border-white/10 text-white/40"
                : "border-black/10 text-black/40"
            }`}
          >
            <ShieldCheck size={16} />

            <span>
              Acceso privado y protegido.
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className={`block mx-auto mt-6 text-sm transition ${
            isDark
              ? "text-white/40 hover:text-white/70"
              : "text-black/40 hover:text-black/70"
          }`}
        >
          Volver a la página principal
        </button>
      </div>
    </div>
  );
}

export default Login;