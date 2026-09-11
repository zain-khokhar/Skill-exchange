"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SkillsLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}