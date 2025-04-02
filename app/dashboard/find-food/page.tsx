"use client"

import { useState, useEffect } from "react"
import { Filter, MapPin, Clock, Search, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Mock food listings data
const mockFoodListings = [
  {
    id: 1,
    title: "Fresh Vegetables",
    description: "Assorted vegetables including carrots, tomatoes, and lettuce. All organic and freshly harvested.",
    quantity: "5kg",
    category: "vegetables",
    expiryDate: "2025-04-03",
    expiryTime: "18:00",
    address: "Green Grocers, 123 Main St, Downtown",
    distance: "0.8",
    image: "/placeholder.svg?height=200&width=300",
    donor: {
      name: "Green Grocers",
      rating: 4.8,
    },
  },
  {
    id: 2,
    title: "Bread and Pastries",
    description:
      "Assorted bread loaves and pastries from today's baking. Includes sourdough, baguettes, and croissants.",
    quantity: "12 items",
    category: "bakery",
    expiryDate: "2025-04-03",
    expiryTime: "20:00",
    address: "Sunshine Bakery, 456 Oak St, Westside",
    distance: "1.2",
    image: "/placeholder.svg?height=200&width=300",
    donor: {
      name: "Sunshine Bakery",
      rating: 4.9,
    },
  },
  {
    id: 3,
    title: "Canned Goods",
    description: "Assorted canned vegetables, fruits, and beans. All unexpired and in good condition.",
    quantity: "24 cans",
    category: "canned",
    expiryDate: "2025-06-15",
    expiryTime: "23:59",
    address: "Community Center, 789 Pine St, Northside",
    distance: "2.5",
    image: "/placeholder.svg?height=200&width=300",
    donor: {
      name: "Community Food Bank",
      rating: 4.7,
    },
  },
  {
    id: 4,
    title: "Prepared Meals",
    description: "Freshly prepared vegetarian meals including pasta, salads, and rice dishes. Ready to eat or heat.",
    quantity: "8 portions",
    category: "prepared",
    expiryDate: "2025-04-03",
    expiryTime: "21:00",
    address: "Healthy Eats Restaurant, 101 Elm St, Eastside",
    distance: "1.7",
    image: "/placeholder.svg?height=200&width=300",
    donor: {
      name: "Healthy Eats Restaurant",
      rating: 4.6,
    },
  },
  {
    id: 5,
    title: "Dairy Products",
    description: "Assorted dairy products including milk, yogurt, and cheese. All refrigerated and fresh.",
    quantity: "10 items",
    category: "dairy",
    expiryDate: "2025-04-05",
    expiryTime: "12:00",
    address: "Fresh Farms Market, 202 Maple St, Southside",
    distance: "3.1",
    image: "/placeholder.svg?height=200&width=300",
    donor: {
      name: "Fresh Farms Market",
      rating: 4.5,
    },
  },
]

export default function FindFoodPage() {
  const [foodListings, setFoodListings] = useState<typeof mockFoodListings>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    maxDistance: 5,
    sortBy: "distance",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching food listings
    setTimeout(() => {
      setFoodListings(mockFoodListings)
    }, 500)
  }, [])

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      return { ...prev, categories }
    })
  }

  const handleDistanceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, maxDistance: value[0] }))
  }

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }

  const handleClaimFood = (id: number) => {
    toast({
      title: "Food claimed",
      description: "You have successfully claimed this food item. Contact the donor for pickup details.",
    })
  }

  const filteredListings = foodListings
    .filter((listing) => {
      // Filter by search term
      if (
        searchTerm &&
        !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(listing.category)) {
        return false
      }

      // Filter by distance
      if (Number.parseFloat(listing.distance) > filters.maxDistance) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      if (filters.sortBy === "distance") {
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      } else if (filters.sortBy === "expiry") {
        return (
          new Date(`${a.expiryDate}T${a.expiryTime}`).getTime() - new Date(`${b.expiryDate}T${b.expiryTime}`).getTime()
        )
      } else {
        return 0
      }
    })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Available Food</h1>
        <p className="text-gray-500">Browse and claim available food donations near you</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for food items..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Nearest First</SelectItem>
              <SelectItem value="expiry">Expiring Soon</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-2">
                    {[
                      { id: "vegetables", label: "Vegetables & Fruits" },
                      { id: "bakery", label: "Bakery Items" },
                      { id: "dairy", label: "Dairy Products" },
                      { id: "canned", label: "Canned Goods" },
                      { id: "prepared", label: "Prepared Meals" },
                      { id: "other", label: "Other" },
                    ].map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={filters.categories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <Label htmlFor={category.id}>{category.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Maximum Distance</h3>
                    <span className="text-sm text-gray-500">{filters.maxDistance} km</span>
                  </div>
                  <Slider
                    defaultValue={[filters.maxDistance]}
                    max={10}
                    step={0.5}
                    onValueChange={handleDistanceChange}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 km</span>
                    <span>10 km</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Food Listings */}
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">No food items found</h2>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilters({
                  categories: [],
                  maxDistance: 5,
                  sortBy: "distance",
                })
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {listing.distance} km
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-500 line-clamp-2">{listing.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>{listing.donor.name}</span>
                  <span className="text-yellow-500">★</span>
                  <span>{listing.donor.rating}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span>Expires: {new Date(`${listing.expiryDate}T${listing.expiryTime}`).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md">
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                    <span>Quantity: {listing.quantity}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleClaimFood(listing.id)}>
                  Claim Food
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

