import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useTickets, Ticket } from "@/context/TicketsContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Train as TrainIcon, Ticket as TicketIcon, X } from "lucide-react";
import { toast } from "sonner";

const TicketCard = ({ t, highlight, onCancel }: { t: Ticket; highlight: boolean; onCancel: (id: string) => void }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(t.id)}`;
  return (
    <div className={`rounded-xl border bg-card shadow-card overflow-hidden transition-smooth ${highlight ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
      <div className="grid sm:grid-cols-[1fr_auto]">
        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <TrainIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">{t.trainName}</div>
                <div className="text-xs text-muted-foreground">{t.trainNumber}</div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.status === "active" ? "bg-accent text-primary" : "bg-destructive/10 text-destructive"}`}>
              {t.status === "active" ? "Active" : "Cancelled"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold">{t.departureTime}</div>
              <div className="text-xs text-muted-foreground">{t.from}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="text-right">
              <div className="text-xl font-bold">{t.arrivalTime}</div>
              <div className="text-xs text-muted-foreground">{t.to}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm border-t border-border pt-4">
            <div><div className="text-xs text-muted-foreground">Passenger</div><div className="font-medium">{t.passengerName}</div></div>
            <div><div className="text-xs text-muted-foreground">Date</div><div className="font-medium flex items-center gap-1"><Calendar className="h-3 w-3" /> {t.date}</div></div>
            <div><div className="text-xs text-muted-foreground">Class</div><div className="font-medium">{t.seatClass}</div></div>
            <div><div className="text-xs text-muted-foreground">Seat</div><div className="font-medium">{t.seatNumber}</div></div>
            <div className="col-span-2"><div className="text-xs text-muted-foreground">Booking ID</div><div className="font-mono font-medium">{t.id}</div></div>
          </div>

          {t.status === "active" && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive mt-4 -ml-2" onClick={() => { onCancel(t.id); toast.success("Ticket cancelled"); }}>
              <X className="h-4 w-4 mr-1" /> Cancel ticket
            </Button>
          )}
        </div>

        <div className="bg-secondary/40 p-5 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-border">
          <img src={qrUrl} alt="ticket QR" className="h-32 w-32 rounded-lg bg-white p-2" />
          <div className="text-xs text-muted-foreground mt-2">Scan at gate</div>
          <div className="text-lg font-bold text-primary mt-2">{t.price} ETB</div>
        </div>
      </div>
    </div>
  );
};

const Tickets = () => {
  const { tickets, cancelTicket } = useTickets();
  const [params] = useSearchParams();
  const newId = params.get("new");

  const sorted = [...tickets].sort((a, b) => +new Date(b.bookedAt) - +new Date(a.bookedAt));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My tickets</h1>
        <p className="text-muted-foreground mb-6">All your bookings in one place.</p>

        {sorted.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <TicketIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h2 className="text-xl font-semibold mb-2">No tickets yet</h2>
            <p className="text-muted-foreground">Your booked tickets will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((t) => <TicketCard key={t.id} t={t} highlight={t.id === newId} onCancel={cancelTicket} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
