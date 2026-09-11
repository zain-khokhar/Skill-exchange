"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/skills/ImageUpload";
import { SKILL_LEVELS } from "@/lib/constants";
import { getCategories } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function SkillForm({ onSubmit, initialData = null, loading = false }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [level, setLevel] = useState(initialData?.level || "beginner");
  const [location, setLocation] = useState(initialData?.location || "");
  const [availability, setAvailability] = useState(initialData?.availability || "");
  const [images, setImages] = useState(initialData?.images || []);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category: parseInt(category),
      level,
      location,
      availability,
      images: images.map((img) => img.url),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Skill Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Skill Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Web Design Basics, Cooking Italian Food"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe what you can teach or do..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category and Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category *</Label>
          {loadingCategories ? (
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          ) : (
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.attributes?.name || cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <Label>Skill Level *</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {SKILL_LEVELS.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location and Availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            placeholder="e.g., Lahore, Online"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Input
            id="availability"
            placeholder="e.g., Weekends, Mon-Fri 5-7 PM"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label>Images (Optional)</Label>
        <ImageUpload images={images} onImagesChange={setImages} maxImages={3} />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-gold-400 text-black hover:bg-gold-500 font-semibold"
        disabled={loading || !title || !description || !category}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Submitting..." : "Submit Skill"}
      </Button>
    </form>
  );
}
