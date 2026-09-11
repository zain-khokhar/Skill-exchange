import Link from "next/link";
import { Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-gold-400" />
              <span className="text-lg font-bold text-gradient-gold">SkillExchange</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A platform to share, learn, and exchange skills with others. Connect with people who want to teach and learn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/skills" className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">support@skillexchange.com</li>
              <li className="text-sm text-muted-foreground">FYP Project - 2025</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SkillExchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
