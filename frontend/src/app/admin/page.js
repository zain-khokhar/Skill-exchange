"use client";

import { useEffect, useState } from "react";
import { getAllUsers, getAllSkills, getCategories, getAllReports } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import StatsCards from "@/components/admin/StatsCards";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, skills: 0, pending: 0, categories: 0, reports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, skillsRes, catsRes, reportsRes] = await Promise.all([
          getAllUsers(),
          getAllSkills(),
          getCategories(),
          getAllReports(),
        ]);

        const users = usersRes || [];
        const skills = skillsRes.data || [];
        const categories = catsRes.data || [];
        const reports = reportsRes.data || [];

        setStats({
          users: users.length,
          skills: skills.length,
          pending: skills.filter((s) => (s.attributes?.status || s.status) === "pending").length,
          categories: categories.length,
          reports: reports.filter((r) => (r.attributes?.status || r.status) === "pending").length,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of the platform statistics"
      />
      <StatsCards stats={stats} />
    </div>
  );
}
