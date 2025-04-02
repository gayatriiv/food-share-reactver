"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Search, MoreVertical, Phone, Video, Info, User, Clock, ImageIcon, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    name: "Green Grocers",
    avatar: "",
    lastMessage: "Your food is ready for pickup",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sunshine Bakery",
    avatar: "",
    lastMessage: "Can you pick up the bread by 6pm?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Community Food Bank",
    avatar: "",
    lastMessage: "Thank you for your help!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Healthy Eats Restaurant",
    avatar: "",
    lastMessage: "We have some extra meals today",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Fresh Farms Market",
    avatar: "",
    lastMessage: "Your reservation has been confirmed",
    time: "Monday",
    unread: 0,
    online: false,
  },
]

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "Green Grocers",
    content: "Hello! We have some fresh vegetables available for donation today.",
    time: "10:00 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "That's great! What kind of vegetables do you have?",
    time: "10:05 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Green Grocers",
    content:
      "We have carrots, tomatoes, lettuce, and some bell peppers. All organic and freshly harvested this morning.",
    time: "10:10 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content: "Perfect! I'd like to claim them. When can I pick them up?",
    time: "10:15 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Green Grocers",
    content: "You can come anytime between 2pm and 6pm today. We're located at 123 Main St, Downtown.",
    time: "10:20 AM",
    isMe: false,
  },
  {
    id: 6,
    sender: "Me",
    content: "Great, I'll be there around 3pm. Thank you!",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: 7,
    sender: "Green Grocers",
    content: "Your food is ready for pickup. Please come to the back entrance and ask for John.",
    time: "10:30 AM",
    isMe: false,
  },
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState<typeof mockConversations>([])
  const [selectedConversation, setSelectedConversation] = useState<(typeof mockConversations)[0] | null>(null)
  const [messages, setMessages] = useState<typeof mockMessages>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate fetching conversations
    setTimeout(() => {
      setConversations(mockConversations)
      setSelectedConversation(mockConversations[0])
      setMessages(mockMessages)
    }, 500)
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedConversation) return

    const newMsg = {
      id: messages.length + 1,
      sender: "Me",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleSelectConversation = (conversation: (typeof mockConversations)[0]) => {
    setSelectedConversation(conversation)

    // Mark conversation as read
    setConversations(conversations.map((c) => (c.id === conversation.id ? { ...c, unread: 0 } : c)))

    // In a real app, you would fetch messages for this conversation
    setMessages(mockMessages)
  }

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-500">Chat with donors and recipients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        {/* Conversations List */}
        <div className="bg-white rounded-lg border overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && <Badge className="bg-green-600">{conversation.unread}</Badge>}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-lg border overflow-hidden flex flex-col lg:col-span-2">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">{selectedConversation.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                      <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe ? "bg-green-600 text-white" : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`text-xs mt-1 flex items-center gap-1 ${
                          message.isMe ? "text-green-100" : "text-gray-500"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <User className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="font-medium mb-1">No conversation selected</h3>
              <p className="text-sm text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

