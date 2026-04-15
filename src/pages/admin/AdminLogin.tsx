import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/api";
import { Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await adminApi.login({ email, password });
      localStorage.setItem("admin", "true");
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (error: any) {
      alert(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Admin <span className="text-purple-400">Login</span>
        </h2>

        {/* Email */}
        <div className="mb-4 relative">
          <Mail className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <Lock className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 font-semibold shadow-md hover:scale-105 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Secure Admin Access 🔐
        </p>
      </div>
    </div>
  );
}