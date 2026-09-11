"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPageBySlug } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PolicyDetailPage() {
  const params = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const data = await getPageBySlug(params.slug);
        const pages = data.data || [];
        setPage(pages[0] || null);
      } catch (error) {
        console.error("Failed to fetch page:", error);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) fetchPage();
  }, [params.slug]);

  if (loading) return <LoadingSpinner />;

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/policies"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Policies</Link>
        </Button>
      </div>
    );
  }

  const attrs = page.attributes || page;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/policies"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Policies</Link>
      </Button>

      <Card className="border-border/50">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">{attrs.title}</h1>
          <div
            className="prose prose-invert max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: attrs.content || "" }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
