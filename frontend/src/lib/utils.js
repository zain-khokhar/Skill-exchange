import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRecordAttributes(record) {
  return record?.attributes || record || {};
}

export function getRelationData(relation) {
  if (!relation) return null;
  const relationValue = relation.data ?? relation;
  return relationValue?.attributes || relationValue;
}

export function getRelationId(relation) {
  const relationValue = relation?.data ?? relation;
  return relationValue?.id ?? null;
}

export function getMediaItems(media) {
  if (!media) return [];

  const mediaValue = media.data ?? media;
  const items = Array.isArray(mediaValue) ? mediaValue : [mediaValue];

  return items
    .map((item) => item?.attributes || item)
    .filter(Boolean);
}

export function getFirstMediaUrl(media) {
  return getMediaItems(media)[0]?.url || null;
}
