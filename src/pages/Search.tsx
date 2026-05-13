import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stations } from "@/lib/mockData";
import { ArrowRight, MapPin, Calendar as CalIcon, Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";

const Search = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState("Addis Ababa");
  const [to, setTo] = useState("Adama");
  const [date, setDate] = useState(today);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) {
      toast.error("Departure and destination must differ");
      return;
    }
    const params = new URLSearchParams({ from, to, date });
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-12 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Where to next?</h1>
          <p className="text-primary-foreground/90 mb-8 max-w-xl">Search trains across Ethiopia and book your seat instantly.</p>

          <form onSubmit={submit} className="bg-card text-foreground rounded-2xl shadow-elegant p-4 md:p-6 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            <div>
              <Label className="flex items-center gap-1 mb-1.5"><MapPin className="h-3.5 w-3.5" /> From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{stations.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-1 mb-1.5"><ArrowRight className="h-3.5 w-3.5" /> To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{stations.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-1 mb-1.5"><CalIcon className="h-3.5 w-3.5" /> Date</Label>
              <Input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Button type="submit" size="lg" className="md:h-10">
              <SearchIcon className="h-4 w-4 mr-2" /> Search
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Search;
