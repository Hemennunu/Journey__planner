import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTickets } from "@/context/TicketsContext";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [summary, setSummary] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });

  useEffect(() => {
    const s = sessionStorage.getItem("tt_pending_booking");
    if (!s) {
      toast.error("No booking in progress");
      navigate("/search");
      return;
    }
    setSummary(JSON.parse(s));
  }, [navigate]);

  if (!summary) return null;

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      const ticket = addTicket(summary);
      sessionStorage.removeItem("tt_pending_booking");
      toast.success("Payment successful!");
      navigate(`/tickets?new=${ticket.id}`);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Payment</h1>
        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={pay} className="bg-card border border-border rounded-xl shadow-card p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Simulated checkout — no real card required.
            </div>
            <div>
              <Label>Card number</Label>
              <Input placeholder="4242 4242 4242 4242" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
            </div>
            <div>
              <Label>Name on card</Label>
              <Input placeholder="John Doe" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
              </div>
              <div>
                <Label>CVC</Label>
                <Input placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={processing}>
              {processing ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</> : <><CreditCard className="h-4 w-4 mr-2" /> Pay {summary.price} ETB</>}
            </Button>
          </form>

          <aside className="bg-card border border-border rounded-xl shadow-card p-6 h-fit md:sticky md:top-20">
            <h3 className="font-semibold mb-3">Booking summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Train</span><span>{summary.trainName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{summary.from} → {summary.to}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{summary.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{summary.departureTime}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Passenger</span><span>{summary.passengerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Class</span><span>{summary.seatClass}</span></div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-border mt-3">
                <span>Total</span><span className="text-primary">{summary.price} ETB</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Payment;
