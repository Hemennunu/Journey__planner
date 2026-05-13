import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Ticket {
  id: string;
  userId: string;
  trainId: number;
  trainName: string;
  trainNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  passengerName: string;
  passengerPhone: string;
  seatClass: "Economy" | "Business";
  seatNumber: string;
  price: number;
  status: "active" | "cancelled";
  bookedAt: string;
}

interface TicketsContextType {
  tickets: Ticket[];
  addTicket: (t: Omit<Ticket, "id" | "userId" | "status" | "bookedAt" | "seatNumber">) => Ticket;
  cancelTicket: (id: string) => void;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);
const KEY = "tt_tickets";

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const all: Ticket[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    setTickets(user ? all.filter((t) => t.userId === user.id) : []);
  }, [user]);

  const persist = (all: Ticket[]) => {
    localStorage.setItem(KEY, JSON.stringify(all));
    if (user) setTickets(all.filter((t) => t.userId === user.id));
  };

  const addTicket: TicketsContextType["addTicket"] = (t) => {
    const all: Ticket[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    const seat = `${t.seatClass === "Business" ? "B" : "E"}${Math.floor(Math.random() * 60) + 1}`;
    const ticket: Ticket = {
      ...t,
      id: "TKT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      userId: user?.id || "guest",
      status: "active",
      bookedAt: new Date().toISOString(),
      seatNumber: seat,
    };
    all.push(ticket);
    persist(all);
    return ticket;
  };

  const cancelTicket = (id: string) => {
    const all: Ticket[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    const updated = all.map((t) => (t.id === id ? { ...t, status: "cancelled" as const } : t));
    persist(updated);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, cancelTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be inside TicketsProvider");
  return ctx;
};
