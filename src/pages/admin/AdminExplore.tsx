import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";
import { Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CATEGORIES = ["Men", "Women"];
const LENGTHS = ["Short", "Medium", "Long"];
const TAGS = ["Trending", "New", "Regular"];

export default function AdminExplore() {
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Men");
  const [length, setLength] = useState("Short");
  const [tag, setTag] = useState("Trending");
  const [file, setFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchStyles();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setUploadPreview(URL.createObjectURL(selectedFile));
    } else {
      setUploadPreview(null);
    }
  };

  const fetchStyles = async () => {
    try {
      const data = await adminApi.getExplore();
      setStyles(data);
    } catch (error) {
      console.error("Failed to fetch styles", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image");
    if (!name) return toast.error("Please enter a name");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("length", length);
    formData.append("tag", tag);
    formData.append("image", file);

    try {
      await adminApi.addExplore(formData);
      toast.success("Style added successfully!");
      setName("");
      setFile(null);
      setUploadPreview(null);
      fetchStyles();
    } catch (error) {
      toast.error("Failed to upload style");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this style?")) return;
    try {
      await adminApi.deleteExplore(id);
      toast.success("Style deleted");
      fetchStyles();
    } catch (error) {
      toast.error("Failed to delete style");
    }
  };

  const getImageUrl = (path: string) => {
    const base = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
    return `${base}${path}`;
  };

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">Manage <span className="gradient-text">Explore Gallery</span></h1>
        </div>

        {/* Upload Section */}
        <div className="glass-strong p-6 rounded-2xl mb-12 border border-white/10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" /> Add New Style
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <form onSubmit={handleUpload} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-400">Style Name</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Fade"
                  className="bg-zinc-900 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Category</label>
                <select 
                  className="bg-zinc-900 border border-white/10 p-3 rounded-xl outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Hair Length</label>
                <select 
                  className="bg-zinc-900 border border-white/10 p-3 rounded-xl outline-none"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Tag/Type</label>
                <select 
                  className="bg-zinc-900 border border-white/10 p-3 rounded-xl outline-none"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-400">Upload Image</label>
                <label className="flex items-center gap-3 bg-zinc-900 border border-dashed border-white/20 p-4 rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{file ? file.name : "Choose an image..."}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>

              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 h-12 md:col-span-2 mt-2" disabled={loading}>
                {loading ? "Uploading..." : "Publish Style"}
              </Button>
            </form>

            {/* Preview Section */}
            <div className="w-full lg:w-64">
              <p className="text-sm text-gray-400 mb-2">Upload Preview</p>
              <div className="aspect-[4/5] bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                {uploadPreview ? (
                  <img src={uploadPreview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-10 h-10 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50 text-gray-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Preview</th>
                <th className="p-4 font-medium">Style Name</th>
                <th className="p-4 font-medium">Details</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {styles.map((style) => (
                <tr key={style._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={getImageUrl(style.img)} 
                        className="w-full h-full object-cover"
                        alt={style.name}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-purple-400">{style.name}</p>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 mt-1 inline-block">
                      {style.tag}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    <div className="flex flex-col">
                      <span>Category: {style.category}</span>
                      <span>Length: {style.length}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(style._id)}
                      className="text-gray-500 hover:text-red-500 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {styles.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">
                    No styles uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
