"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Calendar, Clock, MapPin, ShoppingBag, Users, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock user data - in a real app, this would come from your auth system
const mockUser = {
  name: "John Doe",
  role: "donor", // donor, recipient, or volunteer
}

// Mock statistics
const donorStats = [
  {
    title: "Total Donations",
    value: "24",
    icon: ShoppingBag,
    description: "Food items donated",
  },
  {
    title: "People Helped",
    value: "86",
    icon: Users,
    description: "Estimated impact",
  },
  {
    title: "Food Saved",
    value: "42 kg",
    icon: Utensils,
    description: "Total weight",
  },
  {
    title: "Points Earned",
    value: "320",
    icon: Calendar,
    description: "Donor rewards",
  },
]

const recipientStats = [
  {
    title: "Food Received",
    value: "18",
    icon: ShoppingBag,
    description: "Food items claimed",
  },
  {
    title: "Donors Connected",
    value: "7",
    icon: Users,
    description: "Unique donors",
  },
  {
    title: "Next Pickup",
    value: "Today",
    icon: Clock,
    description: "At 5:00 PM",
  },
  {
    title: "Favorite Locations",
    value: "3",
    icon: MapPin,
    description: "Saved locations",
  },
]

const volunteerStats = [
  {
    title: "Deliveries Made",
    value: "12",
    icon: ShoppingBag,
    description: "Completed deliveries",
  },
  {
    title: "People Helped",
    value: "34",
    icon: Users,
    description: "Recipients served",
  },
  {
    title: "Hours Volunteered",
    value: "18",
    icon: Clock,
    description: "Total time",
  },
  {
    title: "Distance Covered",
    value: "42 km",
    icon: MapPin,
    description: "Total distance",
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    title: "Fresh Vegetables",
    description: "5kg of mixed vegetables",
    status: "Donated",
    time: "2 hours ago",
    location: "Green Grocers, Downtown",
  },
  {
    id: 2,
    title: "Bread and Pastries",
    description: "12 assorted bread loaves and pastries",
    status: "Claimed",
    time: "Yesterday",
    location: "Sunshine Bakery, Westside",
  },
  {
    id: 3,
    title: "Canned Goods",
    description: "24 cans of various food items",
    status: "Delivered",
    time: "3 days ago",
    location: "Community Center, Northside",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<null | typeof mockUser>(null)
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(mockUser)

      // Set stats based on user role
      if (mockUser.role === "donor") {
        setStats(donorStats)
      } else if (mockUser.role === "recipient") {
        setStats(recipientStats)
      } else {
        setStats(volunteerStats)
      }
    }, 500)
  }, [])

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
            <p className="text-gray-500">Please wait while we load your dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
        <p className="text-gray-500">
          {user.role === "donor"
            ? "Track your donations and impact"
            : user.role === "recipient"
              ? "Find and claim available food"
              : "Manage your delivery tasks"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.role === "donor" ? (
            <>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/post-food">Post New Food Donation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/donations">View My Donations</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/impact">See My Impact</Link>
              </Button>
            </>
          ) : user.role === "recipient" ? (
            <>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/find-food">Find Available Food</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/map">View Food Map</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/claims">Manage My Claims</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/deliveries">Find Delivery Tasks</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/my-deliveries">My Deliveries</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/schedule">My Schedule</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === "Donated"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "Claimed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

