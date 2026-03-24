"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DesktopScene from "@/components/3d/DesktopScene";

// Dummy data for matches
const MATCHES = [
  {
    id: "1",
    name: "Neige",
    description: "Chatte blanche de 3 ans, douce, câline, castrée",
    location: "Montereau",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=800&auto=format&fit=crop",
    distance: "5 km",
  },
  {
    id: "2",
    name: "Max",
    description: "Chien noir et blanc de 7,5 ans, joueur, affectueux",
    location: "Melun",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=800&auto=format&fit=crop",
    distance: "12 km",
  }
];

export default function MatchPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    // A small delay for the animation to play before updating state
    setTimeout(() => {
      if (currentIndex < MATCHES.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        router.push("/match/empty");
      }
    }, 150);
  };

  const currentProfile = MATCHES[currentIndex];

  if (!currentProfile) {
    return null; // Will redirect anyway
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center bg-gray-50 md:bg-[#f6f7f5] relative overflow-hidden md:justify-center py-0 md:py-12 px-0 md:px-8">
      {/* Decorative desktop 3D background */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-40">
        <DesktopScene model="rabbit" />
      </div>

      <div className="w-full h-full max-w-[440px] md:max-w-md flex flex-col relative z-10 md:bg-white md:rounded-[3rem] md:shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:border md:border-gray-50 md:h-[800px] md:max-h-[85vh]">
        {/* Header text */}
        <div className="w-full px-6 pt-6 md:pt-8 pb-2 relative z-10 flex justify-between items-end">
          <div>
            <h1 className="font-cursive text-[2.5rem] md:text-5xl font-bold text-text-dark leading-none">Votre Match</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base mt-1">Compatibilité à 95%</p>
          </div>
        </div>

        <div className="flex-1 w-full relative flex items-center justify-center mt-4 mb-4 md:px-6">
          <AnimatePresence mode="popLayout">
            {MATCHES.slice(currentIndex, currentIndex + 1).map((profile) => (
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
                {/* Image */}
                <div className="relative w-full h-[65%] md:h-[60%] overflow-hidden">
                  <Image 
                    src={profile.image} 
                    alt={profile.name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  {/* Distance badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary-dark mr-1" />
                    <span className="text-[12px] font-bold text-text-dark">{profile.distance}</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-6 h-[40%] flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-cursive text-4xl text-text-dark font-bold leading-none">{profile.name}</h2>
                  </div>

                  <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 md:line-clamp-3 mt-auto">
                    {profile.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
      </div>
    </div>
  );
}
