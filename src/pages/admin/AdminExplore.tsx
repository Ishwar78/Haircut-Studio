// 🔥 SAME IMPORTS (unchanged)
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
const [editId, setEditId] = useState<string | null>(null);
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

  const handleEdit = (style: any) => {
  setEditId(style._id);
  setName(style.name);
  setCategory(style.category);
  setLength(style.length);
  setTag(style.tag);
  setUploadPreview(getImageUrl(style.img));
};

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("length", length);
  formData.append("tag", tag);

  if (file) {
    formData.append("image", file);
  }

  try {
    await adminApi.updateExplore(editId, formData);

    toast.success("Style updated!");

    // reset form
    setEditId(null);
    setName("");
    setFile(null);
    setUploadPreview(null);

    fetchStyles();
  } catch (error) {
    toast.error("Update failed");
  }
};

  const getImageUrl = (path: string) => {
    const base = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
    return `${base}${path}`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Manage <span className="text-purple-400">Explore Gallery</span>
          </h1>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl mb-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Plus className="text-purple-400" /> Add New Style
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Form */}
            <form onSubmit={editId ? handleUpdate : handleUpload}className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-300">Style Name</label>
                <input
                  type="text"
                  className="bg-black/30 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Category</label>
                <select 
                  className="bg-black/30 border border-white/10 p-3 rounded-xl"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Hair Length</label>
                <select 
                  className="bg-black/30 border border-white/10 p-3 rounded-xl"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  {LENGTHS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Tag</label>
                <select 
                  className="bg-black/30 border border-white/10 p-3 rounded-xl"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  {TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-300">Upload Image</label>
                <label className="flex items-center gap-3 bg-black/30 border border-dashed border-white/20 p-4 rounded-xl cursor-pointer hover:bg-black/40 transition">
                  <ImageIcon />
                  {file ? file.name : "Choose image"}
                  <input type="file" hidden onChange={handleFileChange} />
                </label>
              </div>

              <Button className="md:col-span-2 bg-purple-600 hover:bg-purple-700 h-12">
                {loading ? "Uploading..." : "Publish Style"}
              </Button>
            </form>

            {/* Preview */}
            <div className="w-full lg:w-64">
              <div className="aspect-[4/5] bg-black/30 rounded-xl flex items-center justify-center overflow-hidden">
                {uploadPreview ? (
                  <img src={uploadPreview} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">

          <div className="hidden md:grid grid-cols-4 p-4 text-gray-400 text-sm">
            <span>Preview</span>
            <span>Name</span>
            <span>Details</span>
            <span className="text-right">Actions</span>
          </div>

          {styles.map((style) => (
            <div key={style._id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-t border-white/10 items-center">

              <img src={getImageUrl(style.img)} className="w-full md:w-20 h-24 object-cover rounded-lg" />

              <div>
                <p className="text-purple-400 font-semibold">{style.name}</p>
                <span className="text-xs">{style.tag}</span>
              </div>

              <div className="text-sm text-gray-300">
                {style.category} • {style.length}
              </div>

             <div className="text-right flex gap-3 justify-end">
                {/* EDIT */}
<button
  onClick={() => handleEdit(style)}
  className="text-blue-400 hover:text-blue-500"
>
  ✏️
</button>

{/* DELETE */}
<button onClick={() => handleDelete(style._id)}>
  <Trash2 className="hover:text-red-500" />
</button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}