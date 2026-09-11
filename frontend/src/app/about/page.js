import { Card, CardContent } from "@/components/ui/card";
import { Zap, Users, BookOpen, Shield } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Skill Sharing",
    desc: "Share your expertise with others and help them grow. From coding to cooking, every skill is valuable.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Connect with like-minded people who are passionate about learning and teaching new skills.",
  },
  {
    icon: BookOpen,
    title: "Learn Anything",
    desc: "Browse through categories of skills and find exactly what you want to learn from experienced people.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "All skill listings are reviewed by our admin team before publishing to ensure quality content.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-gradient-gold">SkillExchange</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          SkillExchange is a platform designed to connect people who want to share their skills with those eager to learn.
          Our mission is to create a community where knowledge flows freely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="border-border/50">
            <CardContent className="p-6 flex gap-4">
              <div className="p-3 rounded-lg bg-gold-400/10 h-fit">
                <feature.icon className="h-6 w-6 text-gold-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="space-y-4 text-left">
          <div className="flex gap-4 items-start">
            <div className="text-gold-400 font-bold text-lg">1.</div>
            <div>
              <h3 className="font-semibold">Register & Login</h3>
              <p className="text-sm text-muted-foreground">Create your free account to get started.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-gold-400 font-bold text-lg">2.</div>
            <div>
              <h3 className="font-semibold">Offer Your Skills</h3>
              <p className="text-sm text-muted-foreground">Go to your dashboard and create a skill listing with details like title, description, category, and images.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-gold-400 font-bold text-lg">3.</div>
            <div>
              <h3 className="font-semibold">Admin Approval</h3>
              <p className="text-sm text-muted-foreground">Your listing will be reviewed by our team. Once approved, it becomes visible to everyone.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-gold-400 font-bold text-lg">4.</div>
            <div>
              <h3 className="font-semibold">Browse & Connect</h3>
              <p className="text-sm text-muted-foreground">Browse available skills from other community members and connect with them.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
