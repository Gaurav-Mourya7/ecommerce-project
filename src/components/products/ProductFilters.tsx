"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "books", label: "Books" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

interface FiltersState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onReset: () => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.minPrice > 0 ||
    filters.maxPrice < 1000 ||
    filters.sortBy !== "newest";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="mr-1 size-3" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Min Price</span>
            <Slider
              value={[filters.minPrice]}
              min={0}
              max={1000}
              step={10}
              onValueChange={([value]) =>
                onFiltersChange({
                  ...filters,
                  minPrice: value,
                  maxPrice: Math.max(value, filters.maxPrice),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Max Price</span>
            <Slider
              value={[filters.maxPrice]}
              min={0}
              max={1000}
              step={10}
              onValueChange={([value]) =>
                onFiltersChange({
                  ...filters,
                  maxPrice: value,
                  minPrice: Math.min(value, filters.minPrice),
                })
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Sort */}
      <div className="space-y-3">
        <Label>Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, sortBy: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
