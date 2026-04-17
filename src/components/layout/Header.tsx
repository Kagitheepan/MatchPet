"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowLeft, Send, X, User } from "lucide-react";

interface Adoption {
  id: number;
  name: string;
  image?: string;
  status: string;
  hasUnread: boolean;
  userName: string;
}

interface Message {
  id: number;
  content: string;
  senderType: string;
  createdAt: string;
}

interface UserData {
  email?: string;
  firstName?: string;
}

interface RefugeData {
  id: number;
}

interface RawAdoption {
  id: number;
  animalName?: string;
  name?: string;
  animalImage?: string;
  image?: string;
  status: string;
  hasUnreadRefuge?: boolean;
  hasUnread?: boolean;
  user?: {
    name?: string;
    email?: string;
  };
}

export default function Header() {
  const pathname = usePathname();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [showChatList, setShowChatList] = useState(false);
  const [activeAdoption, setActiveAdoption] = useState<Adoption | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [refuge, setRefuge] = useState<RefugeData | null>(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    const loggedRefuge = JSON.parse(localStorage.getItem('matchpet_refuge') || 'null');
    Promise.resolve().then(() => {
      setUser(loggedUser);
      setRefuge(loggedRefuge);
    });
    
    const fetchAdoptions = async () => {
      try {
        let url = "";
        if (loggedRefuge?.id) {
          url = `/api/admin/adoptions?refugeId=${loggedRefuge.id}`;
        } else if (loggedUser?.email) {
          url = `/api/adoptions?email=${encodeURIComponent(loggedUser.email)}`;
        }

        if (!url) return;

        const res = await fetch(url);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Normaliser les données car les APIs admin et user renvoient des formats légèrement différents
          const normalized = data.map((a: RawAdoption) => ({
            id: a.id,
            name: a.animalName || a.name || "Animal",
            image: a.animalImage || a.image,
            status: a.status,
            hasUnread: loggedRefuge ? !!a.hasUnreadRefuge : !!a.hasUnread,
            userName: a.user?.name || a.user?.email || "Adoptant"
          }));
          setAdoptions(normalized);
        }
      } catch {
        // Error handling
      }
    };

    fetchAdoptions();
    const interval = setInterval(fetchAdoptions, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenChatModal = () => setShowChatList(true);
    window.addEventListener('openChatModal', handleOpenChatModal);
    return () => window.removeEventListener('openChatModal', handleOpenChatModal);
  }, []);

  useEffect(() => {
    if (activeAdoption) {
      const fetchMessages = async () => {
        try {
          const type = refuge ? 'refuge' : 'user';
          const res = await fetch(`/api/messages?adoptionId=${activeAdoption.id}&viewerType=${type}`);
          const data = await res.json();
          if (Array.isArray(data)) setMessages(data);
        } catch {
          // Error handling
        }
      };
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [activeAdoption, refuge]);

  const totalUnread = adoptions.filter(a => a.hasUnread).length;

  const openChat = async (adoption: Adoption) => {
    setActiveAdoption(adoption);
    setLoadingMessages(true);
    try {
      const type = refuge ? 'refuge' : 'user';
      const res = await fetch(`/api/messages?adoptionId=${adoption.id}&viewerType=${type}`);
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
      // Update local state to clear unread
      setAdoptions(prev => prev.map(a => a.id === adoption.id ? { ...a, hasUnread: false } : a));
    } catch {
      // Error handling
    }
    setLoadingMessages(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !activeAdoption || (!user && !refuge)) return;
    try {
      const senderType = refuge ? 'refuge' : 'user';
      const senderId = refuge ? refuge.id : 0;

      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adoptionId: activeAdoption.id,
          senderType,
          senderId,
          content: chatInput.trim(),
        }),
      });
      setChatInput('');
      const res = await fetch(`/api/messages?adoptionId=${activeAdoption.id}&viewerType=${senderType}`);
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch {
      // Error handling
    }
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/search', label: 'Recherche' },
    { href: '/match', label: 'Matchs' },
    { href: '/favorites', label: 'Mes Favoris' },
    { href: '/adoptions', label: 'Mes Dossiers' },
    { href: '/profile', label: 'Mon Profil' },
    { href: '/associations', label: 'Associations' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#3B3B3A] backdrop-blur-md border-b border-gray-200 shadow-sm flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between p-4 md:px-8 relative">
        <div className="flex items-center md:static relative left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto"> 
        <Link href="/" className="flex items-center group">
          {/* Logo Mobile: avec titre */}
          <div className="md:hidden relative h-12 w-32">
            <Image 
              src="/logo-avectitre.png" 
              alt="MatchPet Logo" 
              fill
              className="object-contain"
            />
          </div>
          {/* Logo PC: sans titre */}
          <div className="hidden md:block relative h-20 w-20">
            <Image 
              src="/logo_sansntitre.png" 
              alt="MatchPet Logo" 
              fill
              className="object-contain"
            />
          </div>
        </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-bold transition-colors border-b-2 pb-1 text-[1.1rem] ${
                  isActive
                    ? 'text-[#B9DCA9] border-[#B9DCA9]'
                    : 'text-[#F4B9B3] hover:text-[#B9DCA9] border-transparent hover:border-[#B9DCA9]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setShowChatList(true)} className="relative hover:text-[#B9DCA9] transition-colors hidden md:block">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-[#F4B9B3]" strokeWidth={1.5} />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalUnread}
              </span>
            )}
          </button>
          
          <Link href="/profile" className="hidden md:block hover:opacity-80 transition-colors">
            <User className="w-7 h-7 text-[#F4B9B3]" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Chat List Modal */}
      {showChatList && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-start justify-center md:p-50 p-4 pt-24" onClick={() => setShowChatList(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-cursive text-3xl font-bold text-text-dark">Messages</h3>
              <button onClick={() => setShowChatList(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {adoptions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="font-medium">Aucun dossier d&apos;adoption en cours.</p>
                </div>
              ) : (
                adoptions.map(adoption => (
                  <button key={adoption.id} onClick={() => openChat(adoption)}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors text-left group">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                      <Image 
                        src={adoption.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500"} 
                        alt={adoption.name} 
                        fill
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-text-dark">{adoption.name}</h4>
                        {adoption.hasUnread && <div className="w-2.5 h-2.5 bg-primary-dark rounded-full" />}
                      </div>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {refuge ? `Par ${adoption.userName}` : `Statut : ${adoption.status}`}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Conversation Modal */}
      {activeAdoption && (
        <div className="fixed inset-0 bg-black/40 z-[70] flex items-start justify-center  md:px-100 p-4 pt-24" onClick={() => setActiveAdoption(null)}>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex items-center gap-4 bg-white rounded-t-[2.5rem]">
              <button onClick={() => setActiveAdoption(null)} className="text-gray-400 hover:text-gray-600 transition-colors" title="Retour à la liste">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-10 h-10">
                  <Image 
                    src={activeAdoption.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500"} 
                    alt={activeAdoption.name} 
                    fill
                    className="rounded-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark">{refuge ? activeAdoption.userName : activeAdoption.name}</h3>
                  <p className="text-primary-dark text-xs font-bold">{refuge ? "Adoptant" : "Refuge"}</p>
                </div>
              </div>
              <button onClick={() => { setActiveAdoption(null); setShowChatList(false); }} className="text-gray-400 hover:text-gray-600 transition-colors" title="Fermer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-medium">Posez vos questions au refuge ici !</p>
                </div>
              ) : (
                messages.map((msg: Message) => {
                  const isUser = msg.senderType?.toUpperCase() === 'USER';
                  return (
                    <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium text-white ${
                        isUser
                          ? 'bg-green-600 rounded-br-md'
                          : 'bg-pink-500 rounded-bl-md'
                      }`}>
                        <p className="break-words leading-relaxed">{msg.content}</p>
                        <p className="text-[10px] mt-1.5 font-bold text-white/70">
                          {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 rounded-b-[2.5rem]">
              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Votre message..."
                  className="flex-1 bg-transparent px-4 py-2 outline-none font-medium text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 disabled:grayscale shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
