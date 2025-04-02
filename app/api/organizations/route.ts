import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

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
    const { name, address, phone, email } = body

    const organization = await prisma.organization.create({
      data: {
        name,
        address,
        phone,
        email,
      },
    })

    // Update user with organization ID
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        organizationId: organization.id,
        role: "ORGANIZATION_ADMIN",
      },
    })

    return NextResponse.json(organization)
  } catch (error) {
    console.error("[ORGANIZATIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const organizations = await prisma.organization.findMany({
      include: {
        users: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(organizations)
  } catch (error) {
    console.error("[ORGANIZATIONS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 