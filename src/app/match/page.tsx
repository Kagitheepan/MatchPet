"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DesktopScene from "@/components/3d/DesktopScene";

export default function MatchPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // States for Liked Matches
  const [showLikes, setShowLikes] = useState(false);
  const [likedAnimals, setLikedAnimals] = useState<any[]>([]);

  useEffect(() => {
    // Load liked animals initially
    const savedLikes = JSON.parse(localStorage.getItem('liked_animals') || '[]');
    setLikedAnimals(savedLikes);

    const fetchMatches = async () => {
      let hasChildren = false;
      let hasOtherPets = false;
      let hasGarden = false;

      const answersStr = localStorage.getItem("matchpet_answers");
      if (answersStr) {
        try {
          const parsed = JSON.parse(answersStr);
          hasChildren = parsed.hasChildren !== "no" && parsed.hasChildren !== undefined;
          hasOtherPets = parsed.hasAnimals !== "no" && parsed.hasAnimals !== undefined;
          hasGarden = parsed.hasGarden === "yes";
        } catch (e) {}
      }

      try {
        const response = await fetch(`/api/match?hasChildren=${hasChildren}&hasOtherPets=${hasOtherPets}&hasGarden=${hasGarden}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des matchs");
        
        const data = await response.json();
        
        const mappedData = data.map((animal: any) => ({
          id: animal.id.toString(),
          name: animal.name,
          species: animal.species || 'Unknown',
          description: animal.description || "Aucune description disponible.",
          location: animal.refuge?.city || "Refuge",
          image: (Array.isArray(animal.photos) && animal.photos.length > 0) 
            ? animal.photos[0] 
            : "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=800&auto=format&fit=crop",
          distance: "Proche de vous",
        }));

        setAnimals(mappedData);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les animaux. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [router]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentProfile = animals[currentIndex];
    if (!currentProfile) return;

    if (direction === 'right') {
      const updatedLikes = [...likedAnimals];
      if (!updatedLikes.find(a => a.id === currentProfile.id)) {
        updatedLikes.push(currentProfile);
      }
      setLikedAnimals(updatedLikes);
      localStorage.setItem('liked_animals', JSON.stringify(updatedLikes));
    }

    setTimeout(() => {
      if (currentIndex < animals.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        router.push("/match/empty");
      }
    }, 150);
  };

  const currentProfile = animals[currentIndex];

  const speciesLabel = currentProfile?.species?.toLowerCase() || '';
  let modelName: "rabbit" | "dog" | "cat" | "all" = "rabbit";
  if (speciesLabel.includes("dog")) modelName = "dog";
  else if (speciesLabel.includes("cat")) modelName = "cat";

  return (
    <div className="w-full flex-1 flex flex-col items-center bg-gray-50 md:bg-[#f6f7f5] relative overflow-hidden md:justify-center py-0 md:py-12 px-0 md:px-8">
      <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-40">
        <DesktopScene model={modelName} />
      </div>

      <div className="w-full h-full max-w-[440px] md:max-w-md flex flex-col relative z-10 md:bg-white md:rounded-[3rem] md:shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:border md:border-gray-50 md:h-[800px] md:max-h-[85vh] overflow-hidden">
        
        {/* Header text */}
        <div className="w-full px-6 pt-6 md:pt-8 pb-2 relative z-10 flex justify-between items-end">
          <div>
            <h1 className="font-cursive text-[2.5rem] md:text-5xl font-bold text-text-dark leading-none">Votre Match</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base mt-1">Compatibilité à 95%</p>
          </div>
          <button 
            onClick={() => setShowLikes(true)}
            className="flex items-center justify-center p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors shadow-sm"
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </button>
        </div>

        <div className="flex-1 w-full relative flex items-center justify-center mt-4 mb-4 md:px-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
               <div className="flex flex-col items-center justify-center p-12">
                 <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                 <p className="text-gray-500 font-medium">Recherche de vos matchs...</p>
               </div>
            ) : error ? (
               <div className="text-center p-8">
                 <p className="text-red-500 font-semibold mb-4">{error}</p>
                 <button onClick={() => window.location.reload()} className="text-primary-dark font-bold underline">Réessayer</button>
               </div>
            ) : animals.length === 0 || !currentProfile ? (
               <div className="text-center p-8">
                 <p className="text-gray-500 font-medium">Désolé, aucun animal ne correspond à votre profil pour le moment.</p>
               </div>
            ) : (
              animals.slice(currentIndex, currentIndex + 1).map((profile) => (
              <motion.div
                key={profile.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => handleSwipe(info.offset.x > 0 ? "right" : "left")}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute w-[calc(100%-2.5rem)] md:w-full h-[calc(100%-1rem)] bg-white rounded-[2rem] shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100"
              >
                <div className="relative w-full h-[65%] md:h-[60%] overflow-hidden">
                  <Image 
                    src={profile.image} 
                    alt={profile.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary-dark mr-1" />
                    <span className="text-[12px] font-bold text-text-dark">{profile.distance}</span>
                  </div>
                </div>

                <div className="p-6 h-[40%] flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-cursive text-4xl text-text-dark font-bold leading-none">{profile.name}</h2>
                  </div>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 md:line-clamp-3 mt-auto">
                    {profile.description}
                  </p>
                </div>
              </motion.div>
            )))}
          </AnimatePresence>
        </div>

        {/* Actions Bottom */}
        <div className="w-full px-8 pb-8 md:pb-10 pt-2 flex justify-center gap-6 relative z-10 md:px-12">
          <button 
            onClick={() => handleSwipe("left")}
            className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-white shadow-[0_5px_20px_rgba(0,0,0,0.05)] hover:shadow-md hover:bg-red-50 hover:scale-105 border border-gray-100 flex items-center justify-center transition-all group"
          >
            <X className="w-8 h-8 md:w-9 md:h-9 text-gray-400 group-hover:text-red-400 transition-colors" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={() => handleSwipe("right")}
            className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-primary shadow-[0_5px_20px_rgba(210,228,200,0.4)] hover:shadow-lg hover:bg-primary-dark hover:scale-105 flex items-center justify-center transition-all group"
          >
            <Check className="w-8 h-8 md:w-9 md:h-9 text-primary-dark group-hover:text-white transition-colors" strokeWidth={3} />
          </button>
        </div>

        {/* Liked List Overlay */}
        <AnimatePresence>
          {showLikes && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white z-50 flex flex-col items-center"
            >
              <div className="w-full p-6 flex justify-between items-center shadow-sm border-b border-gray-100">
                <h2 className="font-cursive text-3xl font-bold text-text-dark">Mes Coups de Coeur</h2>
                <button onClick={() => setShowLikes(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-7 h-7 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto w-full p-4 space-y-4 bg-gray-50">
                {likedAnimals.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">Vous n'avez pas encore liké d'animaux.</p>
                ) : (
                  likedAnimals.map(animal => (
                    <div key={animal.id} className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 items-center">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={animal.image} alt={animal.name} fill sizes="96px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-text-dark">{animal.name}</h3>
                        <p className="text-gray-500 text-sm font-medium">{animal.location}</p>
                        <button className="mt-2 text-sm text-primary-dark font-bold underline">Contacter le refuge</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
