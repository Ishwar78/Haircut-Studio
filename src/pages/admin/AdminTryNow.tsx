import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";
import { Trash2, Plus, Palette, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminTryNow() {
  const [colors, setColors] = useState<any[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Color Form
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  // Style Form
  const [styleName, setStyleName] = useState("");
  const [styleFile, setStyleFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const colorData = await adminApi.getTryNowColors();
      const styleData = await adminApi.getTryNowStyles();
      setColors(colorData);
      setStyles(styleData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleAddColor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.addTryNowColor({ name: colorName, color: colorHex });
      toast.success("Color added!");
      setColorName("");
      fetchData();
    } catch (error) {
      toast.error("Failed to add color");
    }
  };

  const handleAddStyle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!styleFile) return toast.error("Select an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("name", styleName);
    formData.append("image", styleFile);
    try {
      await adminApi.addTryNowStyle(formData);
      toast.success("Quick Style added!");
      setStyleName("");
      setStyleFile(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to add style");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColor = async (id: string) => {
    if (!confirm("Delete color?")) return;
    await adminApi.deleteTryNowColor(id);
    fetchData();
  };

  const handleDeleteStyle = async (id: string) => {
    if (!confirm("Delete style?")) return;
    await adminApi.deleteTryNowStyle(id);
    fetchData();
  };

  const getImageUrl = (path: string) => {
    const base = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
    return `${base}${path}`;
  };

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-8">Manage <span className="gradient-text">Try Now Tools</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colors Section */}
          <div className="glass-strong p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" /> Hair Colors
            </h2>
            <form onSubmit={handleAddColor} className="flex gap-4 mb-8">
              <input type="text" placeholder="Name" className="bg-zinc-900 p-2 rounded-lg flex-1 outline-none border border-white/10" value={colorName} onChange={e => setColorName(e.target.value)} required />
              <input type="color" className="w-10 h-10 bg-transparent border-none cursor-pointer" value={colorHex} onChange={e => setColorHex(e.target.value)} />
              <Button type="submit">Add</Button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colors.map(c => (
                <div key={c._id} className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: c.color }} />
                    <span className="text-sm">{c.name}</span>
                  </div>
                  <button onClick={() => handleDeleteColor(c._id)} className="text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Styles Section */}
          <div className="glass-strong p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" /> Quick Styles
            </h2>
            <form onSubmit={handleAddStyle} className="space-y-4 mb-8 text-sm">
              <input type="text" placeholder="Style Name" className="bg-zinc-900 p-2 rounded-lg w-full outline-none border border-white/10" value={styleName} onChange={e => setStyleName(e.target.value)} required />
              <input type="file" accept="image/*" className="block w-full text-xs text-gray-500" onChange={e => setStyleFile(e.target.files?.[0] || null)} required />
              <Button type="submit" disabled={loading} className="w-full">Upload Style</Button>
            </form>
            <div className="grid grid-cols-2 gap-4">
              {styles.map(s => (
                <div key={s._id} className="relative aspect-square rounded-xl overflow-hidden group border border-white/5">
                  <img src={getImageUrl(s.img)} className="w-full h-full object-cover" alt={s.name} />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 flex justify-between items-center translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs truncate">{s.name}</span>
                    <button onClick={() => handleDeleteStyle(s._id)} className="text-red-500"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
