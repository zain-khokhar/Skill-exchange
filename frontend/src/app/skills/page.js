"use client";

import { useEffect, useState } from "react";
import { getApprovedSkills, getCategories } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import SkillGrid from "@/components/skills/SkillGrid";
import SkillFilter from "@/components/skills/SkillFilter";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getRecordAttributes, getRelationData } from "@/lib/utils";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "", level: "", location: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [skillsRes, catsRes] = await Promise.all([
          getApprovedSkills(),
          getCategories(),
        ]);
        setSkills(skillsRes.data || []);
        setCategories(catsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Client-side filtering
  const filteredSkills = skills.filter((skill) => {
    const attrs = getRecordAttributes(skill);
    const category = getRelationData(attrs.category);
    const matchesSearch = !filters.search ||
      attrs.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category ||
      (category?.slug || "") === filters.category;
    const matchesLevel = !filters.level || attrs.level === filters.level;
    const matchesLocation = !filters.location ||
      (attrs.location || "").toLowerCase().includes(filters.location.toLowerCase());
    return matchesSearch && matchesCategory && matchesLevel && matchesLocation;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Browse Skills"
        description="Explore skills offered by our community members"
      />
      <SkillFilter
        categories={categories}
        filters={filters}
        onFilterChange={setFilters}
      />
      <SkillGrid skills={filteredSkills} />
    </div>
  );
}
