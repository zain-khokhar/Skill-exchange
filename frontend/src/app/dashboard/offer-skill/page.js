"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createSkill } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import SkillForm from "@/components/skills/SkillForm";
import { Card, CardContent } from "@/components/ui/card";

export default function OfferSkillPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createSkill({
        ...formData,
        status: "pending",
        owner: user.id,
      });

      toast({
        title: "Skill Submitted!",
        description: "Your skill is now pending admin approval.",
      });

      router.push("/dashboard/my-skills");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Offer a Skill"
        description="Share your expertise with others. Fill in the details below."
      />
      <Card className="border-border/50 max-w-2xl">
        <CardContent className="p-6">
          <SkillForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
