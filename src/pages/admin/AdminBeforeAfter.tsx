import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminBeforeAfter() {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);

  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const data = await adminApi.getAllBeforeAfter();
    setList(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = async () => {
    if (!beforeFile || !afterFile) {
      return toast.error("Upload both images");
    }

    const formData = new FormData();
    formData.append("beforeImage", beforeFile);
    formData.append("afterImage", afterFile);

    setLoading(true);

    try {
      await adminApi.addBeforeAfter(formData);
      toast.success("Uploaded successfully!");

      setBeforeFile(null);
      setAfterFile(null);
      setBeforePreview(null);
      setAfterPreview(null);

      loadData();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    await adminApi.deleteBeforeAfter(id);
    toast.success("Deleted");
    loadData();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">
          Before & After <span className="text-purple-400">Images</span>
        </h1>

        {/* UPLOAD */}
        <div className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-2xl mb-8 border border-white/10 shadow-lg">
          
          <h2 className="text-lg mb-6 flex items-center gap-2 text-purple-300">
            <Upload className="w-5 h-5" />
            Upload Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-300">Before Image</label>
              <input
                type="file"
                className="mt-2 block w-full text-sm file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setBeforeFile(file);
                    setBeforePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">After Image</label>
              <input
                type="file"
                className="mt-2 block w-full text-sm file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAfterFile(file);
                    setAfterPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* ✅ PREVIEW FIX */}
          {(beforePreview || afterPreview) && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {beforePreview && (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={beforePreview}
                    className="w-full h-40 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
                    Before
                  </span>
                </div>
              )}

              {afterPreview && (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={afterPreview}
                    className="w-full h-40 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
                    After
                  </span>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleUpload}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Images"}
          </Button>
        </div>

        {/* LIST */}
        <div className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg mb-6 text-purple-300">Uploaded Images</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {list.map((item) => (
              <div
                key={item._id}
                className="bg-black/30 p-3 rounded-xl border border-white/10"
              >
                {/* ✅ IMAGE BOX FIX */}
                <div className="flex gap-2 overflow-hidden">

                  <div className="w-1/2 h-[100px] rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:5000/${item.beforeImage?.replace(/^\/+/, "")}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-1/2 h-[100px] rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:5000/${item.beforeImage?.replace(/^\/+/, "")}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 text-xs text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}

            {list.length === 0 && (
              <p className="text-gray-400">No images uploaded yet</p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}