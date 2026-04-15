import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminBooking = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/all")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this booking?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(prev => prev.filter((b: any) => b._id !== id));
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
      
      {/* ✅ Sidebar */}
      <AdminSidebar />

      {/* ✅ Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-x-auto border border-white/10">
          
          <table className="w-full text-sm">
            
            {/* ✅ HEADER */}
            <thead className="bg-white/20 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th> {/* ✅ NEW */}
              </tr>
            </thead>

            {/* ✅ BODY */}
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-t border-white/10 hover:bg-white/10">
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.phone}</td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">{b.date}</td>

                  {/* ✅ DELETE BUTTON */}
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ EMPTY STATE */}
          {bookings.length === 0 && (
            <p className="text-center py-6 text-gray-300">
              No bookings found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;