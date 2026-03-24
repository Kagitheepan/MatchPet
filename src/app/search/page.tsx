"use client";

import { useState } from "react";
import Image from "next/image";
import { Search as SearchIcon, MapPin, Heart, Filter, ChevronDown } from "lucide-react";
import DesktopScene from "@/components/3d/DesktopScene";
import { Button } from "@/components/ui/Button";

// Dummy data
const INVENTORY = [
  { id: "1", type: "chat", name: "Neige", breed: "Européen", age: "3 ans", desc: "Douce, câline, castrée. Un vrai amour au quotidien.", location: "Montereau (5 km)", image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500" },
  { id: "2", type: "chien", name: "Max", breed: "Border Collie", age: "7.5 ans", desc: "Joueur, affectueux. Parfait pour de grandes balades.", location: "Melun (12 km)", image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500" },
  { id: "3", type: "oiseau", name: "Pirou", breed: "Perruche ondulée", age: "1 an", desc: "Bavarde, curieuse de tout ce qui se passe.", location: "Fontainebleau (20 km)", image: "https://images.unsplash.com/photo-1542385151-efd0f074d3ea?w=500" },
  { id: "4", type: "lapin", name: "Noisette", breed: "Lapin Nain Bélier", age: "2 ans", desc: "Très calme et propre. Habitué à la vie d'intérieur.", location: "Nemours (25 km)", image: "https://images.unsplash.com/photo-1585110396000-c9faf4e48023?w=500" },
  { id: "5", type: "chat", name: "Simba", breed: "Main Coon", age: "4 ans", desc: "Indépendant mais majestueux. Câlin à ses heures.", location: "Sens (40 km)", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" },
  { id: "6", type: "chien", name: "Louna", breed: "Golden Retriever", age: "6 mois", desc: "Pleine d'énergie, demande beaucoup de temps pour l'éducation.", location: "Montereau (2 km)", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");

  const filtered = INVENTORY.filter(pet => {
    if (activeType !== "all" && pet.type !== activeType) return false;
    if (searchQuery && !pet.name.toLowerCase().includes(searchQuery.toLowerCase()) && !pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12 flex flex-col md:flex-row gap-8 items-start relative z-10">
      
      {/* Mobile Search & Filters Top Bar */}
      <div className="md:hidden w-full flex flex-col gap-4 sticky top-0 bg-bg-light/95 backdrop-blur-md pt-2 pb-4 z-20">
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

      {/* Main Grid content */}
      <div className="flex-1 w-full flex flex-col pb-10 min-w-0">
        <div className="hidden md:flex justify-between items-end mb-8 pl-2">
          <div>
            <h1 className="font-cursive text-[4rem] text-primary-dark font-bold tracking-tight leading-none">Explorer</h1>
            <p className="text-gray-500 mt-2 font-semibold text-lg">{filtered.length} compagnon{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
          </div>
          <button className="flex items-center gap-2 text-[15px] font-bold text-gray-500 hover:text-text-dark bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md">
            Trier par: Pertinence
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {filtered.map(pet => (
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

          {filtered.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-gray-50 shadow-sm">
              <div className="w-24 h-24 mb-6 relative opacity-20"><SearchIcon className="w-full h-full text-gray-400" /></div>
              <h3 className="font-cursive text-4xl font-bold text-text-dark mb-4">Aucun animal trouvé</h3>
              <p className="text-gray-500 font-medium text-lg max-w-sm">Essayez de modifier vos filtres d'espèce ou la distance de recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
