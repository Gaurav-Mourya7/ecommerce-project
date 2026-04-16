"use client";

import Link from "next/link";
import { Package, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { useState } from "react";

// Mock orders data
const MOCK_ORDERS = [
  {
    id: "ORD-XK7H2M",
    date: "2024-03-15",
    status: "DELIVERED" as const,
    total: 249.98,
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        quantity: 1,
        price: 199.99,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      },
      {
        id: 9,
        name: "Stainless Steel Water Bottle",
        quantity: 2,
        price: 24.99,
        imageUrl:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD-P9M3KL",
    date: "2024-03-10",
    status: "SHIPPED" as const,
    total: 159.99,
    items: [
      {
        id: 11,
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 159.99,
        imageUrl:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD-W4N8QR",
    date: "2024-03-05",
    status: "PROCESSING" as const,
    total: 129.99,
    items: [
      {
        id: 5,
        name: "Running Sneakers",
        quantity: 1,
        price: 129.99,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD-T6J2LP",
    date: "2024-02-28",
    status: "DELIVERED" as const,
    total: 89.99,
    items: [
      {
        id: 10,
        name: "Vintage Denim Jacket",
        quantity: 1,
        price: 89.99,
        imageUrl:
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop",
      },
    ],
  },
];

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  PROCESSING: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  SHIPPED: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track and manage your orders
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by order ID..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "PROCESSING", "SHIPPED", "DELIVERED"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base font-mono">
                      {order.id}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={STATUS_STYLES[order.status]}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formatDate(order.date)}</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 4).map((item, index) => (
                      <div
                        key={item.id}
                        className="size-12 overflow-hidden rounded-lg border-2 border-background bg-muted"
                        style={{ zIndex: order.items.length - index }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex size-12 items-center justify-center rounded-lg border-2 border-background bg-muted text-xs font-medium">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/orders/${order.id}`}>
                      View Details
                      <ChevronRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4">
            <Package className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "You haven't placed any orders yet"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Link href="/home">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
