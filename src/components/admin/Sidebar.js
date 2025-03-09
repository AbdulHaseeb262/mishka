import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 h-screen p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-green-400">CMS</h2>
      </div>
      <nav className="space-y-4">
        <Link
          href="/admin/dashboard/add-product"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">➕</span>
          <span className="font-medium">Add Product</span>
        </Link>
        <Link
          href="/admin/dashboard/products"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">📦</span>
          <span className="font-medium">Products</span>
        </Link>
        <Link
          href="/admin/dashboard/orders"
          className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">🛒</span>
          <span className="font-medium">Orders</span>
        </Link>
      </nav>
    </aside>
  );
}
