"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { ADMIN_LINKS } from "@/lib/constants";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute adminOnly>
      <div className="flex">
        <Sidebar links={ADMIN_LINKS} title="Admin Panel" />
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
