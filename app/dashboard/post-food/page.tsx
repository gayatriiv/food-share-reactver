"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function PostFoodPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    category: "",
    expiryDate: "",
    expiryTime: "",
    address: "",
    image: null as File | null,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Food listing created",
        description: "Your food donation has been posted successfully!",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post Food Donation</h1>
        <p className="text-gray-500">Share details about the food you want to donate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Food Details</CardTitle>
              <CardDescription>Provide information about the food you're donating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Food Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Fresh Vegetables, Bread, Canned Goods"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the food items, condition, etc."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 5kg, 10 items, 3 boxes"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                      <SelectItem value="bakery">Bakery Items</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="canned">Canned Goods</SelectItem>
                      <SelectItem value="prepared">Prepared Meals</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryTime">Expiry Time</Label>
                  <div className="relative">
                    <Input
                      id="expiryTime"
                      name="expiryTime"
                      type="time"
                      value={formData.expiryTime}
                      onChange={handleChange}
                      required
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Pickup Address</Label>
                <div className="relative">
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter the address where the food can be picked up"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="min-h-[80px] pr-10"
                  />
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {formData.image ? "Change Image" : "Upload Image"}
                  </Button>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {formData.image && <p className="text-sm text-gray-500">Selected: {formData.image.name}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Food Donation"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
            <CardDescription>Tips for successful food donations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Food Safety</h3>
              <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
                <li>Ensure food is properly packaged and sealed</li>
                <li>Refrigerated items should be kept cold</li>
                <li>Provide accurate expiry information</li>
                <li>Don't donate food that looks or smells spoiled</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Best Practices</h3>
              <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
                <li>Be specific about quantity and portions</li>
                <li>Add clear pickup instructions</li>
                <li>Upload a photo to help recipients identify the food</li>
                <li>Respond promptly to messages from recipients</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Recommended Items</h3>
              <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
                <li>Fresh produce with several days of shelf life</li>
                <li>Bakery items from the same day</li>
                <li>Canned and packaged goods (unopened)</li>
                <li>Prepared meals (properly stored)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

