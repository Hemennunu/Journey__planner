import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Train,
  Search,
  Ticket,
  Shield,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Zap,
  Wifi,
  Coffee,
  Star,
  CheckCircle2,
  TrendingUp,
  Globe2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import heroTrain from "@/assets/hero-train.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center isolate">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroTrain}
            alt="High-speed train through Ethiopian highlands at sunset"
            width={1920}
            height={1080}
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(156_65%_18%/0.92)] via-[hsl(170_60%_24%/0.78)] to-[hsl(190_50%_32%/0.55)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Floating glow orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl animate-pulse-slow -z-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[hsl(190_60%_45%/0.35)] blur-3xl animate-pulse-slow -z-10" />

        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-white text-sm mb-8 hover-scale">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              <span className="font-medium">Ethiopia&apos;s smartest way to ride the rails</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.95]">
              Travel beyond
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-white via-primary-foreground to-[hsl(190_80%_78%)] bg-clip-text text-transparent">
                  the horizon.
                </span>
                <span className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-primary-glow to-transparent" />
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/85 mb-10 max-w-2xl font-light">
              Book seamless train journeys across Ethiopia in seconds. Real-time seats,
              instant QR tickets, zero queues — only the magic of the ride.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full bg-white text-primary hover:bg-white/90 glow-primary hover-scale"
              >
                <Link to="/search">
                  <Search className="mr-2 h-5 w-5" /> Find your train
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full glass text-white border-white/30 hover:bg-white/15 hover:text-white"
              >
                <Link to="/register">Create free account</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-xl">
              {[
                { v: "120K+", l: "Happy riders" },
                { v: "24", l: "Stations" },
                { v: "4.9★", l: "Rated journey" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 text-white">
                  <div className="text-2xl md:text-3xl font-bold">{s.v}</div>
                  <div className="text-xs md:text-sm text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom marquee of routes */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 backdrop-blur-md bg-black/20 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4 text-white/80 text-sm">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {[
                  "Addis Ababa → Adama",
                  "Addis Ababa → Dire Dawa",
                  "Addis Ababa → Hawassa",
                  "Addis Ababa → Bahir Dar",
                  "Adama → Dire Dawa",
                  "Hawassa → Addis Ababa",
                ].map((r) => (
                  <span key={r + i} className="flex items-center gap-2">
                    <Train className="h-4 w-4 text-primary-glow" />
                    {r}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative container py-24 md:py-32">
        <div className="absolute inset-0 grid-pattern -z-10" />
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="h-3.5 w-3.5" /> Why RailGo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Designed for the <span className="text-gradient">modern traveler</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to plan, book and ride — beautifully crafted from search to seat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Search,
              title: "Smart Search",
              desc: "Find the perfect train by date, route, and price with intelligent filters.",
              gradient: "from-primary/20 to-primary-glow/10",
            },
            {
              icon: Ticket,
              title: "Instant Tickets",
              desc: "Get your QR code the moment you book. Skip the queues, board the ride.",
              gradient: "from-[hsl(190_60%_45%/0.2)] to-primary/10",
            },
            {
              icon: Shield,
              title: "Secure Checkout",
              desc: "Bank-grade encryption keeps your payment details safe, every single time.",
              gradient: "from-primary-glow/20 to-[hsl(170_60%_42%/0.1)]",
            },
            {
              icon: Wifi,
              title: "Onboard Wi‑Fi",
              desc: "Stay connected throughout your journey with high-speed internet on every train.",
              gradient: "from-[hsl(200_80%_50%/0.2)] to-primary/10",
            },
            {
              icon: Coffee,
              title: "Comfort First",
              desc: "Spacious seats, café service and panoramic windows on every route.",
              gradient: "from-primary/15 to-[hsl(40_80%_60%/0.15)]",
            },
            {
              icon: Globe2,
              title: "Nationwide Network",
              desc: "From Addis to Dire Dawa — connect to every major city with one tap.",
              gradient: "from-primary-glow/20 to-primary/10",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-3xl border border-border bg-card p-8 shadow-card transition-smooth hover:shadow-elegant hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${f.gradient} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-5 shadow-elegant group-hover:scale-110 transition-transform">
                  <f.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-24 md:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              From search to seat in <span className="text-gradient">three steps</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A booking experience so smooth, you&apos;ll wonder why anyone still queues.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {[
              { n: "01", icon: Search, t: "Search routes", d: "Pick your stations and travel date." },
              { n: "02", icon: Ticket, t: "Choose your seat", d: "Compare classes, prices and times." },
              { n: "03", icon: CheckCircle2, t: "Ride with QR", d: "Pay securely and board with one scan." },
            ].map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="relative mx-auto mb-6 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow glow-primary" />
                  <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                    <s.icon className="h-9 w-9 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-9 w-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-elegant">
                    {s.n}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <TrendingUp className="h-3.5 w-3.5" /> Trending
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Popular <span className="text-gradient">routes</span>
            </h2>
          </div>
          <Button asChild variant="ghost" className="self-start md:self-auto">
            <Link to="/search">
              Explore all routes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { from: "Addis Ababa", to: "Adama", price: "150", time: "1h 30m", tag: "Quickest" },
            { from: "Addis Ababa", to: "Dire Dawa", price: "720", time: "9h 45m", tag: "Scenic" },
            { from: "Addis Ababa", to: "Hawassa", price: "380", time: "4h 20m", tag: "Popular" },
            { from: "Addis Ababa", to: "Bahir Dar", price: "650", time: "8h 10m", tag: "Lakeside" },
          ].map((r) => (
            <Link
              key={r.to}
              to="/search"
              className="group relative rounded-3xl bg-card border border-border p-6 shadow-card transition-smooth hover:shadow-elegant hover:-translate-y-2 hover:border-primary/40 overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-bl-2xl">
                {r.tag}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 mt-2">
                <MapPin className="h-3.5 w-3.5" /> From
              </div>
              <div className="font-semibold text-sm">{r.from}</div>
              <div className="my-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <Train className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <MapPin className="h-3.5 w-3.5" /> To
              </div>
              <div className="font-bold text-lg mb-4">{r.to}</div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.time}
                </div>
                <div className="text-primary font-bold">
                  <span className="text-xs text-muted-foreground font-normal">from </span>
                  {r.price} ETB
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Loved by <span className="text-gradient">thousands</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from passengers riding the new era of Ethiopian rail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Selam T.",
                role: "Weekly commuter",
                quote:
                  "Booking takes me less than a minute. The QR ticket on my phone is all I ever need now.",
              },
              {
                name: "Daniel A.",
                role: "Business traveler",
                quote:
                  "Smooth, fast, beautiful. RailGo turned a chore into something I actually look forward to.",
              },
              {
                name: "Mahlet K.",
                role: "Student",
                quote:
                  "The cheapest fares I&apos;ve found, and the seat selection is genius. Five stars all the way.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-3xl bg-card border border-border p-7 shadow-card hover:shadow-elegant transition-smooth"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-10 md:p-16 text-center text-primary-foreground shadow-elegant">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float-delayed" />
          <div className="absolute inset-0 animate-shimmer opacity-30" />

          <div className="relative max-w-2xl mx-auto">
            <Train className="h-12 w-12 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Your next journey is one click away.
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8">
              Join thousands of riders who&apos;ve made the switch to effortless rail travel.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base font-semibold rounded-full bg-white text-primary hover:bg-white/90 hover-scale"
            >
              <Link to="/search">
                Start booking now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Train className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">RailGo</span>
          </div>
          <div>© {new Date().getFullYear()} RailGo. Built for the railways of Ethiopia.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
