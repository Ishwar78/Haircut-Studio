import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Explore", path: "/admin/explore" },
    { name: "Try Now", path: "/admin/try-now" },
    { name: "Services", path: "/admin/services" },
     {name: "beforeAfter", path: "/admin/before-after"}, 
     {name: "contact" , path: "/admin/contact"}
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-3">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`block p-2 rounded-lg ${
                location.pathname === item.path
                  ? "bg-purple-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}