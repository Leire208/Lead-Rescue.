const STORAGE_KEY = "lead-rescue-leads";

export function getStoredLeads() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.error("Error leyendo los leads:", error);
    return null;
  }
}

export function saveLeads(leads) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error("Error guardando los leads:", error);
  }
}

export function clearStoredLeads() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error eliminando los leads:", error);
  }
}