import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const count = await prisma.animal.count()
  console.log(`Animals in DB: ${count}`)
  process.exit(0)
}
main()
