"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { savePostLoginRedirect } from "@/lib/auth";

export default function ProtectedRoute({ children, adminOnly = false, editorOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const hasAccess = () => {
    if (!user) return false;
    if (adminOnly && !user.isAdmin) return false;
    if (editorOnly && !user.isAdmin && !user.isEditor) return false;
    return true;
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        const redirectPath = search ? `${pathname}?${search}` : pathname;
        savePostLoginRedirect(redirectPath);
        router.replace("/login");
      } else if (!hasAccess()) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, adminOnly, editorOnly, pathname, router, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-400 border-t-transparent" />
      </div>
    );
  }

  if (!hasAccess()) return null;

  return children;
}
