"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Layers, CheckCircle, Clock, Flag } from "lucide-react";

export default function StatsCards({ stats }) {
  const cards = [
    { title: "Total Users", value: stats.users, icon: Users, color: "text-blue-400" },
    { title: "Total Skills", value: stats.skills, icon: Layers, color: "text-gold-400" },
    { title: "Pending Approval", value: stats.pending, icon: Clock, color: "text-yellow-400" },
    { title: "Categories", value: stats.categories, icon: CheckCircle, color: "text-green-400" },
    { title: "Pending Reports", value: stats.reports, icon: Flag, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-muted">
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
