import { Link } from "react-router-dom";

import { Upload, Sparkles, Download, Camera, Palette, Wand2, Star, ArrowRight, ChevronRight, Zap, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Section from "@/components/Section";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";


import { useEffect, useState } from "react";
import { adminApi } from "@/api/api";


const trendingStyles = [
  { name: "Modern Fade", category: "Men", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop" },
  { name: "Textured Crop", category: "Men", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=500&fit=crop" },
  { name: "Layered Bob", category: "Women", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop" },
  { name: "Beach Waves", category: "Women", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop" },
  { name: "Pixie Cut", category: "Women", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
  { name: "Pompadour", category: "Men", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
];

const testimonials = [
  { name: "Sarah M.", role: "Fashion Blogger", text: "GlowCut completely changed how I experiment with hairstyles. The AI is incredibly accurate!", rating: 5 },
  { name: "James K.", role: "Photographer", text: "The virtual try-on is seamless. I recommend it to all my clients before their photoshoots.", rating: 5 },
  { name: "Mia C.", role: "Stylist", text: "As a professional stylist, this tool helps me communicate styles to my clients perfectly.", rating: 5 },
];

const features = [
  { icon: Camera, title: "AI Photo Analysis", desc: "Our AI analyzes your face shape, skin tone, and features to suggest perfect styles.", glow: "primary" as const },
  { icon: Palette, title: "Color Explorer", desc: "Try any hair color virtually. From natural shades to bold fashion colors.", glow: "accent" as const },
  { icon: Wand2, title: "Instant Transform", desc: "See your new look in seconds with photorealistic AI rendering.", glow: "secondary" as const },
  { icon: Zap, title: "Lightning Fast", desc: "Get results in under 3 seconds with our optimized processing pipeline.", glow: "primary" as const },
  { icon: Shield, title: "Privacy First", desc: "Your photos are processed securely and never stored without permission.", glow: "accent" as const },
  { icon: Clock, title: "Save Time", desc: "No more bad haircuts. Preview and decide before your appointment.", glow: "secondary" as const },
];



const Home = () => {
const [baList, setBaList] = useState<any[]>([]);
const [index, setIndex] = useState(0);

useEffect(() => {
  adminApi.getBeforeAfter().then((data: any) => {
    if (Array.isArray(data)) {
      setBaList(data);
    } else if (data) {
      setBaList([data]);
    }
  });
}, []);

const current = baList[index];

return (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="hero-glow bg-primary top-20 -left-40 pulse-glow" />
      <div className="hero-glow bg-accent top-40 right-[-200px] pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="hero-glow bg-secondary bottom-0 left-1/3 pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnScroll animation="fade-up" delay={100}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-8">
              <Sparkles className="w-4 h-4" /> AI-Powered Hairstyle Experience
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
              Try Your Perfect{" "}
              <span className="gradient-text">Hairstyle</span>{" "}
              Instantly
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload your photo and discover thousands of hairstyles powered by cutting-edge AI. Find your perfect look before stepping into the salon.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/try-now"><Upload className="w-5 h-5" /> Upload Photo</Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/explore">Explore Styles <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>

    {/* Features */}
    <Section label="Features" title="Why Choose GlowCut?" subtitle="Experience the next generation of hairstyle exploration with our premium tools.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
            <GlassCard glow={f.glow} className="text-center group h-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </GlassCard>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>

    {/* How it works */}
    <Section label="How It Works" title="Three Simple Steps" subtitle="Get your dream hairstyle in minutes.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { step: "01", icon: Upload, title: "Upload Photo", desc: "Take or upload a clear photo of yourself." },
          { step: "02", icon: Sparkles, title: "Choose Style", desc: "Browse our collection and pick your favorite look." },
          { step: "03", icon: Download, title: "Download", desc: "Save your styled photo and share it." },
        ].map((s, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
            <div className="relative text-center">
              <span className="font-display font-black text-7xl text-primary/10 absolute top-0 left-1/2 -translate-x-1/2">{s.step}</span>
              <div className="relative pt-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
              {i < 2 && <ChevronRight className="hidden md:block absolute right-[-24px] top-1/2 text-muted-foreground/30 w-8 h-8" />}
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>

    {/* Before/After */}
    <Section label="Results" title="See the Transformation" subtitle="Drag the slider to compare before and after styling.">
      {current && (
  <div className="relative">

    <BeforeAfterSlider
      // beforeImage={`http://localhost:5000/${current.beforeImage}`}
      // afterImage={`http://localhost:5000/${current.afterImage}`}
      beforeImage={`http://localhost:5000/${current.beforeImage?.replace(/^\/+/, "")}`}
afterImage={`http://localhost:5000/${current.afterImage?.replace(/^\/+/, "")}`}
      beforeLabel="Before"
      afterLabel="After"
    />

    {baList.length > 1 && (
      <>
        {/* LEFT */}
        <button
         onClick={() => {
  if (baList.length === 0) return;
  setIndex((prev) => (prev - 1 + baList.length) % baList.length);
}}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full z-10 hover:bg-black/80 transition"
        >
          ◀
        </button>

        {/* RIGHT */}
        <button
          onClick={() => {
  if (baList.length === 0) return;
  setIndex((prev) => (prev + 1) % baList.length);
}}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full z-10 hover:bg-black/80 transition"
        >
          ▶
        </button>
      </>
    )}

  </div>
)}
    </Section>

    {/* Trending */}
    <Section label="Trending" title="Popular Hairstyles" subtitle="Discover the most loved styles right now.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {trendingStyles.map((style, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 80}>
            <Link to="/explore" className="group relative rounded-2xl overflow-hidden aspect-[4/5] block">
              <img src={style.img} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs text-primary font-medium">{style.category}</span>
                <h3 className="font-display font-semibold text-foreground">{style.name}</h3>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>

    {/* Testimonials */}
    <Section label="Testimonials" title="Loved by Thousands" subtitle="See what our users have to say.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
            <GlassCard glow="primary" className="h-full">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </GlassCard>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimateOnScroll animation="scale">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center glass">
            <div className="hero-glow bg-primary top-0 left-1/4 pulse-glow" />
            <div className="hero-glow bg-accent bottom-0 right-1/4 pulse-glow" style={{ animationDelay: "1.5s" }} />
            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Ready to Transform Your Look?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">Join thousands of users who've found their perfect hairstyle with GlowCut.</p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/try-now">Get Started Free <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  </Layout>
  
);
};

export default Home;
