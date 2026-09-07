import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const {
    loading,
    isAuthenticated,
    isAuthorized,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-sm text-white/60">
          Cargando Lead Rescue...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-xl">
          <div className="text-2xl font-semibold mb-3">
            Acceso no autorizado
          </div>

          <p className="text-white/60 text-sm leading-6 mb-6">
            Tu cuenta existe, pero todavía no tiene permiso para utilizar
            Lead Rescue.
          </p>

          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full rounded-2xl bg-white text-black py-3.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;