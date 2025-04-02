import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, quantity, unit, expiryDate } = body

    const donation = await prisma.donation.create({
      data: {
        title,
        description,
        quantity,
        unit,
        expiryDate: new Date(expiryDate),
        donorId: session.user.id,
      },
    })

    return NextResponse.json(donation)
  } catch (error) {
    console.error("[DONATIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const donations = await prisma.donation.findMany({
      where: {
        status: "AVAILABLE",
        expiryDate: {
          gt: new Date(),
        },
      },
      include: {
        donor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error("[DONATIONS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 