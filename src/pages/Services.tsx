import { useState, useEffect } from "react";
import { Scissors, Paintbrush, Sparkles, Crown, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Section from "@/components/Section";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { adminApi } from "@/api/api";

const ICON_MAP: Record<string, any> = {
  "Haircut & Styling": Scissors,
  "Color & Highlights": Paintbrush,
  "Hair Treatments": Sparkles,
  "Beard Styling": Crown,
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminApi.getServices();
        const salonServices = data.filter((s: any) => s.category === "salon");
        const studioPlans = data.filter((s: any) => s.category === "studio");
        
        setServices(salonServices);
        setPlans(studioPlans);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Premium salon services and digital styling tools for the modern you.</p>
        </div>
      </section>

      <Section label="Salon" title="In-Studio Services">
        {loading ? (
          <div className="text-center py-10">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = ICON_MAP[s.name] || Scissors;
              return (
                <AnimateOnScroll key={s._id || i} animation="fade-up" delay={i * 100}>
                  <GlassCard glow="primary" className="flex gap-5 h-full">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
                        <span className="text-sm font-semibold text-primary">{s.price.toString().startsWith("$") ? s.price : `$${s.price}`}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                      <Button variant="hero-outline" size="sm">Book Now</Button>
                    </div>
                  </GlassCard>
                </AnimateOnScroll>
              );
            })}
          </div>
        )}
      </Section>

      <Section label="Pricing" title="Choose Your Plan" subtitle="Start free, upgrade when you need more.">
        {loading ? (
          <div className="text-center py-10">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <AnimateOnScroll key={p._id || i} animation="fade-up" delay={i * 120}>
                <GlassCard glow={p.popular ? "primary" : "none"} className={`relative h-full ${p.popular ? "border-primary/50 scale-105" : ""}`}>
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  )}
                  <div className="text-center mb-6 pt-2">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{p.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display font-bold text-4xl text-foreground">{p.price.toString().startsWith("$") ? p.price : `$${p.price}`}</span>
                      <span className="text-muted-foreground text-sm">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.description.split(",").map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {f.trim()}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.popular ? "hero" : "hero-outline"} className="w-full">
                    Get Started
                  </Button>
                </GlassCard>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Services;
