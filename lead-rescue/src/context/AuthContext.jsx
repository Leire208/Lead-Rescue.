import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../Firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);

        if (!currentUser) {
          setProfile(null);
          setLoading(false);
          return;
        }

        console.log("UID ACTUAL:", currentUser.uid);
        console.log("EMAIL ACTUAL:", currentUser.email);

        const userRef = doc(db, "USER", currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        console.log("DOCUMENTO EXISTE:", userSnapshot.exists());

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          console.log("DATOS FIRESTORE:", userData);

          setProfile(userData);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error comprobando el usuario:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("UID LOGUEADO:", result.user.uid);
    console.log("EMAIL LOGUEADO:", result.user.email);

    const userRef = doc(db, "USER", result.user.uid);
    const userSnapshot = await getDoc(userRef);

    console.log("DOCUMENTO ENCONTRADO:", userSnapshot.exists());

    if (!userSnapshot.exists()) {
      await signOut(auth);

      throw new Error(
        "Tu cuenta existe, pero todavía no tienes autorización para acceder a Lead Rescue."
      );
    }

    const userData = userSnapshot.data();

    console.log("DATOS DEL USUARIO:", userData);
    console.log("AUTHORIZED:", userData.authorized);
    console.log("ROLE:", userData.role);
    console.log("PLAN:", userData.plan);

    if (userData.authorized !== true) {
      await signOut(auth);

      throw new Error(
        "Tu cuenta no tiene autorización para acceder a Lead Rescue."
      );
    }

    setUser(result.user);
    setProfile(userData);

    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  const isAuthenticated = Boolean(user);
  const isAuthorized = profile?.authorized === true;
  const isAdmin = profile?.role === "admin";

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login,
      logout,
      isAuthenticated,
      isAuthorized,
      isAdmin,
    }),
    [
      user,
      profile,
      loading,
      isAuthenticated,
      isAuthorized,
      isAdmin,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider."
    );
  }

  return context;
}

export default AuthProvider;