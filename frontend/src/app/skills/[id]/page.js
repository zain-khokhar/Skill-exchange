"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSkillById, createBooking, createReport } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import StatusBadge from "@/components/skills/StatusBadge";
import ReviewSection from "@/components/skills/ReviewSection";
import BookingDialog from "@/components/skills/BookingDialog";
import ReportDialog from "@/components/skills/ReportDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, ArrowLeft, Flag, Handshake } from "lucide-react";
import { getMediaItems, getRecordAttributes, getRelationData, getRelationId } from "@/lib/utils";

export default function SkillDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const reviewBookingId = searchParams.get("bookingId");
  const showReview = searchParams.get("review") === "true";

  useEffect(() => {
    async function fetchSkill() {
      try {
        const data = await getSkillById(params.id);
        setSkill(data.data);
      } catch (error) {
        console.error("Failed to fetch skill:", error);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchSkill();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Skill Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/skills">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
          </Link>
        </Button>
      </div>
    );
  }

  const attrs = getRecordAttributes(skill);
  const images = getMediaItems(attrs.images);
  const category = getRelationData(attrs.category);
  const owner = getRelationData(attrs.owner);
  const categoryName = category?.name || "Uncategorized";
  const ownerName = owner?.username || "Unknown User";
  const ownerId = getRelationId(attrs.owner);
  const isOwner = user && user.id === ownerId;
  const skillType = attrs.type || "offered";

  const handleBooking = async ({ message, proposedDate }) => {
    setBookingLoading(true);
    try {
      await createBooking({
        skill: parseInt(params.id),
        requester: user.id,
        provider: ownerId,
        message,
        proposedDate,
        status: "pending",
      });
      toast({ title: "Exchange Requested!", description: "The skill provider will be notified." });
      setBookingOpen(false);
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to send request.", variant: "destructive" });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReport = async (reason) => {
    setReportLoading(true);
    try {
      await createReport({
        reason,
        reporter: user.id,
        reportedUser: ownerId,
        reportedSkill: parseInt(params.id),
        status: "pending",
      });
      toast({ title: "Report Submitted", description: "Our admin team will review it." });
      setReportOpen(false);
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to submit report.", variant: "destructive" });
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/skills">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={img.url}
                    alt={`${attrs.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Title and Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-gold-400/10 text-gold-400 border-gold-400/20">
                {categoryName}
              </Badge>
              <Badge variant="outline" className="capitalize">{attrs.level}</Badge>
              <Badge variant="outline" className="capitalize">{skillType}</Badge>
              <StatusBadge status={attrs.status} />
            </div>
            <h1 className="text-3xl font-bold">{attrs.title}</h1>
          </div>

          {/* Description */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <div className="text-muted-foreground whitespace-pre-wrap">
                {attrs.description?.replace(/<[^>]*>/g, "") || "No description provided."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Owner Info */}
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">{skillType === "offered" ? "Offered By" : "Requested By"}</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold-400/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-gold-400" />
                </div>
                <span className="font-medium">{ownerName}</span>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Details</h3>
              {attrs.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{attrs.location}</span>
                </div>
              )}
              {attrs.availability && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{attrs.availability}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {user && !isOwner && attrs.status === "approved" && (
            <div className="space-y-2">
              <Button className="w-full bg-gold-400 text-black hover:bg-gold-500 font-semibold" onClick={() => setBookingOpen(true)}>
                <Handshake className="h-4 w-4 mr-2" /> Request Exchange
              </Button>
              <Button variant="outline" className="w-full text-red-400 hover:text-red-300" onClick={() => setReportOpen(true)}>
                <Flag className="h-4 w-4 mr-2" /> Report
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <ReviewSection skillId={params.id} bookingId={showReview ? reviewBookingId : null} />
      </div>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onSubmit={handleBooking}
        skillTitle={attrs.title}
        loading={bookingLoading}
      />

      {/* Report Dialog */}
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        onSubmit={handleReport}
        loading={reportLoading}
      />
    </div>
  );
}
