"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search as SearchIcon, MapPin, Heart, ChevronDown, Loader2 } from "lucide-react";
import DesktopScene from "@/components/3d/DesktopScene";
import { Button } from "@/components/ui/Button";

interface Pet {
  id: string;
  type: string;
  name: string;
  breed: string;
  age: string;
  desc: string;
  location: string;
  image: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('/api/search');
        if (!response.ok) throw new Error("Failed to fetch animals");
        const data = await response.json();
        
        interface AnimalData {
          id: number | string;
          name: string;
          species: string;
          breed?: string;
          age?: string;
          description?: string;
          photos?: string[];
          refuge?: { city?: string };
        }
        
        const mappedData = data.map((animal: AnimalData) => {
          let type = "autre";
          const speciesLower = animal.species?.toLowerCase() || '';
          
          if (speciesLower.includes("dog") || speciesLower.includes("chien")) type = "chien";
          else if (speciesLower.includes("cat") || speciesLower.includes("chat")) type = "chat";
          else if (speciesLower.includes("bird") || speciesLower.includes("oiseau")) type = "oiseau";
          else if (speciesLower.includes("rabbit") || speciesLower.includes("lapin") || speciesLower.includes("small")) type = "lapin";

          return {
            id: animal.id.toString(),
            type,
            name: animal.name,
            breed: animal.breed || animal.species,
            age: animal.age || "?",
            desc: animal.description || "Aucune description disponible.",
            location: animal.refuge?.city || "Refuge",
            image: (Array.isArray(animal.photos) && animal.photos.length > 0) 
              ? animal.photos[0] 
              : "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500"
          };
        });
        setAnimals(mappedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  const filtered = animals.filter(pet => {
    if (activeType !== "all" && pet.type !== activeType) return false;
    if (searchQuery && !pet.name.toLowerCase().includes(searchQuery.toLowerCase()) && !pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12 flex flex-col md:flex-row gap-8 items-start relative z-10">
      
      {/* Mobile Search & Filters Top Bar */}
      <div className="md:hidden w-full flex flex-col gap-4 sticky top-0 bg-white/95 backdrop-blur-md pt-2 pb-4 z-20">
        <h1 className="font-cursive text-4xl text-text-dark font-bold">Explorer</h1>
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, race..." 
            className="w-full h-14 pl-12 pr-4 rounded-full bg-white border border-gray-200 outline-none focus:border-primary-dark shadow-sm text-[15px] font-medium transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {["all", "chien", "chat", "lapin", "oiseau"].map(type => (
            <button 
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all border shrink-0 ${activeType === type ? 'bg-secondary text-white border-secondary-dark shadow-md scale-95' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
              {type === "all" ? "Tous" : type + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Filters Sidebar */}
      <aside className="hidden md:flex w-72 shrink-0 flex-col gap-8 sticky top-28 bg-white rounded-[2rem] p-6 pt-8 border border-[#e2e8e0] shadow-[0_4px_30px_rgba(0,0,0,0.03)] z-10">
        <div>
          <h2 className="font-cursive text-4xl font-bold text-text-dark mb-6">Filtres</h2>
          <div className="relative w-full mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher un nom..." 
              className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-50 border border-gray-200 outline-none focus:border-primary-dark focus:bg-white transition-all text-[15px] font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Espèce</h3>
          <div className="flex flex-col gap-3">
            {["all", "chien", "chat", "lapin", "oiseau"].map(type => (
              <label key={type} className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${activeType === type ? 'border-primary-dark' : 'border-gray-300 group-hover:border-primary-dark'}`}>
                  {activeType === type && <div className="w-2.5 h-2.5 bg-primary-dark rounded-full" />}
                </div>
                <input type="radio" name="species" className="hidden" onChange={() => setActiveType(type)} />
                <span className={`text-[15px] font-semibold capitalize transition-colors ${activeType === type ? 'text-text-dark' : 'text-gray-500 group-hover:text-text-dark'}`}>
                  {type === "all" ? "Tous les animaux" : type + "s"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Distance Max (km)</h3>
          <input type="range" className="w-full accent-primary-dark cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none" min="5" max="100" defaultValue="50" />
          <div className="flex justify-between text-[13px] text-gray-400 font-bold mt-3">
            <span>5 km</span>
            <span>100+ km</span>
          </div>
        </div>

        {/* 3D Cat Decorative Element */}
        <div className="w-full h-80 relative rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 mt-6">
          <DesktopScene model="cat" />
        </div>
      </aside>

        <div className="flex-1 w-full flex flex-col pb-10 min-w-0">
        <div className="hidden md:flex justify-between items-end mb-8 pl-2">
          <div>
            <h1 className="font-cursive text-[4rem] text-primary-dark font-bold tracking-tight leading-none">Explorer</h1>
            {loading ? (
              <p className="text-gray-500 mt-2 font-semibold text-lg flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Chargement des animaux...</p>
            ) : (
              <p className="text-gray-500 mt-2 font-semibold text-lg">{filtered.length} compagnon{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
            )}
          </div>
          <button className="flex items-center gap-2 text-[15px] font-bold text-gray-500 hover:text-text-dark bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md">
            Trier par: Pertinence
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {loading && (
            <div className="col-span-full py-20 flex justify-center items-center">
              <Loader2 className="w-12 h-12 text-primary-dark animate-spin" />
            </div>
          )}
          {!loading && filtered.map(pet => (
            <div key={pet.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-gray-100 cursor-pointer md:hover:-translate-y-1">
              <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden bg-gray-100">
                <Image src={pet.image} alt={pet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-4 right-4 w-11 h-11 bg-black/20 hover:bg-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 hover:shadow-sm">
                  <Heart className="w-5 h-5 text-white hover:text-red-400 group-hover:fill-current" />
                </button>
                <div className="absolute bottom-4 left-4 inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[13px] font-bold text-text-dark shadow-sm">
                  <MapPin className="w-4 h-4 mr-1.5 text-secondary-dark" strokeWidth={2.5} />
                  {pet.location}
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-cursive text-[2rem] font-bold text-text-dark leading-none">{pet.name}</h3>
                  <span className="text-[12px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md tracking-wide">{pet.age}</span>
                </div>
                <p className="text-[14px] text-primary-dark font-extrabold mb-3">{pet.breed}</p>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-2">{pet.desc}</p>
                <Button variant="primary" className="w-full text-xl h-[3.2rem] shadow-md group-hover:shadow-lg transition-all mt-auto bg-secondary text-white hover:bg-secondary-dark">
                  Le découvrir
                </Button>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-gray-50 shadow-sm">
              <div className="w-24 h-24 mb-6 relative opacity-20"><SearchIcon className="w-full h-full text-gray-400" /></div>
              <h3 className="font-cursive text-4xl font-bold text-text-dark mb-4">Aucun animal trouvé</h3>
              <p className="text-gray-500 font-medium text-lg max-w-sm">Essayez de modifier vos filtres d&apos;espèce ou la distance de recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
