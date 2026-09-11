"use client";

import { useEffect, useState } from "react";
import { getFAQs } from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const data = await getFAQs();
        setFaqs(data.data || []);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about SkillExchange"
      />

      {faqs.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No FAQs available yet.</p>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const attrs = faq.attributes || faq;
            const isOpen = openIndex === index;
            return (
              <Card key={faq.id} className="border-border/50 cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : index)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-gold-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{attrs.question}</h3>
                      {isOpen && (
                        <div
                          className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: attrs.answer?.replace(/<[^>]*>/g, "") || "" }}
                        />
                      )}
                    </div>
                    <span className="text-muted-foreground text-lg">{isOpen ? "−" : "+"}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
