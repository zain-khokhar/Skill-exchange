"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import StatusBadge from "@/components/skills/StatusBadge";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import { getRecordAttributes, getRelationData } from "@/lib/utils";

export default function SkillsTable({ skills, onApprove, onReject }) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleRejectClick = (id) => {
    setRejectingId(id);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    onReject(rejectingId, rejectionReason);
    setRejectDialogOpen(false);
    setRejectingId(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => {
            const attrs = getRecordAttributes(skill);
            const category = getRelationData(attrs.category);
            const owner = getRelationData(attrs.owner);
            const categoryName = category?.name || "N/A";
            const ownerName = owner?.username || "N/A";

            return (
              <TableRow key={skill.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{attrs.title}</TableCell>
                <TableCell className="text-muted-foreground">{ownerName}</TableCell>
                <TableCell className="text-muted-foreground">{categoryName}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{attrs.level}</TableCell>
                <TableCell>
                  <StatusBadge status={attrs.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/skills/${skill.documentId || skill.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {attrs.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-green-300"
                          onClick={() => onApprove(skill.documentId || skill.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleRejectClick(skill.documentId || skill.id)}
                        >
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

      {/* Rejection Reason Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for rejection (optional)</label>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explain why this skill is being rejected..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Reject Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
