import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";
import { Trash2, Plus, Scissors, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CATEGORIES = [
  { label: "Salon (In-Studio)", value: "salon" },
  { label: "Studio (Pricing Plan)", value: "studio" }
];

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("salon");

  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await adminApi.getServices();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return toast.error("Please fill Name and Price");

    setLoading(true);

    try {
      if (editId) {
        await adminApi.updateService(editId, {
          name,
          price,
          description,
          category,
        });

        toast.success("Service updated!");
        setEditId(null);

      } else {
        await adminApi.addService({
          name,
          price,
          description,
          category,
          isActive: true
        });

        toast.success("Service added successfully!");
      }

      setName("");
      setPrice("");
      setDescription("");

      fetchServices();

    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: any) => {
    setEditId(service._id);

    setName(service.name);
    setPrice(service.price);
    setDescription(service.description);
    setCategory(service.category);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await adminApi.deleteService(id);
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Manage <span className="text-purple-400">Services & Plans</span>
          </h1>
        </div>

        {/* ADD SECTION */}
        <div className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-2xl mb-10 border border-white/10 shadow-lg">
          
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" /> Add New Service/Plan
          </h2>
          
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Name / Title</label>
              <input
                type="text"
                className="bg-black/30 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Price</label>
              <input
                type="text"
                className="bg-black/30 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Category</label>
              <select 
                className="bg-black/30 border border-white/10 p-3 rounded-xl outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Description</label>
              <input
                type="text"
                className="bg-black/30 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition h-12 md:col-span-2 mt-2"
              disabled={loading}
            >
              {loading 
                ? "Saving..." 
                : editId 
                  ? "Update Service" 
                  : "Add Service"
              }
            </Button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-lg">

          <table className="w-full text-left border-collapse hidden md:table">
            <thead className="bg-white/10 text-gray-300 text-sm">
              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-t border-white/10 hover:bg-white/5">
                  
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">
                      {s.category}
                    </span>
                  </td>

                  <td className="p-4 text-purple-400 font-semibold">{s.name}</td>
                  <td className="p-4 font-bold">{s.price}</td>
                  <td className="p-4 text-gray-300 max-w-xs truncate">{s.description}</td>

                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(s)} className="mr-2 hover:text-blue-400">✏️</button>
                    <button onClick={() => handleDelete(s._id)} className="hover:text-red-400">
                      <Trash2 />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* MOBILE VIEW */}
          <div className="md:hidden p-4 space-y-4">
            {services.map((s) => (
              <div key={s._id} className="bg-black/30 p-4 rounded-xl border border-white/10">
                <div className="text-purple-400 font-bold">{s.name}</div>
                <div className="text-sm text-gray-300">{s.price}</div>
                <div className="text-xs text-gray-400">{s.description}</div>

                <div className="flex justify-between mt-3">
                  <button onClick={() => handleEdit(s)}>✏️</button>
                  <button onClick={() => handleDelete(s._id)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No services added yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}