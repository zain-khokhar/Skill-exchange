"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, PlusCircle, Users, FolderTree, CheckCircle, Search, Calendar, UserCog, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  List,
  PlusCircle,
  Users,
  FolderTree,
  CheckCircle,
  Search,
  Calendar,
  UserCog,
  Flag,
};

export default function Sidebar({ links, title }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-border bg-background/50 p-4 hidden lg:block">
      <h2 className="text-lg font-semibold mb-4 text-gradient-gold">{title}</h2>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
