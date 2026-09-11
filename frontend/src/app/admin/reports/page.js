"use client";

import { useEffect, useState } from "react";
import { getAllReports, updateReportStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  reviewed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  resolved: "bg-green-500/10 text-green-500 border-green-500/20",
  dismissed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  async function fetchReports() {
    try {
      const data = await getAllReports();
      setReports(data.data || []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateReportStatus(id, status, adminNotes);
      toast({ title: `Report ${status}!` });
      setSelectedReport(null);
      setAdminNotes("");
      fetchReports();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filterByStatus = (status) => {
    if (!status) return reports;
    return reports.filter((r) => (r.attributes?.status || r.status) === status);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader title="Abuse Reports" description="Review and manage user-submitted reports" />

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({reports.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterByStatus("pending").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({filterByStatus("resolved").length})</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed ({filterByStatus("dismissed").length})</TabsTrigger>
        </TabsList>

        {["all", "pending", "resolved", "dismissed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="border-border/50">
              <CardContent className="p-0">
                {filterByStatus(tab === "all" ? null : tab).length === 0 ? (
                  <EmptyState title="No Reports" description={`No ${tab} reports.`} />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Reported User</TableHead>
                        <TableHead>Skill</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterByStatus(tab === "all" ? null : tab).map((report) => {
                        const attrs = report.attributes || report;
                        const reporterName = attrs.reporter?.data?.attributes?.username || attrs.reporter?.username || "N/A";
                        const reportedUserName = attrs.reportedUser?.data?.attributes?.username || attrs.reportedUser?.username || "N/A";
                        const skillTitle = attrs.reportedSkill?.data?.attributes?.title || attrs.reportedSkill?.title || "N/A";
                        const status = attrs.status;

                        return (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{reporterName}</TableCell>
                            <TableCell className="text-muted-foreground">{reportedUserName}</TableCell>
                            <TableCell className="text-muted-foreground max-w-[150px] truncate">{skillTitle}</TableCell>
                            <TableCell className="text-muted-foreground max-w-[200px] truncate">{attrs.reason}</TableCell>
                            <TableCell><Badge className={STATUS_COLORS[status]}>{status}</Badge></TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => { setSelectedReport(report); setAdminNotes(attrs.adminNotes || ""); }}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {status === "pending" && (
                                  <>
                                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300" onClick={() => handleStatusUpdate(report.id, "resolved")}>
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => handleStatusUpdate(report.id, "dismissed")}>
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (() => {
            const attrs = selectedReport.attributes || selectedReport;
            return (
              <div className="space-y-3">
                <div><span className="font-medium">Reason:</span> <p className="text-muted-foreground mt-1">{attrs.reason}</p></div>
                <div><span className="font-medium">Status:</span> <Badge className={STATUS_COLORS[attrs.status]} >{attrs.status}</Badge></div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Notes</label>
                  <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Add notes about this report..." rows={3} />
                </div>
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>Close</Button>
            {(selectedReport?.attributes?.status || selectedReport?.status) === "pending" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate(selectedReport.id, "resolved")}>Resolve</Button>
                <Button variant="destructive" onClick={() => handleStatusUpdate(selectedReport.id, "dismissed")}>Dismiss</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
