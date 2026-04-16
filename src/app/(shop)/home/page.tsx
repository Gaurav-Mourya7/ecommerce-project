"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Product } from "@/lib/api/products";

// Mock products data - in production, this would come from the API
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-canceling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    sellerId: 1,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    description: "Elegant leather strap watch with Japanese movement",
    price: 149.99,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 256,
    stock: 25,
    sellerId: 1,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Cotton Casual T-Shirt",
    description: "Soft organic cotton t-shirt in multiple colors",
    price: 29.99,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 89,
    stock: 100,
    sellerId: 2,
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality",
    price: 89.99,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 342,
    stock: 75,
    sellerId: 1,
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Running Sneakers",
    description: "Lightweight running shoes with advanced cushioning",
    price: 129.99,
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 198,
    stock: 45,
    sellerId: 3,
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 modern ceramic planters for indoor plants",
    price: 49.99,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 67,
    stock: 30,
    sellerId: 4,
    createdAt: "2024-02-20",
  },
  {
    id: 7,
    name: "Professional Camera Backpack",
    description: "Durable backpack with padded compartments for camera gear",
    price: 79.99,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 45,
    stock: 20,
    sellerId: 2,
    createdAt: "2024-03-01",
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    description: "Extra thick non-slip yoga mat for comfort and stability",
    price: 39.99,
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 312,
    stock: 80,
    sellerId: 3,
    createdAt: "2024-03-05",
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours",
    price: 24.99,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 156,
    stock: 120,
    sellerId: 4,
    createdAt: "2024-03-10",
  },
  {
    id: 10,
    name: "Vintage Denim Jacket",
    description: "Classic denim jacket with modern fit and vintage wash",
    price: 89.99,
    category: "clothing",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 78,
    stock: 35,
    sellerId: 2,
    createdAt: "2024-03-15",
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with custom switches",
    price: 159.99,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 234,
    stock: 40,
    sellerId: 1,
    createdAt: "2024-03-20",
  },
  {
    id: 12,
    name: "Cozy Throw Blanket",
    description: "Super soft fleece blanket perfect for movie nights",
    price: 34.99,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 189,
    stock: 60,
    sellerId: 4,
    createdAt: "2024-03-25",
  },
];

const DEFAULT_FILTERS = {
  category: "all",
  minPrice: 0,
  maxPrice: 1000,
  sortBy: "newest",
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: searchParams.get("category") || "all",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update filters when URL params change
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop All Products</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our collection of {MOCK_PRODUCTS.length} quality products
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 size-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={handleResetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="size-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No products found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleResetFilters}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
