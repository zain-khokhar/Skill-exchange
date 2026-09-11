import { cn } from "@/lib/utils";

export default function PageHeader({ title, description, className }) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
}
