import Link from "next/link";
import { Instagram, Facebook, Music2, Cat, Dog, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-footer text-gray-100 flex flex-col items-center pt-10 pb-6 mt-auto rounded-t-[2.5rem] md:rounded-t-none z-10">
      <div className="w-full max-w-7xl px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 mb-8 mt-2">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-secondary">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex -mb-1 text-white">
              <Dog className="w-10 h-10" strokeWidth={1.5} />
              <Cat className="w-10 h-10 -ml-2" strokeWidth={1.5} />
            </div>
            <span className="font-cursive text-3xl font-bold tracking-wide text-white mt-1">MatchPet</span>
          </Link>
          <p className="text-gray-300 text-sm xl:text-base text-center md:text-left leading-relaxed font-medium">
            Trouvez votre compagnon idéal près de chez vous. Adoptez, rencontrez et partagez des moments uniques.
          </p>
        </div>

        {/* Links */}
        <div className="col-span-1 flex flex-col items-center md:items-start">
          <h3 className="font-cursive text-2xl text-[#f4c4c4] mb-3 md:mb-5">Explorer</h3>
          <Link href="/search" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Les Annonces</Link>
          <Link href="/match" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Le Matching</Link>
          <Link href="/favorites" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Nos Articles</Link>
        </div>

        {/* Legal */}
        <div className="col-span-1 flex flex-col items-center md:items-start">
          <h3 className="font-cursive text-2xl text-[#f4c4c4] mb-3 md:mb-5">Informations</h3>
          <Link href="#" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Mentions légales</Link>
          <Link href="#" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Confidentialité</Link>
          <Link href="#" className="text-gray-300 font-medium hover:text-white transition-colors mb-2 text-sm xl:text-base">Contact</Link>
        </div>
        
        {/* Social */}
        <div className="col-span-1 flex flex-col items-center md:items-end">
          <span className="font-cursive text-[2rem] leading-none mb-3 italic text-white md:pr-1">Rejoint-nous !</span>
          <div className="flex gap-4 md:pr-0">
            <a href="#" className="w-12 h-12 rounded-full bg-[#f4a198] flex items-center justify-center hover:scale-110 shadow-lg transition-transform">
              <Instagram className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-[#f4a198] flex items-center justify-center hover:scale-110 shadow-lg transition-transform">
              <Music2 className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-[#f4a198] flex items-center justify-center hover:scale-110 shadow-lg transition-transform">
              <Facebook className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="w-full max-w-7xl px-8 md:px-12 border-t border-gray-600/50 pt-6 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400 font-medium">
        <p>© 2026 MatchPet. Tous droits réservés.</p>
        <p className="flex items-center gap-1.5 mt-2 md:mt-0">
          Fait avec <Heart className="w-4 h-4 text-[#f0a3a3] fill-current" /> par la communauté
        </p>
      </div>
    </footer>
  );
}
