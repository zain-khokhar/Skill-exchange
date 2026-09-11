"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-gold-400" />
          <span className="text-xl font-bold text-gradient-gold">SkillExchange</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                pathname === link.href ? "text-gold-400" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-gold-400/50">
                    <AvatarFallback className="bg-gold-400/10 text-gold-400 font-semibold">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.isAdmin ? (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                ) : user.isEditor ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/skills">Skill Approvals</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/my-skills">My Skills</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gold-400 text-black hover:bg-gold-500">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 ${
                  pathname === link.href ? "text-gold-400" : "text-muted-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && !user && (
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="ghost" asChild className="flex-1">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="flex-1 bg-gold-400 text-black hover:bg-gold-500">
                  <Link href="/register" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
            {!loading && user && (
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Signed in as {user.username}</p>
                <Link
                  href={user.isAdmin ? "/admin" : "/dashboard"}
                  className="block text-sm py-2 text-gold-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {user.isAdmin ? "Admin Dashboard" : "Dashboard"}
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="text-sm py-2 text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
