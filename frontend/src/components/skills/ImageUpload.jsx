"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";

export default function ImageUpload({ images = [], onImagesChange, maxImages = 3 }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`You can upload maximum ${maxImages} images`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploaded = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploaded]);
    } catch (error) {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border border-border group">
            <img src={img.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="w-24 h-24 rounded-md border-2 border-dashed border-border hover:border-gold-400/50 flex items-center justify-center cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading ? (
              <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            )}
          </label>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Upload up to {maxImages} images. Click on image to remove.
      </p>
    </div>
  );
}
