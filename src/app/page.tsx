import Link from "next/link";
import { ArrowRight, Shield, Truck, CreditCard, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: CreditCard,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support",
  },
];

const categories = [
  {
    name: "Electronics",
    href: "/home?category=electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
  },
  {
    name: "Clothing",
    href: "/home?category=clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  },
  {
    name: "Home & Garden",
    href: "/home?category=home",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
              <span className="text-sm font-bold text-background">S</span>
            </div>
            <span className="text-xl font-bold">Store</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
          <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                The complete platform for modern shopping
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Discover quality products from trusted sellers. Shop with confidence 
                knowing you&apos;re getting the best prices and service.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/home">
                  <Button size="lg" className="h-12 px-8">
                    Start Shopping
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b">
          <div className="container mx-auto grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
            {[
              { value: "10K+", label: "Products" },
              { value: "50K+", label: "Happy Customers" },
              { value: "500+", label: "Trusted Sellers" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-b py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Shop by Category</h2>
              <p className="mt-3 text-muted-foreground">
                Find exactly what you&apos;re looking for
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 flex items-center text-sm text-white/80">
                      Shop now
                      <ArrowRight className="ml-1 size-4" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Why Choose Us</h2>
              <p className="mt-3 text-muted-foreground">
                We make shopping simple, secure, and satisfying
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-colors hover:bg-accent"
                >
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-6 text-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to start selling?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Join thousands of sellers and reach millions of customers worldwide.
              </p>
              <Link href="/register">
                <Button size="lg" className="mt-6 h-12 px-8">
                  Create Seller Account
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-foreground">
              <span className="text-xs font-bold text-background">S</span>
            </div>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Store. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
