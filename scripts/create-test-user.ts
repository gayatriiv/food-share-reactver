import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

async function main() {
  const password = await hash("test123", 12)
  
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password,
      role: "DONOR",
    },
  })

  console.log("Created test user:", user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 