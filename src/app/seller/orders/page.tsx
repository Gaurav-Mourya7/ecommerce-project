"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Eye, Truck } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, formatDate } from "@/lib/utils";

// Mock orders data
const MOCK_ORDERS = [
  {
    id: "ORD-XK7H2M",
    customer: {
      name: "John Smith",
      email: "john@example.com",
    },
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 199.99 },
    ],
    total: 215.99,
    status: "PROCESSING" as const,
    date: "2024-03-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-P9M3KL",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    items: [
      { name: "Smart Watch", quantity: 1, price: 299.99 },
      { name: "Watch Band", quantity: 2, price: 29.99 },
    ],
    total: 388.37,
    status: "SHIPPED" as const,
    date: "2024-03-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ORD-W4N8QR",
    customer: {
      name: "Mike Davis",
      email: "mike@example.com",
    },
    items: [
      { name: "Bluetooth Speaker", quantity: 1, price: 89.99 },
    ],
    total: 97.19,
    status: "DELIVERED" as const,
    date: "2024-03-13",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ORD-T6J2LP",
    customer: {
      name: "Emily Brown",
      email: "emily@example.com",
    },
    items: [
      { name: "USB-C Hub", quantity: 2, price: 49.99 },
    ],
    total: 107.98,
    status: "PENDING" as const,
    date: "2024-03-12",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
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

export default function SellerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (
    orderId: string,
    newStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track your customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            {filteredOrders.length} order
            {filteredOrders.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-4 font-mono text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </td>
                    <td className="py-4 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className={STATUS_STYLES[order.status]}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 size-4" />
                            View Details
                          </DropdownMenuItem>
                          {order.status === "PENDING" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleUpdateStatus(order.id, "PROCESSING")
                              }
                            >
                              <Truck className="mr-2 size-4" />
                              Mark Processing
                            </DropdownMenuItem>
                          )}
                          {order.status === "PROCESSING" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleUpdateStatus(order.id, "SHIPPED")
                              }
                            >
                              <Truck className="mr-2 size-4" />
                              Mark Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status === "SHIPPED" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleUpdateStatus(order.id, "DELIVERED")
                              }
                            >
                              <Truck className="mr-2 size-4" />
                              Mark Delivered
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
