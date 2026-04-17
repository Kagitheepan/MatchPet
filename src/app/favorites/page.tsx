"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MapPin, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface FavoritePet {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
}

export default function FavoritesPage() {
  const [animals, setAnimals] = useState<FavoritePet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLikesStr = localStorage.getItem('liked_animals') || '[]';
    try {
      const savedLikes = JSON.parse(savedLikesStr);
      if (Array.isArray(savedLikes)) {
        Promise.resolve().then(() => setAnimals(savedLikes));
      }
    } catch {
      // Handle error
    }
    Promise.resolve().then(() => setLoading(false));
  }, []);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = animals.filter(a => a.id !== id);
    setAnimals(updated);
    localStorage.setItem('liked_animals', JSON.stringify(updated));
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-white relative">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12 md:px-12">
        <h1 className="font-cursive text-5xl md:text-6xl text-text-dark font-bold mb-6 md:mb-10">Vos Coups de Coeur</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {!loading && animals.map(pet => (
            <div key={pet.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-gray-100 relative">
              <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden bg-gray-100">
                <Image src={pet.image} alt={pet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <button 
                  onClick={(e) => removeFavorite(pet.id, e)}
                  title="Retirer"
                  className="absolute top-4 right-4 w-11 h-11 bg-white/80 hover:bg-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 shadow-sm border border-transparent hover:border-gray-100"
                >
                  <HeartCrack className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute bottom-4 left-4 inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[13px] font-bold text-text-dark shadow-sm">
                  <MapPin className="w-4 h-4 mr-1.5 text-secondary-dark" strokeWidth={2.5} />
                  {pet.location}
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
                <h3 className="font-cursive text-[2rem] font-bold text-text-dark leading-none mb-1">{pet.name}</h3>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-2">{pet.description}</p>
                
                <Link href={`/adopt?animalId=${pet.id}&name=${encodeURIComponent(pet.name)}`}>
                  <Button variant="primary" className="w-full text-xl h-[3.2rem] shadow-md transition-all mt-auto bg-primary text-primary-dark hover:bg-primary-dark hover:text-white">
                    L&apos;adopter
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {!loading && animals.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-gray-50 shadow-sm">
              <div className="w-24 h-24 mb-6 relative opacity-20"><Heart className="w-full h-full text-gray-400" /></div>
              <h3 className="font-cursive text-4xl font-bold text-text-dark mb-4">Aucun coup de coeur</h3>
              <p className="text-gray-500 font-medium text-lg max-w-sm mb-6">Retournez sur le matching pour trouver votre compagnon idéal !</p>
              <Link href="/match">
                <Button variant="primary">Trouver un Match</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
