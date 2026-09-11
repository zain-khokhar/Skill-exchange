"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function CategoryForm({ open, onOpenChange, onSubmit, initialData = null, loading = false }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [icon, setIcon] = useState(initialData?.icon || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, icon });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Category Name *</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Technical / Hard Skills"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-desc">Description</Label>
            <Textarea
              id="cat-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this category"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-icon">Icon Name (Lucide)</Label>
            <Input
              id="cat-icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="e.g., Brain, Wrench, Users"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gold-400 text-black hover:bg-gold-500" disabled={loading || !name}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {initialData ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
