"use client";

import { useEffect, useState } from "react";
import { getAllSkills, updateSkillStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import SkillsTable from "@/components/admin/SkillsTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function fetchSkills() {
    try {
      const data = await getAllSkills();
      setSkills(data.data || []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateSkillStatus(id, "approved");
      toast({ title: "Skill Approved!" });
      fetchSkills();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await updateSkillStatus(id, "rejected", reason);
      toast({ title: "Skill Rejected" });
      fetchSkills();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filterByStatus = (status) => {
    if (!status) return skills;
    return skills.filter((s) => (s.attributes?.status || s.status) === status);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Skill Approvals" description="Review and manage skill listings" />

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({skills.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterByStatus("pending").length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({filterByStatus("approved").length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({filterByStatus("rejected").length})</TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="border-border/50">
              <CardContent className="p-0">
                {filterByStatus(tab === "all" ? null : tab).length === 0 ? (
                  <EmptyState title="No Skills" description={`No ${tab} skill listings.`} />
                ) : (
                  <SkillsTable
                    skills={filterByStatus(tab === "all" ? null : tab)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
