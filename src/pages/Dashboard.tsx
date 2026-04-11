import { User, Image, Clock, Settings, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tabs = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "saved", icon: Image, label: "Saved" },
  { id: "history", icon: Clock, label: "History" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const savedImages = [
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              <GlassCard hover={false} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display font-semibold text-foreground">Jane Doe</h2>
                <p className="text-xs text-muted-foreground">Pro Member</p>
              </GlassCard>

              <GlassCard hover={false} className="p-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === t.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </GlassCard>
            </div>

            {/* Content */}
            <div>
              {activeTab === "profile" && (
                <GlassCard hover={false}>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", value: "Jane Doe" },
                      { label: "Email", value: "jane@example.com" },
                      { label: "Phone", value: "+1 (555) 123-4567" },
                      { label: "Location", value: "San Francisco, CA" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
                        <input defaultValue={f.value} className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                      </div>
                    ))}
                  </div>
                  <Button variant="hero" className="mt-6">Save Changes</Button>
                </GlassCard>
              )}

              {activeTab === "saved" && (
                <GlassCard hover={false}>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-6">Saved Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {savedImages.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-square group cursor-pointer">
                        <img src={img} alt={`Saved ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {activeTab === "history" && (
                <GlassCard hover={false}>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-6">Edit History</h2>
                  <div className="space-y-3">
                    {["Modern Fade - Apr 10, 2026", "Beach Waves - Apr 8, 2026", "Pixie Cut - Apr 5, 2026", "Layered Bob - Apr 2, 2026"].map((item) => (
                      <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-card/30 border border-border">
                        <span className="text-sm text-foreground">{item}</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {activeTab === "settings" && (
                <GlassCard hover={false}>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-6">Settings</h2>
                  <div className="space-y-6">
                    {["Email Notifications", "Marketing Emails", "Dark Mode", "High Quality Exports"].map((s) => (
                      <div key={s} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{s}</span>
                        <button className="w-11 h-6 rounded-full bg-primary/20 relative transition-colors">
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
