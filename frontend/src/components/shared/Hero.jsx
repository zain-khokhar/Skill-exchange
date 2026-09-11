import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 mb-6">
            <Zap className="h-4 w-4 text-gold-400" />
            <span className="text-sm text-gold-400 font-medium">Share Your Skills, Learn New Ones</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Exchange Skills,{" "}
            <span className="text-gradient-gold">Grow Together</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A platform where you can share your expertise and learn from others.
            From programming to cooking, find skills that matter to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-red-400 text-black hover:bg-gold-500 font-semibold px-8">
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/skills">Browse Skills</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
