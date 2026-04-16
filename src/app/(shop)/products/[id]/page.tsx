"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/lib/api/products";
import { ProductCard } from "@/components/products/ProductCard";

// Mock product data - in production, fetch from API
const MOCK_PRODUCT: Product = {
  id: 1,
  name: "Wireless Bluetooth Headphones",
  description:
    "Experience premium sound quality with our wireless Bluetooth headphones. Featuring advanced noise-canceling technology, these headphones deliver crystal-clear audio for music, calls, and gaming. With a 30-hour battery life, comfortable over-ear design, and seamless Bluetooth 5.0 connectivity, these headphones are perfect for all-day use. The built-in microphone ensures clear voice calls, while the foldable design makes them easy to carry anywhere.",
  price: 199.99,
  category: "electronics",
  imageUrl:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
  rating: 4.5,
  reviewCount: 128,
  stock: 50,
  sellerId: 1,
  sellerName: "TechStore Pro",
  createdAt: "2024-01-15",
};

const RELATED_PRODUCTS: Product[] = [
  {
    id: 2,
    name: "Minimalist Leather Watch",
    description: "Elegant leather strap watch",
    price: 149.99,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 256,
    stock: 25,
    sellerId: 1,
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker",
    price: 89.99,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 342,
    stock: 75,
    sellerId: 1,
    createdAt: "2024-02-10",
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard",
    price: 159.99,
    category: "electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 234,
    stock: 40,
    sellerId: 1,
    createdAt: "2024-03-20",
  },
];

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // In production, fetch product by ID from API
  const product = { ...MOCK_PRODUCT, id: parseInt(id) };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 size-4" />
          Back to shop
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <Badge variant="secondary" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-foreground text-foreground"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-4 text-4xl font-bold">{formatPrice(product.price)}</p>

            {/* Stock Status */}
            <div className="mt-3">
              {product.stock > 10 ? (
                <span className="text-sm text-green-600 dark:text-green-400">
                  In Stock
                </span>
              ) : product.stock > 0 ? (
                <span className="text-sm text-yellow-600 dark:text-yellow-400">
                  Only {product.stock} left
                </span>
              ) : (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Description */}
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Quantity and Actions */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 size-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`size-5 ${
                    isWishlisted ? "fill-destructive text-destructive" : ""
                  }`}
                />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="size-5" />
              </Button>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Truck className="size-5" />
              </div>
              <span className="mt-2 text-xs text-muted-foreground">
                Free Shipping
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Shield className="size-5" />
              </div>
              <span className="mt-2 text-xs text-muted-foreground">
                2 Year Warranty
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <RotateCcw className="size-5" />
              </div>
              <span className="mt-2 text-xs text-muted-foreground">
                30-Day Returns
              </span>
            </div>
          </div>

          {/* Seller Info */}
          <Card className="mt-6">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Sold by</p>
                <p className="font-medium">{product.sellerName}</p>
              </div>
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
