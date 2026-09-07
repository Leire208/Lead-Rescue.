import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LeadProvider from "./context/LeadContext";
import ThemeProvider from "./context/ThemeContext";
import LanguageProvider from "./context/LanguageContext";
import WorkspaceProvider from "./context/WorkspaceContext";
import AuthProvider from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import FollowUps from "./pages/FollowUps";
import Messages from "./pages/Messages";
import Calculator from "./pages/Calculator";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <LeadProvider>
              <BrowserRouter>
                <Routes>
                  {/* PÁGINAS PÚBLICAS */}

                  <Route
                    path="/"
                    element={<Landing />}
                  />

                  <Route
                    path="/login"
                    element={<Login />}
                  />

                  {/* APLICACIÓN PRIVADA */}

                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/app"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/app/leads"
                      element={<Leads />}
                    />

                    <Route
                      path="/app/follow-ups"
                      element={<FollowUps />}
                    />

                    <Route
                      path="/app/messages"
                      element={<Messages />}
                    />

                    <Route
                      path="/app/calculator"
                      element={<Calculator />}
                    />

                    <Route
                      path="/app/settings"
                      element={<Settings />}
                    />
                  </Route>

                  {/* RUTA DESCONOCIDA */}

                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/"
                        replace
                      />
                    }
                  />
                </Routes>
              </BrowserRouter>
            </LeadProvider>
          </WorkspaceProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;