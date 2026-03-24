import Link from "next/link";
import { Search, Bookmark, User, Cat, Dog } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-bg-light/80 backdrop-blur-md border-b border-[#e2e8e0] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex justify-center">
      {/* Container max-w-7xl */}
      <div className="w-full max-w-7xl flex items-center justify-between p-4 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex -mb-1 text-primary-dark group-hover:text-secondary transition-colors">
            <Dog className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            <Cat className="w-8 h-8 md:w-10 md:h-10 -ml-2" strokeWidth={1.5} />
          </div>
          <span className="font-cursive text-3xl font-bold tracking-wide mt-1 text-text-dark">MatchPet</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className="font-bold text-gray-500 hover:text-text-dark transition-colors border-b-2 border-transparent hover:border-primary-dark pb-1 text-[1.1rem]">Accueil</Link>
          <Link href="/search" className="font-bold text-gray-500 hover:text-text-dark transition-colors border-b-2 border-transparent hover:border-primary-dark pb-1 text-[1.1rem]">Recherche</Link>
          <Link href="/match" className="font-bold text-gray-500 hover:text-text-dark transition-colors border-b-2 border-transparent hover:border-primary-dark pb-1 text-[1.1rem]">Matchs</Link>
          <Link href="/favorites" className="font-bold text-gray-500 hover:text-text-dark transition-colors border-b-2 border-transparent hover:border-primary-dark pb-1 text-[1.1rem]">Favoris</Link>
        </nav>

        {/* Mobile/Desktop Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/search" className="md:hidden hover:text-primary-dark transition-colors">
            <Search className="w-7 h-7" strokeWidth={1.5} />
          </Link>
          <Link href="/favorites" className="md:hidden hover:text-primary-dark transition-colors">
            <Bookmark className="w-7 h-7" strokeWidth={1.5} />
          </Link>
          <Link href="/account" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm">
              <User className="w-5 h-5 md:w-6 md:h-6 text-primary-dark" strokeWidth={2} />
            </div>
            <span className="hidden md:block font-bold text-text-dark group-hover:text-primary-dark transition-colors text-lg">
              Profil
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
