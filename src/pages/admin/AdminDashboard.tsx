
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 p-8 pt-20 md:pt-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
