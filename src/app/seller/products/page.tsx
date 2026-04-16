"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/utils";

// Mock products data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 199.99,
    stock: 50,
    sales: 45,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "electronics",
    price: 149.99,
    stock: 25,
    sales: 32,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    category: "electronics",
    price: 89.99,
    stock: 75,
    sales: 28,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop",
  },
  {
    id: 7,
    name: "Professional Camera Backpack",
    category: "electronics",
    price: 79.99,
    stock: 0,
    sales: 15,
    status: "out_of_stock",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 159.99,
    stock: 40,
    sales: 22,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop",
  },
];

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Link href="/seller/products/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Sales</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm capitalize">
                      {product.category}
                    </td>
                    <td className="py-4 font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-destructive"
                            : product.stock < 20
                            ? "text-yellow-600 dark:text-yellow-400"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4">{product.sales}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          product.status === "active" ? "default" : "secondary"
                        }
                      >
                        {product.status === "active" ? "Active" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/seller/products/${product.id}/edit`}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 size-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
