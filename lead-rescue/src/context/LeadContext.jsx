import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { demoLeads } from "../data/demoLeads";
import {
  getStoredLeads,
  saveLeads,
} from "../utils/storage";

const LeadContext = createContext(null);

function createId() {
  return `lead-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const stored = getStoredLeads();

    return stored ?? demoLeads;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    saveLeads(leads);
  }, [leads]);

  const addLead = useCallback((leadData) => {
    const today = new Date().toISOString().split("T")[0];

    const newLead = {
      id: createId(),
      name: leadData.name?.trim() || "",
      company: leadData.company?.trim() || "",
      service: leadData.service?.trim() || "",
      value: Number(leadData.value) || 0,
      status: leadData.status || "new",
      source: leadData.source || "Otro",
      lastContact: leadData.lastContact || today,
      nextFollowUp: leadData.nextFollowUp || today,
      email: leadData.email?.trim() || "",
      phone: leadData.phone?.trim() || "",
      notes: leadData.notes?.trim() || "",
      createdAt: today,
    };

    setLeads((current) => [newLead, ...current]);

    return newLead;
  }, []);

  const updateLead = useCallback((id, updates) => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              ...updates,
              value:
                updates.value !== undefined
                  ? Number(updates.value) || 0
                  : lead.value,
            }
          : lead
      )
    );
  }, []);

  const deleteLead = useCallback((id) => {
    setLeads((current) =>
      current.filter((lead) => lead.id !== id)
    );
  }, []);

  const getLead = useCallback(
    (id) => {
      return leads.find((lead) => lead.id === id) || null;
    },
    [leads]
  );

  const resetDemoData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLeads(demoLeads);
      setLoading(false);
    }, 200);
  }, []);

  const clearAllLeads = useCallback(() => {
    setLeads([]);
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;

    const active = leads.filter(
      (lead) =>
        lead.status !== "won" &&
        lead.status !== "lost"
    ).length;

    const pendingFollowUps = leads.filter(
      (lead) =>
        lead.status === "follow-up" ||
        lead.status === "proposal"
    ).length;

    const pipelineValue = leads
      .filter((lead) => lead.status !== "lost")
      .reduce(
        (totalValue, lead) =>
          totalValue + Number(lead.value || 0),
        0
      );

    const wonValue = leads
      .filter((lead) => lead.status === "won")
      .reduce(
        (totalValue, lead) =>
          totalValue + Number(lead.value || 0),
        0
      );

    const lostValue = leads
      .filter((lead) => lead.status === "lost")
      .reduce(
        (totalValue, lead) =>
          totalValue + Number(lead.value || 0),
        0
      );

    const conversionRate =
      total > 0
        ? Math.round(
            (leads.filter(
              (lead) => lead.status === "won"
            ).length /
              total) *
              100
          )
        : 0;

    return {
      total,
      active,
      pendingFollowUps,
      pipelineValue,
      wonValue,
      lostValue,
      conversionRate,
    };
  }, [leads]);

  const value = useMemo(
    () => ({
      leads,
      loading,
      stats,
      addLead,
      updateLead,
      deleteLead,
      getLead,
      resetDemoData,
      clearAllLeads,
    }),
    [
      leads,
      loading,
      stats,
      addLead,
      updateLead,
      deleteLead,
      getLead,
      resetDemoData,
      clearAllLeads,
    ]
  );

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error(
      "useLeads debe utilizarse dentro de LeadProvider"
    );
  }

  return context;
}

export default LeadProvider;