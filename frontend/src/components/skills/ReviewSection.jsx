"use client";

import { useState, useEffect } from "react";
import { getSkillReviews, createReview, getBookingReviews } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";

function StarRating({ rating, onRate, interactive = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? "fill-gold-400 text-gold-400" : "text-muted-foreground"} ${interactive ? "cursor-pointer hover:text-gold-400" : ""}`}
          onClick={() => interactive && onRate(star)}
        />
      ))}
    </div>
  );
}

export default function ReviewSection({ skillId, bookingId = null }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getSkillReviews(skillId);
        setReviews(data.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }
    fetchReviews();
  }, [skillId]);

  // Check if user already reviewed this booking
  useEffect(() => {
    async function checkExistingReview() {
      if (!bookingId || !user) return;
      try {
        const data = await getBookingReviews(bookingId, user.id);
        if ((data.data || []).length > 0) setAlreadyReviewed(true);
        else setShowForm(true);
      } catch (error) {
        console.error("Failed to check reviews:", error);
      }
    }
    checkExistingReview();
  }, [bookingId, user]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createReview({
        rating,
        comment,
        reviewer: user.id,
        skill: parseInt(skillId),
        ...(bookingId ? { booking: parseInt(bookingId) } : {}),
      });
      toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
      setShowForm(false);
      setRating(0);
      setComment("");
      // Refresh reviews
      const data = await getSkillReviews(skillId);
      setReviews(data.data || []);
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to submit review.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + ((r.attributes?.rating || r.rating) || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Reviews {averageRating && `(${averageRating} ★ · ${reviews.length} review${reviews.length !== 1 ? "s" : ""})`}
        </h2>
        {user && !showForm && !alreadyReviewed && bookingId && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>Write a Review</Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && !alreadyReviewed && (
        <Card className="border-gold-400/20">
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-medium">Your Rating</p>
            <StarRating rating={rating} onRate={setRating} interactive />
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button className="bg-gold-400 text-black hover:bg-gold-500" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {alreadyReviewed && (
        <p className="text-sm text-muted-foreground">You have already reviewed this exchange.</p>
      )}

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => {
            const attrs = review.attributes || review;
            const reviewerName = attrs.reviewer?.data?.attributes?.username || attrs.reviewer?.username || "Anonymous";
            return (
              <Card key={review.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gold-400/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-gold-400" />
                    </div>
                    <span className="font-medium text-sm">{reviewerName}</span>
                    <StarRating rating={attrs.rating} />
                  </div>
                  {attrs.comment && <p className="text-sm text-muted-foreground">{attrs.comment}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
