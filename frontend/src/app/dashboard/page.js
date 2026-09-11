"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getMySkills } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, Clock, CheckCircle, XCircle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      try {
        const data = await getMySkills(user.id);
        const skills = data.data || [];
        setStats({
          total: skills.length,
          approved: skills.filter((s) => (s.attributes?.status || s.status) === "approved").length,
          pending: skills.filter((s) => (s.attributes?.status || s.status) === "pending").length,
          rejected: skills.filter((s) => (s.attributes?.status || s.status) === "rejected").length,
        });
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user]);

  const statCards = [
    { title: "Total Skills", value: stats.total, icon: List, color: "text-blue-400" },
    { title: "Approved", value: stats.approved, icon: CheckCircle, color: "text-green-400" },
    { title: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-400" },
    { title: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-400" },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.username || "User"}!`}
        description="Manage your skills and track your listings"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-muted">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">
                  {loading ? <span className="animate-pulse">-</span> : stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="bg-gold-400 text-black hover:bg-gold-500">
            <Link href="/dashboard/offer-skill">
              <PlusCircle className="h-4 w-4 mr-2" />
              Offer a Skill
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/my-skills">
              <List className="h-4 w-4 mr-2" />
              View My Skills
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/skills">Browse Skills</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
