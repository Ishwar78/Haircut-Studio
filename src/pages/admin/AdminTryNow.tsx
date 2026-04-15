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
  
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

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
    } catch {
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
    } catch {
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">
          Manage <span className="text-purple-400">Try Now Tools</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* COLORS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Palette className="text-purple-400" /> Hair Colors
            </h2>

            <form onSubmit={handleAddColor} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Color Name"
                className="flex-1 bg-black/30 border border-white/10 p-2 rounded-lg outline-none"
                value={colorName}
                onChange={e => setColorName(e.target.value)}
                required
              />
              <input
                type="color"
                className="w-12 h-10 rounded cursor-pointer"
                value={colorHex}
                onChange={e => setColorHex(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {colors.map(c => (
                <div key={c._id} className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: c.color }} />
                    <span className="text-sm">{c.name}</span>
                  </div>
                  <button onClick={() => handleDeleteColor(c._id)}>
                    <Trash2 className="w-4 h-4 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STYLES */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <ImageIcon className="text-purple-400" /> Quick Styles
            </h2>

            <form onSubmit={handleAddStyle} className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Style Name"
                className="w-full bg-black/30 border border-white/10 p-2 rounded-lg outline-none"
                value={styleName}
                onChange={e => setStyleName(e.target.value)}
                required
              />

              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-400"
                onChange={e => setStyleFile(e.target.files?.[0] || null)}
                required
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Uploading..." : "Upload Style"}
              </Button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {styles.map(s => (
                <div key={s._id} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10">
                  <img src={getImageUrl(s.img)} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 flex justify-between items-center translate-y-2 group-hover:translate-y-0 transition">
                    <span className="text-xs truncate">{s.name}</span>
                    <button onClick={() => handleDeleteStyle(s._id)}>
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
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