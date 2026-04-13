"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MapPin, Heart, Cat } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MatchPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [likedAnimals, setLikedAnimals] = useState<any[]>([]);

  useEffect(() => {
    // Load liked animals initially
    const savedLikes = JSON.parse(localStorage.getItem('liked_animals') || '[]');
    setLikedAnimals(savedLikes);

    const loggedUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    setIsUserConnected(!!loggedUser);

    const fetchMatches = async () => {
      let hasChildren = false;
      let hasOtherPets = false;
      let hasGarden = false;
      let desiredSpecies: string[] = [];
      let desiredAge: string[] = [];

      const answersStr = localStorage.getItem("matchpet_answers");
      if (answersStr) {
        try {
          const parsed = JSON.parse(answersStr);
          hasChildren = parsed.hasChildren !== "no" && parsed.hasChildren !== undefined;
          hasOtherPets = parsed.hasAnimals !== "no" && parsed.hasAnimals !== undefined;
          hasGarden = parsed.hasGarden === "yes";
          if (Array.isArray(parsed.desiredAnimal)) {
            desiredSpecies = parsed.desiredAnimal;
          }
          if (Array.isArray(parsed.desiredAge)) {
            desiredAge = parsed.desiredAge;
          }
        } catch (e) {}
      }

      try {
        const speciesParam = desiredSpecies.length > 0 ? `&species=${desiredSpecies.join(',')}` : '';
        const ageParam = desiredAge.length > 0 ? `&age=${desiredAge.join(',')}` : '';
        const response = await fetch(`/api/match?hasChildren=${hasChildren}&hasOtherPets=${hasOtherPets}&hasGarden=${hasGarden}${speciesParam}${ageParam}`);
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

    // Toujours récupérer les matchs
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



  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-white relative overflow-hidden py-4 md:py-8 px-4 md:px-8">

      {(!loading && !error && (animals.length === 0 || !currentProfile)) ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 h-full w-full max-w-sm mt-auto mb-auto">
          <Image 
            src="/img_nomatch.png" 
            alt="Pas de match" 
            width={400}
            height={400}
            priority
            className="object-contain mix-blend-darken mb-6" 
          />
          <h2 className="font-cursive text-4xl font-bold text-text-dark mb-4">Pas de matchs</h2>
          <p className="text-gray-500 font-medium leading-relaxed">
            {animals.length === 0 
              ? "Désolé, aucun animal ne correspond à vos critères pour le moment."
              : "Vous avez vu tous les profils ! Revenez plus tard."}
          </p>
        </div>
      ) : (
      <div className="w-full max-w-[400px] flex flex-col items-center relative z-10">
        
        {/* Title */}
        <h1 className="font-cursive text-4xl md:text-5xl font-bold text-[#E2725B] mb-4 self-center pl-2">Vos Match</h1>

        {/* Card */}
        <div className="w-full relative">
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
                className="w-full bg-white rounded-[2rem] shadow-[0_4px_25px_rgba(0,0,0,0.08)] overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100"
              >
                <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden rounded-t-[2rem]">
                  <Image 
                    src={profile.image} 
                    alt={profile.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="px-7 py-5 flex flex-col bg-white">
                  <h2 className="font-cursive text-4xl text-text-dark font-bold mb-1">{profile.name}</h2>
                  <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-2 line-clamp-1">
                    {profile.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 mb-5">
                    <MapPin className="w-5 h-5" strokeWidth={2} />
                    <span className="text-[15px] font-medium">{profile.location}</span>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleSwipe("left")}
                      className="w-14 h-14 rounded-full bg-[#E2725B] shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                    >
                      <X className="w-7 h-7 text-white" strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => handleSwipe("right")}
                      className="w-14 h-14 rounded-full bg-[#bad2b6] shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                    >
                      <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )))}</AnimatePresence>
        </div>

      </div>
      )}
    </div>
  );
}
