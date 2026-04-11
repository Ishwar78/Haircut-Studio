import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const styles = [
  { name: "Modern Fade", category: "Men", length: "Short", tag: "Trending", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop" },
  { name: "Textured Crop", category: "Men", length: "Short", tag: "New", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=500&fit=crop" },
  { name: "Layered Bob", category: "Women", length: "Medium", tag: "Trending", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop" },
  { name: "Beach Waves", category: "Women", length: "Long", tag: "Trending", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop" },
  { name: "Pixie Cut", category: "Women", length: "Short", tag: "New", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
  { name: "Pompadour", category: "Men", length: "Medium", tag: "Trending", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { name: "Curtain Bangs", category: "Women", length: "Long", tag: "New", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
  { name: "Buzz Cut", category: "Men", length: "Short", tag: "Trending", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop" },
  { name: "Lob Cut", category: "Women", length: "Medium", tag: "New", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop" },
];

const filters = {
  category: ["All", "Men", "Women"],
  length: ["All", "Short", "Medium", "Long"],
  tag: ["All", "Trending", "New"],
};

const Explore = () => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [len, setLen] = useState("All");
  const [tag, setTag] = useState("All");
  const [selected, setSelected] = useState<typeof styles[0] | null>(null);

  const filtered = styles.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (cat !== "All" && s.category !== cat) return false;
    if (len !== "All" && s.length !== len) return false;
    if (tag !== "All" && s.tag !== tag) return false;
    return true;
  });

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Explore <span className="gradient-text">Hairstyles</span>
            </h1>
            <p className="text-muted-foreground text-lg">Browse our curated collection of trending styles.</p>
          </div>

          {/* Filters */}
          <div className="glass-strong rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search styles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <FilterGroup label="Category" options={filters.category} value={cat} onChange={setCat} />
              <FilterGroup label="Length" options={filters.length} value={len} onChange={setLen} />
              <FilterGroup label="Type" options={filters.tag} value={tag} onChange={setTag} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((s, i) => (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 60}>
                <button onClick={() => setSelected(s)} className="group relative rounded-2xl overflow-hidden aspect-[4/5] text-left w-full">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full glass text-[10px] font-semibold text-primary">{s.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-primary font-medium">{s.category} · {s.length}</span>
                    <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
                  </div>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No styles found matching your filters.</p>
          )}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-lg p-4" onClick={() => setSelected(null)}>
          <div className="glass-strong rounded-3xl max-w-lg w-full overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5]">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs text-primary font-medium">{selected.category} · {selected.length} · {selected.tag}</span>
              <h2 className="font-display font-bold text-2xl text-foreground mt-1 mb-4">{selected.name}</h2>
              <Button variant="hero" className="w-full" asChild>
                <a href="/try-now">Try This Style</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const FilterGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex items-center gap-1">
    <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1 hidden sm:block" />
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          value === opt ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-card/40"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default Explore;
