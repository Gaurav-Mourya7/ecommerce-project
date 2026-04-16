"use client";

import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/context/AuthContext";

// Mock data
const STATS = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Products",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    icon: TrendingUp,
  },
];

const RECENT_ORDERS = [
  {
    id: "ORD-XK7H2M",
    customer: "John Smith",
    product: "Wireless Headphones",
    amount: 199.99,
    status: "PROCESSING",
    date: "2024-03-15",
  },
  {
    id: "ORD-P9M3KL",
    customer: "Sarah Johnson",
    product: "Smart Watch",
    amount: 299.99,
    status: "SHIPPED",
    date: "2024-03-14",
  },
  {
    id: "ORD-W4N8QR",
    customer: "Mike Davis",
    product: "Bluetooth Speaker",
    amount: 89.99,
    status: "DELIVERED",
    date: "2024-03-13",
  },
  {
    id: "ORD-T6J2LP",
    customer: "Emily Brown",
    product: "USB-C Hub",
    amount: 49.99,
    status: "PENDING",
    date: "2024-03-12",
  },
];

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    sales: 45,
    revenue: 8999.55,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    sales: 32,
    revenue: 9599.68,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    sales: 28,
    revenue: 2519.72,
    imageUrl:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop",
  },
];

const STATUS_STYLES = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  PROCESSING:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  SHIPPED:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
  DELIVERED:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function SellerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Seller"}
          </p>
        </div>
        <Link href="/seller/products/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 size-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 size-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/seller/orders">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription>
              Your latest customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">
                        {order.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          STATUS_STYLES[
                            order.status as keyof typeof STATUS_STYLES
                          ]
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} - {order.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(order.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Link href="/seller/products">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription>
              Your best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TOP_PRODUCTS.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="size-12 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
