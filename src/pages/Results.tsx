import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { searchTrains } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Train as TrainIcon } from "lucide-react";

const Results = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || "";
  const trains = searchTrains(from, to);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Search results</div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 flex-wrap">
              {from} <ArrowRight className="h-5 w-5 text-primary" /> {to}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{date}</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/search")}>Modify search</Button>
        </div>

        {trains.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <TrainIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h2 className="text-xl font-semibold mb-2">No trains available</h2>
            <p className="text-muted-foreground mb-4">Try a different route or date.</p>
            <Button onClick={() => navigate("/search")}>Back to search</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {trains.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-card transition-smooth hover:shadow-elegant hover:border-primary/40">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
                  <div className="grid sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                        <TrainIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.number}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6 text-sm">
                      <div>
                        <div className="text-lg font-bold">{t.departureTime}</div>
                        <div className="text-xs text-muted-foreground">{t.from}</div>
                      </div>
                      <div className="flex flex-col items-center text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">{t.duration}</span>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{t.arrivalTime}</div>
                        <div className="text-xs text-muted-foreground">{t.to}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" /> {t.availableSeats} seats left
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                    <div>
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="text-2xl font-bold text-primary">{t.price} <span className="text-xs font-normal text-muted-foreground">ETB</span></div>
                    </div>
                    <Button asChild>
                      <Link to={`/booking/${t.id}?date=${date}`}>Book now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
