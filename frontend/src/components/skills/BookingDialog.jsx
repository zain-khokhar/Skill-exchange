"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function BookingDialog({ open, onOpenChange, onSubmit, skillTitle, loading = false }) {
  const [message, setMessage] = useState("");
  const [proposedDate, setProposedDate] = useState("");

  const handleSubmit = () => {
    onSubmit({ message, proposedDate: proposedDate || null });
    setMessage("");
    setProposedDate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Skill Exchange</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You are requesting an exchange for: <strong>{skillTitle}</strong>
          </p>
          <div className="space-y-2">
            <Label htmlFor="message">Message to Skill Provider</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain what you'd like to learn..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Proposed Date (Optional)</Label>
            <Input
              id="date"
              type="datetime-local"
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-gold-400 text-black hover:bg-gold-500" onClick={handleSubmit} disabled={loading || !message}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
