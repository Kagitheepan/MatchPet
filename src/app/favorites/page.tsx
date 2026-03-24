import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LATEST_PETS = [
  { id: "1", name: "Max", desc: "Chien noir et blanc de 7,5 ans", image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500" },
  { id: "2", name: "Pirou", desc: "Perruche bleu bavarde, câlin", image: "https://images.unsplash.com/photo-1542385151-efd0f074d3ea?w=500" },
  { id: "3", name: "Noisette", desc: "Lapin blanc et marron de 2 ans", image: "https://images.unsplash.com/photo-1585110396000-c9faf4e48023?w=500" }
];

const ARTICLES = [
  { id: "1", name: "Régime", desc: "Un autre compagnon contre l'obésité", image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500", category: "Nutrition" },
  { id: "2", name: "Sorties", desc: "Des promenades sont organisées le 17.", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500", category: "Événements" },
  { id: "3", name: "Santé", desc: "Les vaccins obligatoires", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500", category: "Santé" }
];

export default function Favorites() {
  return (
    <div className="w-full flex-1 flex flex-col bg-bg-light">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12 md:px-12">
        <h1 className="font-cursive text-5xl md:text-6xl text-text-dark font-bold mb-6 md:mb-10">Favoris</h1>

        {/* Section Animaux (Grille sur Desktop, Scroll horizontal sur Mobile) */}
        <section className="mb-10 md:mb-16">
          <div className="flex justify-between items-end mb-4 md:mb-8">
            <h2 className="font-bold text-gray-600 uppercase tracking-widest text-xs md:text-sm">Derniers arrivés</h2>
            <button className="text-primary-dark font-bold text-sm hover:underline">Voir tout</button>
          </div>

          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible no-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0">
            {LATEST_PETS.map(pet => (
              <div key={pet.id} className="min-w-[200px] md:min-w-0 md:w-full bg-white rounded-3xl p-3 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative w-full aspect-square rounded-[1.5rem] bg-gray-100 overflow-hidden mb-4">
                  <Image src={pet.image} alt={pet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-400 fill-current" />
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2 px-1">
                  <span className="font-cursive text-[2rem] md:text-3xl font-bold leading-none text-text-dark">{pet.name}</span>
                  {/* Original data does not have 'age' field, using 'desc' as a general description */}
                  {/* <span className="text-[11px] font-bold text-gray-400 px-2 py-1 bg-bg-light rounded">{pet.age}</span> */}
                </div>
                {/* Original data does not have 'breed' field, using 'desc' */}
                <p className="text-[13px] md:text-[14px] text-primary-dark font-bold px-1 mb-1">{pet.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Articles (Grille sur Desktop, Scroll horizontal sur Mobile) */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-4 md:mb-8">
            <h2 className="font-bold text-gray-600 uppercase tracking-widest text-xs md:text-sm">Nos articles</h2>
            <button className="text-primary-dark font-bold text-sm hover:underline">Tous les articles</button>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible no-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0">
            {ARTICLES.map(article => (
              <div key={article.id} className="min-w-[260px] md:min-w-0 md:w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative w-full h-[150px] md:h-[220px] bg-gray-100 overflow-hidden">
                  <Image src={article.image} alt={article.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {article.category && (
                    <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-secondary text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-text-dark leading-snug mb-2 md:text-lg group-hover:text-primary-dark transition-colors">{article.name}</h3>
                  <p className="text-[13px] md:text-sm text-gray-500 font-medium leading-relaxed flex-1 line-clamp-2 md:line-clamp-3 mb-6">
                    {article.desc}
                  </p>
                  
                  <Button variant="outline" className="w-full text-sm h-11 border-gray-200">
                    En savoir +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
