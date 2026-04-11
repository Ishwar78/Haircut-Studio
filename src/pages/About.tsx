import { Target, Eye, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import Section from "@/components/Section";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
  { name: "Sophia Chen", role: "Lead Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "AI Engineer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face" },
  { name: "Luna Park", role: "Head Stylist", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face" },
];

const stats = [
  { value: "500K+", label: "Happy Users" },
  { value: "10K+", label: "Hairstyles" },
  { value: "4.9★", label: "App Rating" },
  { value: "50+", label: "Countries" },
];

const About = () => (
  <Layout>
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              About <span className="gradient-text">GlowCut</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe everyone deserves to feel confident about their hair. GlowCut combines cutting-edge AI with professional styling expertise to help you discover your perfect look — before making any commitment.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <AnimateOnScroll key={s.label} animation="fade-up" delay={i * 100}>
              <GlassCard hover={false} className="text-center py-8">
                <p className="font-display font-bold text-3xl gradient-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </GlassCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>

    <Section label="Our Values" title="What Drives Us">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Mission", desc: "To democratize hairstyling by giving everyone access to professional-level tools and advice through AI." },
          { icon: Eye, title: "Vision", desc: "A world where every person can confidently express themselves through their hairstyle." },
          { icon: Heart, title: "Values", desc: "Innovation, inclusivity, and empowerment guide everything we build and every person we serve." },
        ].map((v, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
            <GlassCard glow="primary" className="text-center h-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </GlassCard>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>

    <Section label="Team" title="Meet the Team" subtitle="The passionate people behind GlowCut.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {team.map((t, i) => (
          <AnimateOnScroll key={t.name} animation="scale" delay={i * 100}>
            <GlassCard glow="primary" className="text-center group h-full">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-border group-hover:border-primary transition-colors duration-300">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </GlassCard>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  </Layout>
);

export default About;
