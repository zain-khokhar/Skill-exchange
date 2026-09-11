import SkillCard from "@/components/skills/SkillCard";
import EmptyState from "@/components/shared/EmptyState";

export default function SkillGrid({ skills, showStatus = false }) {
  if (!skills || skills.length === 0) {
    return <EmptyState title="No Skills Found" description="There are no skills to display at the moment." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} showStatus={showStatus} />
      ))}
    </div>
  );
}
