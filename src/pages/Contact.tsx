import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // ✅ UPDATED HANDLE SUBMIT (API CONNECTED)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/inquiry/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Message Sent Successfully ✅");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Error sending message ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-16">
              <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Info cards */}
            <AnimateOnScroll animation="slide-left" className="space-y-4">
              {[
                { icon: Mail, title: "Email", value: "hello@glowcut.studio" },
                { icon: Phone, title: "Phone", value: "+1 (555) 234-5678" },
                { icon: MapPin, title: "Address", value: "123 Style Ave, San Francisco, CA 94102" },
              ].map((c) => (
                <GlassCard key={c.title} glow="primary" className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </GlassCard>
              ))}
            </AnimateOnScroll>

            {/* Form */}
            <GlassCard hover={false} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                  />
                </div>

                <Button variant="hero" size="lg" type="submit" className="w-full sm:w-auto">
                  <Send className="w-4 h-4" /> Send Message
                </Button>

              </form>
            </GlassCard>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden glass max-w-5xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="300"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
              allowFullScreen
              loading="lazy"
              title="GlowCut Studio Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;