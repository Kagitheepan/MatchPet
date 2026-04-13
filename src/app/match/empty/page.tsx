import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function EmptyMatchPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-6 pb-6 relative bg-bg-light">
      <div className="w-full flex justify-start mb-6">
        <Link href="/" className="flex items-center text-text-dark font-medium italic text-sm hover:text-primary-dark transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Revenir à l'accueil
        </Link>
      </div>

      <h1 className="font-cursive text-[2.5rem] text-text-dark mb-12 font-bold tracking-wide mt-4">Ohh plus de match !</h1>
      
      <div className="w-full flex justify-center mb-16 relative">
        <div className="absolute inset-x-8 top-12 bottom-0 bg-[#f4a198]/30 rounded-[3rem] -z-10 rotate-6 transform scale-105"></div>
        <div className="bg-white p-4">
          <Image 
            src="/img_nomatch.png" 
            alt="Pas de match" 
            width={256} 
            height={256}
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center px-4 max-w-sm mt-auto mb-16">
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
          Il semble que vous avez épuisé tout les matchs disponible avec vos critères.
        </p>
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
          De nouvelles annonces sont régulièrement postés.<br />
          Revenez plus tard!
        </p>
      </div>
    </div>
  );
}
