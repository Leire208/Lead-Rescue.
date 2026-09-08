import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ThemeProvider from "./context/ThemeContext";
import LanguageProvider from "./context/LanguageContext";
import WorkspaceProvider from "./context/WorkspaceContext";
import AuthProvider from "./context/AuthContext";
import LeadProvider from "./context/LeadContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import FollowUps from "./pages/FollowUps";
import Messages from "./pages/Messages";
import Calculator from "./pages/Calculator";
import Settings from "./pages/Settings";
import Demo from "./pages/Demo";

function DemoLayout() {
  return (
    <LeadProvider demoMode={true}>
      <Routes>
        <Route
          path="/"
          element={<Demo />}
        />

        <Route
          path="/leads"
          element={<Leads />}
        />

        <Route
          path="/follow-ups"
          element={<FollowUps />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/calculator"
          element={<Calculator />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Navigate to="/demo" replace />}
        />
      </Routes>
    </LeadProvider>
  );
}

function AppLayout() {
  return (
    <LeadProvider demoMode={false}>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/leads"
          element={<Leads />}
        />

        <Route
          path="/follow-ups"
          element={<FollowUps />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/calculator"
          element={<Calculator />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Navigate to="/app" replace />}
        />
      </Routes>
    </LeadProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <BrowserRouter>
              <Routes>

                {/* =========================
                    LANDING
                ========================= */}
                <Route
                  path="/"
                  element={<Landing />}
                />

                {/* =========================
                    DEMO PÚBLICA
                ========================= */}
                <Route
                  path="/demo/*"
                  element={<DemoLayout />}
                />

                {/* =========================
                    LOGIN
                ========================= */}
                <Route
                  path="/login"
                  element={<Login />}
                />

                {/* =========================
                    APP REAL
                    TODO PROTEGIDO
                ========================= */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/app/*"
                    element={<AppLayout />}
                  />
                </Route>

                {/* =========================
                    UNKNOWN ROUTES
                ========================= */}
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
          </WorkspaceProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;