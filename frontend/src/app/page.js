import Link from "next/link";
import Hero from "@/components/shared/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Wrench, Users, UserCheck, ClipboardList, Monitor, MessageSquare, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { name: "Cognitive / Intellectual", icon: Brain, desc: "Critical thinking, problem-solving, creativity" },
  { name: "Technical / Hard Skills", icon: Wrench, desc: "Programming, data analysis, graphic design" },
  { name: "Interpersonal / People", icon: Users, desc: "Communication, teamwork, leadership" },
  { name: "Self-Management", icon: UserCheck, desc: "Time management, adaptability, motivation" },
  { name: "Organizational", icon: ClipboardList, desc: "Project management, planning, delegation" },
  { name: "Digital / IT Skills", icon: Monitor, desc: "Web development, cloud computing, cybersecurity" },
  { name: "Language / Communication", icon: MessageSquare, desc: "Public speaking, writing, multilingualism" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create an Account", desc: "Sign up for free and set up your profile" },
  { step: "02", title: "Offer Your Skills", desc: "List the skills you can teach or share with others" },
  { step: "03", title: "Connect & Learn", desc: "Browse available skills and connect with skilled people" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Skill Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Explore Skill Categories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover a wide range of skills across different domains
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card key={cat.name} className="card-hover border-border/50">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-gold-400/10 shrink-0">
                  <cat.icon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Get started in just 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-gold-400/30 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Skills?</h2>
          <p className="text-muted-foreground mb-8">
            Join our community and start exchanging knowledge today. It&apos;s free and easy to get started.
          </p>
          <Button asChild size="lg" className="bg-blue-400 text-black hover:bg-gold-500 font-semibold px-8">
            <Link href="/register">
              Join SkillExchange
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
