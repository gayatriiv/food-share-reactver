import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
    organizationId?: string
  }

  interface Session {
    user: User & {
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
} 