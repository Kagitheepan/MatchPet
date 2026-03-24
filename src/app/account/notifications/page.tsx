"use client";

import { useState } from "react";
import { ArrowLeft, BellRing } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NOTIFICATION_PREFERENCES = [
  { id: "new-matches", title: "Nouveaux matchs", desc: "Soyez alerté quand un animal correspond à vos critères." },
  { id: "messages", title: "Messages", desc: "Recevez une alerte lors d'un message d'un refuge." },
  { id: "news", title: "Actualités & Modèles", desc: "Informations globales sur l'application." },
];

export default function NotificationsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "new-matches": true,
    "messages": true,
    "news": false,
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-bg-light">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16">
        
        {/* Header / Sidebar info on Desktop */}
        <div className="md:w-1/3 flex flex-col">
          <Link href="/account" className="flex items-center text-primary-dark font-bold mb-6 hover:underline w-max">
            <ArrowLeft className="w-5 h-5 mr-1" /> Retour
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BellRing className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            </div>
            <h1 className="font-cursive text-4xl md:text-5xl font-bold text-text-dark leading-none">Notifications</h1>
          </div>
          <p className="text-gray-500 font-medium md:text-lg mb-8 max-w-sm">
            Gérez la manière dont nous communiquons avec vous.
          </p>
        </div>

        {/* Settings List */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden flex flex-col">
            {NOTIFICATION_PREFERENCES.map((pref, i) => (
              <div key={pref.id} className={cn("p-5 md:p-8 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors", i !== NOTIFICATION_PREFERENCES.length - 1 && "border-b border-gray-100")}>
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-text-dark md:text-xl mb-1">{pref.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed">{pref.desc}</p>
                </div>
                
                {/* Custom Toggle */}
                <button 
                  onClick={() => setToggles(p => ({ ...p, [pref.id]: !p[pref.id] }))}
                  className={cn(
                    "relative w-12 md:w-14 h-7 md:h-8 rounded-full transition-colors flex-shrink-0 border-2",
                    toggles[pref.id] ? "bg-primary-dark border-primary-dark" : "bg-gray-200 border-gray-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 md:top-0.5 bottom-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white shadow-sm transition-transform duration-300",
                    toggles[pref.id] ? "translate-x-[20px] md:translate-x-[24px]" : "translate-x-0.5"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
