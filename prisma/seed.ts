import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import "dotenv/config"

// Setup connection for Prisma 7 simple way
const connectionString = process.env.DATABASE_URL || ''
let prisma: PrismaClient

try {
  // Use the adapter with the connection string directly
  // This is officially supported in many Prisma adapters
  const adapter = new PrismaMariaDb(connectionString)
  prisma = new PrismaClient({ adapter })
} catch (err) {
  console.log("Fallback to default client initialization")
  prisma = new PrismaClient()
}

async function main() {
  console.log('Seed started...')

  // 1. Création d'un refuge de test
  const refuge = await prisma.refuge.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Refuge de la Paix',
      address: '12 rue des Chats',
      city: 'Paris',
      postalCode: '75001',
      latitude: 48.8566,
      longitude: 2.3522,
      email: 'contact@refuge.fr'
    }
  })

  // 2. Création de quelques animaux
  const animals = [
    {
      externalId: 'dog_001',
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '2 ans',
      gender: 'Mâle',
      size: 'Grand',
      goodWithChildren: true,
      goodWithDogs: true,
      goodWithCats: false,
      needsGarden: true,
      refugeId: refuge.id
    },
    {
      externalId: 'cat_001',
      name: 'Luna',
      species: 'Cat',
      breed: 'Européen',
      age: '5 mois',
      gender: 'Femelle',
      size: 'Petit',
      goodWithChildren: true,
      goodWithDogs: false,
      goodWithCats: true,
      needsGarden: false,
      refugeId: refuge.id
    },
    {
      externalId: 'dog_002',
      name: 'Max',
      species: 'Dog',
      breed: 'Bouledogue Français',
      age: '4 ans',
      gender: 'Mâle',
      size: 'Moyen',
      goodWithChildren: true,
      goodWithDogs: true,
      goodWithCats: true,
      needsGarden: false,
      refugeId: refuge.id
    }
  ]

  for (const animal of animals) {
    await prisma.animal.upsert({
      where: { externalId: animal.externalId },
      update: {},
      create: animal as any
    })
  }

  console.log('Seed finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
