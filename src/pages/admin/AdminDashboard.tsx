import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { adminApi } from "../../api/api";
import { Users, Calendar, Scissors } from "lucide-react";

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Users */}
          {/* <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Users</h2>
              <Users className="text-purple-400" />
            </div>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div> */}

          {/* Bookings */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Bookings</h2>
              <Calendar className="text-pink-400" />
            </div>
            <p className="text-3xl font-bold">{stats.bookings}</p>
          </div>

          {/* Services */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Services</h2>
              <Scissors className="text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">{stats.services}</p>
          </div>

        </div>
      </div>
    </div>
  );
}