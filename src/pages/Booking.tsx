import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { getTrainById } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Train as TrainIcon } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const { trainId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const train = useMemo(() => getTrainById(Number(trainId)), [trainId]);
  const date = params.get("date") || new Date().toISOString().split("T")[0];

  const [seatClass, setSeatClass] = useState<"Economy" | "Business">("Economy");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!train) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Train not found</h1>
          <Button onClick={() => navigate("/search")}>Back to search</Button>
        </div>
      </div>
    );
  }

  const price = seatClass === "Business" ? Math.round(train.price * 1.6) : train.price;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const summary = {
      trainId: train.id,
      trainName: train.name,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      date,
      passengerName: name,
      passengerPhone: phone,
      seatClass,
      price,
    };
    sessionStorage.setItem("tt_pending_booking", JSON.stringify(summary));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Complete your booking</h1>
        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={submit} className="bg-card border border-border rounded-xl shadow-card p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Class</h2>
              <RadioGroup value={seatClass} onValueChange={(v) => setSeatClass(v as "Economy" | "Business")} className="grid sm:grid-cols-2 gap-3">
                {(["Economy", "Business"] as const).map((c) => {
                  const p = c === "Business" ? Math.round(train.price * 1.6) : train.price;
                  return (
                    <label key={c} className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-smooth ${seatClass === c ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={c} id={c} />
                        <div>
                          <div className="font-medium">{c}</div>
                          <div className="text-xs text-muted-foreground">{c === "Business" ? "Extra legroom & comfort" : "Standard seating"}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-primary">{p} ETB</div>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Passenger details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pname">Full name</Label>
                  <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="pphone">Phone number</Label>
                  <Input id="pphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">Continue to payment</Button>
          </form>

          <aside className="bg-card border border-border rounded-xl shadow-card p-6 h-fit md:sticky md:top-20">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <TrainIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">{train.name}</div>
                <div className="text-xs text-muted-foreground">{train.number}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-4">
              <div>
                <div className="font-bold">{train.departureTime}</div>
                <div className="text-xs text-muted-foreground">{train.from}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-right">
                <div className="font-bold">{train.arrivalTime}</div>
                <div className="text-xs text-muted-foreground">{train.to}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">Date: {date}</div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Class</span><span>{seatClass}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span>{train.duration}</span></div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span>Total</span><span className="text-primary">{price} ETB</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Booking;
