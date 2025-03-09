// /app/admin/dashboard/layout.jsx
import "../../globals.css"; // Global styles
import "../../slider.css";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Admin Dashboard</title>
      </head>
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
