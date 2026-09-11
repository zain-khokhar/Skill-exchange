import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/skills/StatusBadge";
import { MapPin, User } from "lucide-react";
import { getFirstMediaUrl, getRecordAttributes, getRelationData } from "@/lib/utils";

export default function SkillCard({ skill, showStatus = false }) {
  const attrs = getRecordAttributes(skill);
  const imageUrl = getFirstMediaUrl(attrs.images);
  const category = getRelationData(attrs.category);
  const owner = getRelationData(attrs.owner);
  const categoryName = category?.name || "Uncategorized";
  const ownerName = owner?.username || "Unknown";
  const skillId = skill.documentId || skill.id;

  return (
    <Link href={`/skills/${skillId}`}>
      <Card className="card-hover border-border/50 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={attrs.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-4xl text-muted-foreground/30">
                {attrs.title?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </div>
          )}
          {/* Level Badge */}
          <Badge className="absolute top-3 right-3 bg-gold-400 text-black border-0 capitalize">
            {attrs.level}
          </Badge>
        </div>

        <CardContent className="flex-1 p-4">
          <p className="text-xs text-gold-400 font-medium mb-1">{categoryName}</p>
          <h3 className="font-semibold text-lg line-clamp-1">{attrs.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {attrs.description?.replace(/<[^>]*>/g, "").slice(0, 100)}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{ownerName}</span>
          </div>
          <div className="flex items-center gap-2">
            {attrs.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1 max-w-[80px]">{attrs.location}</span>
              </div>
            )}
            {showStatus && <StatusBadge status={attrs.status} />}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
