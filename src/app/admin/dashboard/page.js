// /app/admin/dashboard/layout.jsx
import "../../globals.css"; // Adjust path as needed
import "../../slider.css"; // Adjust path as needed
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
