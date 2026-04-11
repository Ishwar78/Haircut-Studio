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
  
  // Form State
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

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !price) return toast.error("Please fill Name and Price");

//     setLoading(true);
//     try {
//       await adminApi.addService({
//         name,
//         price,
//         description,
//         category,
//         isActive: true
//       });
//       toast.success("Service added successfully!");
//       setName("");
//       setPrice("");
//       setDescription("");
//       fetchServices();
//     } catch (error) {
//       toast.error("Failed to add service");
//     } finally {
//       setLoading(false);
//     }
//   };


      const handleAdd = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !price) return toast.error("Please fill Name and Price");

  setLoading(true);

  try {
    if (editId) {
      // 🔥 UPDATE MODE
      await adminApi.updateService(editId, {
        name,
        price,
        description,
        category,
      });

      toast.success("Service updated!");
      setEditId(null);

    } else {
      // ➕ ADD MODE
      await adminApi.addService({
        name,
        price,
        description,
        category,
        isActive: true
      });

      toast.success("Service added successfully!");
    }

    // RESET FORM
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
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">Manage <span className="gradient-text">Services & Plans</span></h1>
        </div>

        {/* Add Section */}
        <div className="glass-strong p-6 rounded-2xl mb-12 border border-white/10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" /> Add New Service/Plan
          </h2>
          
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Name / Title</label>
              <input
                type="text"
                placeholder="e.g. Haircut & Styling"
                className="bg-zinc-900 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Price (e.g. 45 or $29/mo)</label>
              <input
                type="text"
                placeholder="e.g. 45"
                className="bg-zinc-900 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Description / Features (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Precision cuts, expert styling"
                className="bg-zinc-900 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 h-12 md:col-span-2 mt-2" disabled={loading}>
            {loading 
  ? "Saving..." 
  : editId 
    ? "Update Service" 
    : "Add Service"
}
            </Button>
          </form>
        </div>

        {/* List Section */}
        <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50 text-gray-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 capitalize text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.category === "salon" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-gold-500/10 text-yellow-400 border border-yellow-500/20"}`}>
                      {s.category}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-purple-400">{s.name}</td>
                  <td className="p-4 text-sm font-bold text-white">{s.price}</td>
                  <td className="p-4 text-sm text-gray-400 max-w-xs truncate">{s.description}</td>


                  <td className="p-4 text-right">
<button 
  onClick={() => handleEdit(s)}
  className="text-gray-500 hover:text-blue-500 p-2 rounded-lg transition-colors"
>
  ✏️
</button>

                    <button 
                      onClick={() => handleDelete(s._id)}
                      className="text-gray-500 hover:text-red-500 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>


                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    No services added yet.
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