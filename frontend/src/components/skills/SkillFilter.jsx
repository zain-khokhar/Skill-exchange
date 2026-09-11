"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SKILL_LEVELS } from "@/lib/constants";
import { Search } from "lucide-react";

export default function SkillFilter({ categories = [], filters, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>

      {/* Category Filter */}
      <Select
        value={filters.category || "all"}
        onValueChange={(value) => onFilterChange({ ...filters, category: value === "all" ? "" : value })}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.attributes?.slug || cat.slug || cat.id.toString()}>
              {cat.attributes?.name || cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Level Filter */}
      <Select
        value={filters.level || "all"}
        onValueChange={(value) => onFilterChange({ ...filters, level: value === "all" ? "" : value })}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {SKILL_LEVELS.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location Filter */}
      <Input
        placeholder="Filter by location..."
        value={filters.location || ""}
        onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
        className="w-full sm:w-[180px]"
      />
    </div>
  );
}
