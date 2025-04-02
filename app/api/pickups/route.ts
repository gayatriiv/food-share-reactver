import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  organizationId?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = session.user as SessionUser
    const body = await req.json()
    const { scheduledAt, organizationId, donationIds } = body

    // Create pickup and update donations in a transaction
    const pickup = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create the pickup
      const pickup = await tx.pickup.create({
        data: {
          scheduledAt: new Date(scheduledAt),
          donorId: user.id,
          organizationId,
        },
      })

      // Update the donations
      await tx.donation.updateMany({
        where: {
          id: {
            in: donationIds,
          },
        },
        data: {
          status: "RESERVED",
          pickupId: pickup.id,
        },
      })

      return pickup
    })

    return NextResponse.json(pickup)
  } catch (error) {
    console.error("[PICKUPS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = session.user as SessionUser
    const pickups = await prisma.pickup.findMany({
      where: {
        OR: [
          { donorId: user.id },
          { organizationId: user.organizationId },
        ],
      },
      include: {
        donor: {
          select: {
            name: true,
            email: true,
          },
        },
        organization: {
          select: {
            name: true,
            address: true,
          },
        },
        donations: true,
      },
      orderBy: {
        scheduledAt: "desc",
      },
    })

    return NextResponse.json(pickups)
  } catch (error) {
    console.error("[PICKUPS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 