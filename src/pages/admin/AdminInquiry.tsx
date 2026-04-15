import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminInquiry = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/inquiry/all")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <div className="flex bg-black min-h-screen">
      
      {/* ✅ SIDEBAR */}
      <AdminSidebar />

      {/* ✅ CONTENT */}
      <div className="flex-1 p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">
          Inquiry <span className="text-purple-500">List</span>
        </h1>

        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-zinc-800 text-gray-400 text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item: any) => (
                <tr key={item._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.message}</td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiry;