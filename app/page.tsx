import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, Utensils, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Apple className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold">Waste to Food</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Reduce Food Waste, Feed Communities
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Connect restaurants, grocery stores, and individuals with those in need. Donate excess food and make a
                  difference in your community.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <img
                alt="Food donation"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg?height=550&width=800"
                width="800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How We Connect Food to People</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy to donate and receive food, reducing waste and helping communities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Donate Food</h3>
              <p className="text-center text-gray-500">
                Restaurants, grocery stores, and individuals can easily post excess food for donation.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Connect Recipients</h3>
              <p className="text-center text-gray-500">
                NGOs and individuals in need can find and claim available food donations nearby.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2 L12 22" />
                  <path d="M17 5 H9.5 a2.5 2.5 0 0 0 0 5 H14.5 a2.5 2.5 0 0 1 0 5 H7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Volunteer Delivery</h3>
              <p className="text-center text-gray-500">
                Volunteers can help transport food from donors to recipients who cannot pick up themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">Process</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our simple process connects food donors with recipients in just a few steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-center text-gray-500">Create an account as a Donor, Recipient, or Volunteer.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Post or Browse</h3>
              <p className="text-center text-gray-500">
                Donors post available food, Recipients browse and claim items.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Connect & Collect</h3>
              <p className="text-center text-gray-500">
                Coordinate pickup or delivery through our platform and chat system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Make a Difference?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Join our community today and help reduce food waste while feeding those in need.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-700">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between">
            <div className="flex items-center gap-2">
              <Apple className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold">Waste to Food</span>
            </div>
            <nav className="flex gap-4 md:gap-6">
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Waste to Food. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

