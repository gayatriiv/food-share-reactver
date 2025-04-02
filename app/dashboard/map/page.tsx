"use client"

import { useState, useEffect } from "react"
import { MapPin, Search, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock food locations data
const mockLocations = [
  {
    id: 1,
    title: "Green Grocers",
    description: "Fresh vegetables and fruits available",
    address: "123 Main St, Downtown",
    lat: 40.7128,
    lng: -74.006,
    category: "vegetables",
    status: "available", // available, limited, high-demand
    items: 3,
  },
  {
    id: 2,
    title: "Sunshine Bakery",
    description: "Fresh bread and pastries",
    address: "456 Oak St, Westside",
    lat: 40.7148,
    lng: -74.008,
    category: "bakery",
    status: "limited",
    items: 1,
  },
  {
    id: 3,
    title: "Community Food Bank",
    description: "Canned goods and non-perishables",
    address: "789 Pine St, Northside",
    lat: 40.7158,
    lng: -74.003,
    category: "canned",
    status: "high-demand",
    items: 5,
  },
  {
    id: 4,
    title: "Healthy Eats Restaurant",
    description: "Prepared meals ready for pickup",
    address: "101 Elm St, Eastside",
    lat: 40.7138,
    lng: -74.001,
    category: "prepared",
    status: "available",
    items: 2,
  },
  {
    id: 5,
    title: "Fresh Farms Market",
    description: "Dairy products and fresh produce",
    address: "202 Maple St, Southside",
    lat: 40.7118,
    lng: -74.009,
    category: "dairy",
    status: "limited",
    items: 4,
  },
]

export default function MapPage() {
  const [locations, setLocations] = useState<typeof mockLocations>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof mockLocations)[0] | null>(null)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    statuses: ["available", "limited", "high-demand"],
  })
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching locations
    setTimeout(() => {
      setLocations(mockLocations)
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

  const handleStatusChange = (status: string) => {
    setFilters((prev) => {
      const statuses = prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status]
      return { ...prev, statuses }
    })
  }

  const handleLocationClick = (location: (typeof mockLocations)[0]) => {
    setSelectedLocation(location)
  }

  const handleClaimFood = (id: number) => {
    toast({
      title: "Food claimed",
      description: "You have successfully claimed food from this location. Contact the donor for pickup details.",
    })
    setSelectedLocation(null)
  }

  const filteredLocations = locations.filter((location) => {
    // Filter by search term
    if (
      searchTerm &&
      !location.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !location.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !location.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(location.category)) {
      return false
    }

    // Filter by statuses
    if (!filters.statuses.includes(location.status)) {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Donation Map</h1>
        <p className="text-gray-500">Find food donation locations near you</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for locations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                        id={`category-${category.id}`}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Availability Status</h3>
                <div className="space-y-2">
                  {[
                    { id: "available", label: "Available", color: "bg-green-100 text-green-800" },
                    { id: "limited", label: "Limited", color: "bg-yellow-100 text-yellow-800" },
                    { id: "high-demand", label: "High Demand", color: "bg-red-100 text-red-800" },
                  ].map((status) => (
                    <div key={status.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status.id}`}
                        checked={filters.statuses.includes(status.id)}
                        onCheckedChange={() => handleStatusChange(status.id)}
                      />
                      <Label htmlFor={`status-${status.id}`} className="flex items-center gap-2">
                        {status.label}
                        <Badge variant="outline" className={status.color}>
                          {status.id === "available" ? "Green" : status.id === "limited" ? "Yellow" : "Red"}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Map and Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden relative" style={{ height: "600px" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Interactive Map</p>
              <p className="text-sm text-gray-400">Google Maps would be integrated here</p>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
            <h3 className="font-medium text-sm mb-2">Map Legend</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Limited</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High Demand</span>
              </div>
            </div>
          </div>

          {/* Selected Location Info */}
          {selectedLocation && (
            <div className="absolute bottom-4 right-4 w-64 bg-white p-4 rounded-md shadow-md">
              <h3 className="font-medium">{selectedLocation.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{selectedLocation.description}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <MapPin className="h-3 w-3" />
                <span>{selectedLocation.address}</span>
              </div>
              <Badge
                className={`mb-3 ${
                  selectedLocation.status === "available"
                    ? "bg-green-100 text-green-800"
                    : selectedLocation.status === "limited"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {selectedLocation.status === "available"
                  ? "Available"
                  : selectedLocation.status === "limited"
                    ? "Limited"
                    : "High Demand"}
              </Badge>
              <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleClaimFood(selectedLocation.id)}
              >
                Claim Food
              </Button>
            </div>
          )}
        </div>

        {/* Locations List */}
        <div className="space-y-4 h-[600px] overflow-y-auto pr-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Locations</h2>
            <Select defaultValue="distance">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="items">Most Items</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="font-medium mb-1">No locations found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search term</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({
                      categories: [],
                      statuses: ["available", "limited", "high-demand"],
                    })
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <Card
                key={location.id}
                className={`cursor-pointer transition-all ${
                  selectedLocation?.id === location.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{location.title}</CardTitle>
                    <Badge
                      className={
                        location.status === "available"
                          ? "bg-green-100 text-green-800"
                          : location.status === "limited"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {location.status === "available"
                        ? "Available"
                        : location.status === "limited"
                          ? "Limited"
                          : "High Demand"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500 mb-2">{location.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>{location.address}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-gray-500">{location.items} items available</span>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

