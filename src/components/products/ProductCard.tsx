"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/api/products";
import { useCart } from "@/lib/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-foreground/20">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="secondary" className="absolute left-2 top-2">
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-medium line-clamp-2 mt-1 group-hover:text-foreground/80">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-foreground text-foreground"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0"
            >
              <ShoppingCart className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
