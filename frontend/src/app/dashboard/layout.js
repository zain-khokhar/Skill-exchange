"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { DASHBOARD_LINKS } from "@/lib/constants";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar links={DASHBOARD_LINKS} title="Dashboard" />
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
