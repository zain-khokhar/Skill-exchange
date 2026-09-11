"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyBookings, updateBookingStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react";
import Link from "next/link";

const STATUS_COLORS = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  accepted: "bg-green-500/10 text-green-500 border-green-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  cancelled: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function fetchBookings() {
    if (!user) return;
    try {
      const data = await getMyBookings(user.id);
      setBookings(data.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast({ title: `Booking ${status}!` });
      fetchBookings();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filterByTab = (tab) => {
    if (tab === "received") return bookings.filter((b) => {
      const attrs = b.attributes || b;
      return (attrs.provider?.data?.id || attrs.provider?.id) === user.id;
    });
    if (tab === "sent") return bookings.filter((b) => {
      const attrs = b.attributes || b;
      return (attrs.requester?.data?.id || attrs.requester?.id) === user.id;
    });
    return bookings;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="My Bookings" description="Manage your skill exchange bookings" />

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="received">Received ({filterByTab("received").length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({filterByTab("sent").length})</TabsTrigger>
        </TabsList>

        {["all", "received", "sent"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {filterByTab(tab).length === 0 ? (
              <EmptyState title="No Bookings" description={`No ${tab} bookings yet.`} />
            ) : (
              <div className="space-y-4">
                {filterByTab(tab).map((booking) => {
                  const attrs = booking.attributes || booking;
                  const skillTitle = attrs.skill?.data?.attributes?.title || attrs.skill?.title || "Unknown Skill";
                  const requesterName = attrs.requester?.data?.attributes?.username || attrs.requester?.username || "Unknown";
                  const providerName = attrs.provider?.data?.attributes?.username || attrs.provider?.username || "Unknown";
                  const isProvider = (attrs.provider?.data?.id || attrs.provider?.id) === user.id;
                  const status = attrs.status;
                  const skillId = attrs.skill?.data?.id || attrs.skill?.id;

                  return (
                    <Card key={booking.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Link href={`/skills/${skillId}`} className="font-semibold hover:text-gold-400 transition-colors">
                                {skillTitle}
                              </Link>
                              <Badge className={STATUS_COLORS[status]}>{status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><User className="h-3 w-3" /> {isProvider ? `From: ${requesterName}` : `To: ${providerName}`}</span>
                              {attrs.proposedDate && (
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(attrs.proposedDate).toLocaleDateString()}</span>
                              )}
                            </div>
                            {attrs.message && <p className="text-sm text-muted-foreground mt-1">{attrs.message}</p>}
                          </div>

                          <div className="flex items-center gap-2">
                            {isProvider && status === "pending" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate(booking.id, "accepted")}>
                                  <CheckCircle className="h-4 w-4 mr-1" /> Accept
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(booking.id, "rejected")}>
                                  <XCircle className="h-4 w-4 mr-1" /> Reject
                                </Button>
                              </>
                            )}
                            {status === "accepted" && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleStatusUpdate(booking.id, "completed")}>
                                <CheckCircle className="h-4 w-4 mr-1" /> Mark Complete
                              </Button>
                            )}
                            {status === "completed" && (
                              <Link href={`/skills/${skillId}?review=true&bookingId=${booking.id}`}>
                                <Button size="sm" variant="outline">Leave Review</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
