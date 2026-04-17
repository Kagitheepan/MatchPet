import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import DesktopScene from "@/components/3d/DesktopScene";
import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Récupérer un pool d'animaux récents
  const recentAnimals = await prisma.animal.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  // Filtrer pour obtenir (si possible) 3 espèces différentes
  const latestAnimals = [];
  const seenSpecies = new Set();
  
  for (const animal of recentAnimals) {
    if (!seenSpecies.has(animal.species)) {
      latestAnimals.push(animal);
      seenSpecies.add(animal.species);
    }
    if (latestAnimals.length === 3) break;
  }
  
  // Si on n'a pas trouvé 3 espèces différentes, on complète avec les animaux restants
  if (latestAnimals.length < 3) {
    for (const animal of recentAnimals) {
      if (!latestAnimals.some(a => a.id === animal.id)) {
        latestAnimals.push(animal);
        if (latestAnimals.length === 3) break;
      }
    }
  }

  const speciesMap: Record<string, string> = {
    Dog: "Chien",
    Cat: "Chat",
    Rabbit: "Lapin",
    Bird: "Oiseau"
  };
  return (
    <div className="w-full flex-1 flex flex-col bg-white">
      
      {/* Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="w-full h-[55vh] md:h-[65vh] rounded-[2rem] overflow-hidden relative shadow-md bg-[#f6f7f5] border border-gray-100">
          <DesktopScene model="dog" />
          <Link href="/onboarding" className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-20">
             <button className="bg-secondary-dark text-white font-cursive text-3xl md:text-4xl px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform border border-white/20 hover:shadow-xl">
              Matcher !
             </button>
          </Link>
        </div>
      </div>

      {/* Derniers arrivés Section */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h2 className="font-cursive text-4xl md:text-5xl text-[#e8a8a8] font-bold mb-8 md:mb-10">
          Derniers arrivés
        </h2>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-10 pb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {latestAnimals.length > 0 ? latestAnimals.map((animal) => {
             const photos = animal.photos as string[] | null;
             const imageUrl = photos && photos.length > 0 ? photos[0] : "https://images.unsplash.com/photo-1543466835-00a7907e9de1"; // fallback si pas d'image
             const speciesFr = speciesMap[animal.species] || animal.species;

             return (
               <div key={animal.id} className="bg-white rounded-[2.5rem] p-3 shadow-md border flex flex-col items-center pb-8 hover:-translate-y-1 transition-transform flex-none min-w-[260px] w-[75vw] max-w-[280px] snap-center md:w-full md:min-w-0 mx-auto">
                 <div className="w-full h-64 md:h-[17rem] rounded-[2rem] overflow-hidden relative">
                    <Image src={imageUrl} alt={animal.name} fill className="object-cover" />
                    <Heart className="absolute bottom-4 right-4 text-secondary-dark w-7 h-7 hover:fill-current cursor-pointer transition-all drop-shadow-md" />
                 </div>
                 <div className="bg-primary w-[85%] py-2 rounded-full -mt-6 relative z-10 shadow-sm text-center">
                    <span className="font-cursive text-white text-2xl font-bold tracking-wide">{animal.name}</span>
                 </div>
                 <p className="text-[15px] text-text-dark font-medium my-6 text-center px-4 leading-relaxed">
                   {speciesFr} {animal.breed ? ` (${animal.breed})` : ""}<br/>
                   {animal.age ? animal.age : "Âge non spécifié"}
                 </p>
                 <Link href={`/match`} className="w-[85%] mt-auto flex justify-center">
                   <button className="bg-secondary-dark text-white font-cursive text-2xl px-6 py-2 rounded-full shadow-md hover:bg-secondary transition-colors w-full">
                     En savoir +
                   </button>
                 </Link>
               </div>
             );
          }) : (
            <p className="text-gray-500 font-medium italic col-span-full text-center py-10">
              Aucun nouveau compagnon pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* Nos Articles Section */}
      <section className="hidden md:block w-full max-w-4xl mx-auto px-4 md:px-8 py-6 mb-20">
        <h2 className="font-cursive text-4xl md:text-5xl text-[#e8a8a8] font-bold mb-8 md:mb-10">
          Nos articles
        </h2>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-10 pb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
           {/* Article Card 1 */}
           <div className="bg-white rounded-[2.5rem] p-3 shadow-md border flex flex-col items-center pb-8 hover:-translate-y-1 transition-transform flex-none min-w-[260px] w-[75vw] max-w-[280px] snap-center md:w-full md:min-w-0 mx-auto">
             <div className="w-full h-64 md:h-[17rem] rounded-[2rem] overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600" alt="Article 1" fill className="object-cover" />
             </div>
             <div className="bg-primary w-[85%] py-2 rounded-full -mt-6 relative z-10 shadow-sm text-center">
                <span className="font-cursive text-white text-2xl font-bold tracking-wide">Nutrition</span>
             </div>
             <p className="text-[15px] text-text-dark font-medium my-6 text-center px-4 leading-relaxed">
               Lutter efficacement<br/>contre l&apos;obésité.
             </p>
             <button className="bg-secondary-dark text-white font-cursive text-2xl px-6 py-2 rounded-full shadow-md mt-auto hover:bg-secondary transition-colors w-[85%]">
               En savoir +
             </button>
           </div>

           {/* Article Card 2 */}
           <div className="bg-white rounded-[2.5rem] p-3 shadow-md border flex flex-col items-center pb-8 hover:-translate-y-1 transition-transform flex-none min-w-[260px] w-[75vw] max-w-[280px] snap-center md:w-full md:min-w-0 mx-auto">
             <div className="w-full h-64 md:h-[17rem] rounded-[2rem] overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1601758124277-f0086d52eb5a?q=80&w=600" alt="Article 2" fill className="object-cover" />
             </div>
             <div className="bg-primary w-[85%] py-2 rounded-full -mt-6 relative z-10 shadow-sm text-center">
                <span className="font-cursive text-white text-2xl font-bold tracking-wide">Sorties</span>
             </div>
             <p className="text-[15px] text-text-dark font-medium my-6 text-center px-4 leading-relaxed">
               Des promenades sportives<br/>organisées en 77.
             </p>
             <button className="bg-secondary-dark text-white font-cursive text-2xl px-6 py-2 rounded-full shadow-md mt-auto hover:bg-secondary transition-colors w-[85%]">
               En savoir +
             </button>
           </div>
           
           {/* Article Card 3 */}
           <div className="bg-white rounded-[2.5rem] p-3 shadow-md border flex flex-col items-center pb-8 hover:-translate-y-1 transition-transform flex-none min-w-[260px] w-[75vw] max-w-[280px] snap-center md:w-full md:min-w-0 mx-auto">
             <div className="w-full h-64 md:h-[17rem] rounded-[2rem] overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600" alt="Article 3" fill className="object-cover" />
             </div>
             <div className="bg-primary w-[85%] py-2 rounded-full -mt-6 relative z-10 shadow-sm text-center">
                <span className="font-cursive text-white text-2xl font-bold tracking-wide">Toilettage</span>
             </div>
             <p className="text-[15px] text-text-dark font-medium my-6 text-center px-4 leading-relaxed">
               Prendre soin du<br/>pelage de son animal.
             </p>
             <button className="bg-secondary-dark text-white font-cursive text-2xl px-6 py-2 rounded-full shadow-md mt-auto hover:bg-secondary transition-colors w-[85%]">
               En savoir +
             </button>
           </div>
        </div>
      </section>

    </div>
  );
}
