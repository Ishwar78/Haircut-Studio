import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminInquiry = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/inquiry/all")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/inquiry/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // ✅ UI se remove
        setData(prev => prev.filter((item: any) => item._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* ✅ SIDEBAR */}
      <AdminSidebar />

      {/* ✅ CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Inquiry <span className="text-purple-400">List</span>
        </h1>

        {/* Table Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-lg">

          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-4 bg-white/10 text-gray-300 text-sm font-medium">
            <div className="p-4">Name</div>
            <div className="p-4">Email</div>
            <div className="p-4">Message</div>
            <div className="p-4">Action</div>
          </div>

          {/* Data */}
          <div className="divide-y divide-white/10">
            {data.map((item: any) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 hover:bg-white/5 transition"
              >
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Name</p>
                  <p className="font-medium">{item.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 md:hidden">Email</p>
                  <p className="text-gray-300 break-all">{item.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 md:hidden">Message</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {/* ✅ DELETE BUTTON */}
                <div>
                  <p className="text-xs text-gray-400 md:hidden">Action</p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 text-sm bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {data.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                No inquiries found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiry;