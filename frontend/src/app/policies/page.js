"use client";

import { useEffect, useState } from "react";
import { getPages } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function PoliciesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPages() {
      try {
        const data = await getPages();
        setPages(data.data || []);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PageHeader title="Policies & Information" description="Important documents and policies" />

      {pages.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No pages available yet.</p>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => {
            const attrs = page.attributes || page;
            return (
              <Link key={page.id} href={`/policies/${attrs.slug}`}>
                <Card className="border-border/50 hover:border-gold-400/30 transition-colors cursor-pointer mb-4">
                  <CardContent className="p-4 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gold-400" />
                    <div>
                      <h3 className="font-semibold">{attrs.title}</h3>
                      <p className="text-sm text-muted-foreground">Click to read</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
