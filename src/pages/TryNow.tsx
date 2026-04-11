import { Upload, Undo2, Redo2, Download, Sun, Contrast, Droplets, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const stylePresets = [
  { name: "Fade", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=120&h=120&fit=crop" },
  { name: "Bob", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=120&h=120&fit=crop" },
  { name: "Waves", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=120&h=120&fit=crop" },
  { name: "Pixie", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop" },
  { name: "Pomp", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
  { name: "Crop", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=120&h=120&fit=crop" },
];

const TryNow = () => {
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);

  return (
    <Layout>
      <section className="py-6 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 lg:px-8 h-full">
          {/* Top bar */}
          <div className="glass-strong rounded-2xl p-3 flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Undo2 className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><Redo2 className="w-4 h-4" /></Button>
            </div>
            <h1 className="font-display font-semibold text-foreground">Style Editor</h1>
            <Button variant="hero" size="sm"><Download className="w-4 h-4" /> Export</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-4">
            {/* Left panel */}
            <div className="glass-strong rounded-2xl p-4 space-y-4 hidden lg:block">
              <h3 className="font-display font-semibold text-sm text-foreground">Tools</h3>
              <Button variant="hero-outline" className="w-full justify-start gap-3">
                <Upload className="w-4 h-4" /> Upload Photo
              </Button>
              <div className="border-t border-border pt-4">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Hair Colors</h3>
                <div className="grid grid-cols-5 gap-2">
                  {["#1a1a1a", "#4a3728", "#8B4513", "#DAA520", "#C0392B", "#8E44AD", "#2980B9", "#E91E63", "#F39C12", "#1ABC9C"].map((c) => (
                    <button key={c} className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-colors" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Quick Styles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {stylePresets.slice(0, 4).map((s) => (
                    <button key={s.name} className="rounded-xl overflow-hidden aspect-square group relative">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-background/60 flex items-end p-2">
                        <span className="text-[10px] font-semibold text-foreground">{s.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center canvas */}
            <div className="glass-strong rounded-2xl flex items-center justify-center min-h-[50vh] lg:min-h-0 relative overflow-hidden">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">Upload Your Photo</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm">Drag & drop your photo here or click to browse. Supports JPG, PNG up to 10MB.</p>
                <Button variant="hero">Choose Photo</Button>
              </div>
            </div>

            {/* Right panel */}
            <div className="glass-strong rounded-2xl p-4 space-y-5 hidden lg:block">
              <h3 className="font-display font-semibold text-sm text-foreground">Adjustments</h3>
              <SliderControl icon={Sun} label="Brightness" value={brightness} onChange={setBrightness} />
              <SliderControl icon={Contrast} label="Contrast" value={contrast} onChange={setContrast} />
              <SliderControl icon={Droplets} label="Saturation" value={saturation} onChange={setSaturation} />
              <div className="border-t border-border pt-4">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Filters</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Natural", "Warm", "Cool", "Vivid"].map((f) => (
                    <button key={f} className="px-3 py-2 rounded-xl glass text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card/60 transition-all">
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom carousel */}
          <div className="glass-strong rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-3">
              <button className="shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-3 overflow-x-auto flex-1 py-1 scrollbar-hide">
                {stylePresets.map((s) => (
                  <button key={s.name} className="shrink-0 w-16 h-16 rounded-xl overflow-hidden group relative border-2 border-transparent hover:border-primary transition-colors">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <button className="shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const SliderControl = ({ icon: Icon, label, value, onChange }: { icon: any; label: string; value: number; onChange: (v: number) => void }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs text-foreground font-medium">{value}</span>
    </div>
    <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-1 rounded-full appearance-none bg-border accent-primary cursor-pointer" />
  </div>
);

export default TryNow;
