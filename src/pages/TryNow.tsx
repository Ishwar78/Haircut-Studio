import { Upload, Undo2, Redo2, Download, Sun, Contrast, Droplets, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { adminApi } from "@/api/api";

const TryNow = () => {
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  
  const [colors, setColors] = useState<any[]>([]);
  const [quickStyles, setQuickStyles] = useState<any[]>([]);
  const [exploreStyles, setExploreStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const colorData = await adminApi.getTryNowColors();
      const quickData = await adminApi.getTryNowStyles();
      const exploreData = await adminApi.getExplore();
      
      setColors(colorData);
      setQuickStyles(quickData);
      setExploreStyles(exploreData);
    } catch (e) {
      console.error("Failed to fetch try now data", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserPhoto(URL.createObjectURL(file));
    }
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const base = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
    return `${base}${path}`;
  };

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
            <Button variant="hero" size="sm" onClick={() => window.print()}><Download className="w-4 h-4" /> Export</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-4">
            {/* Left panel */}
            <div className="glass-strong rounded-2xl p-4 space-y-4 hidden lg:block overflow-y-auto max-h-[70vh] scrollbar-hide">
              <h3 className="font-display font-semibold text-sm text-foreground">Tools</h3>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              <Button variant="hero-outline" className="w-full justify-start gap-3" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4" /> Upload Photo
              </Button>
              
              <div className="border-t border-border pt-4">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Hair Colors</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.length > 0 ? colors.map((c) => (
                    <button key={c._id} className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-colors" style={{ backgroundColor: c.color }} title={c.name} />
                  )) : <p className="text-[10px] text-muted-foreground col-span-5">No colors added</p>}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Quick Styles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickStyles.slice(0, 6).map((s) => (
                    <button key={s._id} className="rounded-xl overflow-hidden aspect-square group relative">
                      <img src={getImageUrl(s.img)} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] font-semibold text-foreground">{s.name}</span>
                      </div>
                    </button>
                  ))}
                  {quickStyles.length === 0 && <p className="text-[10px] text-muted-foreground col-span-2">No quick styles</p>}
                </div>
              </div>
            </div>

            {/* Center canvas */}
            <div className="glass-strong rounded-2xl flex items-center justify-center min-h-[50vh] lg:min-h-0 relative overflow-hidden bg-zinc-950">
              {userPhoto ? (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img src={userPhoto} className="max-w-full max-h-full object-contain rounded-lg" style={{ 
                    filter: `brightness(${brightness*2}%) contrast(${contrast*2}%) saturate(${saturation*2}%)` 
                  }} alt="User Photo" />
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70" onClick={() => setUserPhoto(null)}>
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">Upload Your Photo</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-sm">Drag & drop your photo here or click to browse. Supports JPG, PNG up to 10MB.</p>
                  <Button variant="hero" onClick={() => fileInputRef.current?.click()}>Choose Photo</Button>
                </div>
              )}
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
                {exploreStyles.length > 0 ? exploreStyles.map((s) => (
                  <button key={s._id} className="shrink-0 w-16 h-16 rounded-xl overflow-hidden group relative border-2 border-transparent hover:border-primary transition-colors" title={s.name}>
                    <img src={getImageUrl(s.img)} alt={s.name} className="w-full h-full object-cover" />
                  </button>
                )) : (
                  <p className="text-xs text-muted-foreground py-4">No gallery images found.</p>
                )}
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
