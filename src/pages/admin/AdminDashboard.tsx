import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, services: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-black text-white min-h-screen">
        <h1 className="text-3xl mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded">Users: {stats.users}</div>
          <div className="bg-gray-800 p-4 rounded">Bookings: {stats.bookings}</div>
          <div className="bg-gray-800 p-4 rounded">Services: {stats.services}</div>
        </div>
      </div>

    </div>
  );
}