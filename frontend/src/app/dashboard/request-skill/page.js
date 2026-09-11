"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createSkill } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import SkillForm from "@/components/skills/SkillForm";
import { Card, CardContent } from "@/components/ui/card";

export default function RequestSkillPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createSkill({
        ...formData,
        type: "requested",
        status: "pending",
        owner: user.id,
      });

      toast({
        title: "Skill Request Submitted!",
        description: "Your request is now pending admin approval.",
      });

      router.push("/dashboard/my-skills");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create skill request.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Request a Skill"
        description="Describe the skill you want to learn or the help you need."
      />
      <Card className="border-border/50 max-w-2xl">
        <CardContent className="p-6">
          <SkillForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
