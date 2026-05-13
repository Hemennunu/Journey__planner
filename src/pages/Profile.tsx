import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { tickets } = useTickets();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });

  if (!user) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("All fields are required");
      return;
    }
    updateProfile(form);
    setEditing(false);
    toast.success("Profile updated");
  };

  const sorted = [...tickets].sort((a, b) => +new Date(b.bookedAt) - +new Date(a.bookedAt));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My profile</h1>

        <div className="bg-card border border-border rounded-xl shadow-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
              <UserIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xl font-bold">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>

          {editing ? (
            <form onSubmit={save} className="space-y-4 max-w-md">
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="ghost" onClick={() => { setEditing(false); setForm({ name: user.name, email: user.email, phone: user.phone }); }}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 max-w-md">
              <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm">Name</span><span className="font-medium">{user.name}</span></div>
              <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm">Email</span><span className="font-medium">{user.email}</span></div>
              <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm">Phone</span><span className="font-medium">{user.phone}</span></div>
              <Button onClick={() => setEditing(true)}>Edit profile</Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Travel history</h2>
          <Link to="/tickets" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {sorted.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card text-muted-foreground">
            No trips yet.
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.slice(0, 5).map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-lg p-4 shadow-card flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-medium flex items-center gap-2">{t.from} <ArrowRight className="h-3 w-3 text-muted-foreground" /> {t.to}</div>
                  <div className="text-xs text-muted-foreground">{t.date} • {t.trainName} • {t.seatClass}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{t.price} ETB</div>
                  <div className={`text-xs ${t.status === "active" ? "text-primary" : "text-destructive"}`}>{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
