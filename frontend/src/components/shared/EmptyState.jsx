import { FileQuestion } from "lucide-react";

export default function EmptyState({ title = "Nothing found", description = "No items to display" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
