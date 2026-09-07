import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WorkspaceContext = createContext(null);

const STORAGE_KEY = "lead-rescue-settings";

export const DEFAULT_WORKSPACE = {
  businessName: "Lead Rescue",
  tagline: "Recover more sales",
  email: "",
  logo: "",
  notifications: true,
};

function getStoredWorkspace() {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return DEFAULT_WORKSPACE;
    }

    const parsed = JSON.parse(stored);

    return {
      ...DEFAULT_WORKSPACE,
      ...parsed,
    };
  } catch (error) {
    console.error(
      "Error leyendo el workspace:",
      error
    );

    return DEFAULT_WORKSPACE;
  }
}

function WorkspaceProvider({ children }) {
  const [workspace, setWorkspace] =
    useState(getStoredWorkspace);

  /*
   * Persist workspace automatically.
   */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(workspace)
      );
    } catch (error) {
      console.error(
        "Error guardando el workspace:",
        error
      );
    }
  }, [workspace]);

  /*
   * Update one property.
   */

  const updateWorkspace = (
    key,
    value
  ) => {
    setWorkspace((current) => ({
      ...current,
      [key]: value,
    }));
  };

  /*
   * Update several properties
   * at once.
   */

  const updateWorkspaceMultiple = (
    updates
  ) => {
    setWorkspace((current) => ({
      ...current,
      ...updates,
    }));
  };

  /*
   * Reset branding/workspace
   * to default values.
   */

  const resetWorkspace = () => {
    setWorkspace({
      ...DEFAULT_WORKSPACE,
    });
  };

  /*
   * Remove uploaded logo.
   */

  const removeLogo = () => {
    setWorkspace((current) => ({
      ...current,
      logo: "",
    }));
  };

  /*
   * Read uploaded image as a
   * local data URL.
   */

  const uploadLogo = (file) => {
    return new Promise(
      (resolve, reject) => {
        if (!file) {
          reject(
            new Error(
              "No se ha seleccionado ningún archivo."
            )
          );

          return;
        }

        if (
          !file.type.startsWith(
            "image/"
          )
        ) {
          reject(
            new Error(
              "El archivo seleccionado no es una imagen."
            )
          );

          return;
        }

        /*
         * Keep the MVP lightweight.
         * Large images are rejected because
         * localStorage has limited capacity.
         */

        if (
          file.size >
          2 * 1024 * 1024
        ) {
          reject(
            new Error(
              "La imagen es demasiado grande. Usa una imagen de menos de 2 MB."
            )
          );

          return;
        }

        const reader =
          new FileReader();

        reader.onload = () => {
          const result =
            reader.result;

          setWorkspace(
            (current) => ({
              ...current,
              logo: result,
            })
          );

          resolve(result);
        };

        reader.onerror = () => {
          reject(
            new Error(
              "No se ha podido leer la imagen."
            )
          );
        };

        reader.readAsDataURL(file);
      }
    );
  };

  const businessName =
    workspace.businessName?.trim() ||
    "Lead Rescue";

  const tagline =
    workspace.tagline?.trim() ||
    "Recover more sales";

  const initials =
    getInitials(businessName);

  const value = useMemo(
    () => ({
      workspace,

      businessName,
      tagline,
      initials,

      updateWorkspace,
      updateWorkspaceMultiple,

      uploadLogo,
      removeLogo,

      resetWorkspace,
    }),
    [
      workspace,
      businessName,
      tagline,
      initials,
    ]
  );

  return (
    <WorkspaceContext.Provider
      value={value}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context =
    useContext(
      WorkspaceContext
    );

  if (!context) {
    throw new Error(
      "useWorkspace debe utilizarse dentro de WorkspaceProvider"
    );
  }

  return context;
}

function getInitials(name) {
  const cleanName =
    name?.trim();

  if (!cleanName) {
    return "LR";
  }

  const words =
    cleanName.split(/\s+/);

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();
}

export default WorkspaceProvider;