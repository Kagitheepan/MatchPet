"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, Users, MessageCircle } from "lucide-react";

interface UserData {
  email?: string;
  firstName?: string;
}

export default function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    Promise.resolve().then(() => setUser(loggedUser));

    // Listen for storage changes in case of login/logout in the same tab
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem('current_user') || 'null'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [pathname]); // Refresh on navigation just in case

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openChatModal'));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#3B3B3A] border-t border-gray-200 z-50 flex justify-around items-center h-16 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {/* Accueil */}
      <Link href="/" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/" ? "text-[#B9DCA9]" : "text-[#F4B9B3]"}`}>
        <Home className="w-6 h-6" strokeWidth={pathname === "/" ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Accueil</span>
      </Link>

      {/* Recherche */}
      <Link href="/search" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/search" ? "text-[#B9DCA9]" : "text-[#F4B9B3]"}`}>
        <Search className="w-6 h-6" strokeWidth={pathname === "/search" ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Recherche</span>
      </Link>

      {/* Conversation */}
      <button onClick={handleOpenChat} className="flex flex-col items-center justify-center gap-1 text-[#F4B9B3] transition-colors hover:text-[#B9DCA9]">
        <MessageCircle className="w-6 h-6" strokeWidth={2} />
        <span className="text-[10px] font-bold">Messages</span>
      </button>

      {/* Favoris */}
      <Link href="/favorites" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/favorites" ? "text-[#B9DCA9]" : "text-[#F4B9B3]"}`}>
        <Heart className="w-6 h-6" strokeWidth={pathname === "/favorites" ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Favoris</span>
      </Link>

      {/* Profil / Connexion */}
      <Link href="/profile" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/profile" ? "text-[#B9DCA9]" : "text-[#F4B9B3]"}`}>
        <User className="w-6 h-6" strokeWidth={pathname === "/profile" ? 2.5 : 2} />
        <span className="text-[10px] font-bold">{user ? "Profil" : "Connexion"}</span>
      </Link>

      {/* Association / Refuge */}
      <Link href="/associations" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/associations" ? "text-[#B9DCA9]" : "text-[#F4B9B3]"}`}>
        <Users className="w-6 h-6" strokeWidth={pathname === "/associations" ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Refuge</span>
      </Link>
    </nav>
  );
}
