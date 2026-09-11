"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMySkills } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import SkillGrid from "@/components/skills/SkillGrid";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function MySkillsPage() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      if (!user) return;
      try {
        const data = await getMySkills(user.id);
        setSkills(data.data || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        title="My Skills"
        description="View and manage all your skill listings"
      />
      <SkillGrid skills={skills} showStatus={true} />
    </div>
  );
}
