import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/api";

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
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="p-6 bg-gray-900 rounded-xl w-96">
        <h2 className="text-2xl mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 bg-gray-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}