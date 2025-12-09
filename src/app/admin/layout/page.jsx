import AdminSidebar from "../../component/adminsidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 w-full min-h-screen bg-[#E4EBF8] p-10">
        {children}
      </main>
    </div>
  );
}
