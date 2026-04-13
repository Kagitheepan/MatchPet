"use client";

import { useState, useEffect } from "react";
import { User, Archive, Bell, PieChart, FolderHeart, Cat, Navigation, ArrowRight, Trash2, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<any>(null);

  const [showAuth, setShowAuth] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('current_user') || 'null');
    if (!localUser || !localUser.email) {
      setLoading(false);
      return;
    }
    setSessionUser(localUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center bg-[#efefef]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    
    try {
      if (isLoginMode) {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authEmail, password: authPassword })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        if (data.success && data.user) {
          localStorage.setItem('current_user', JSON.stringify(data.user));
          setSessionUser(data.user);
        }
      } else {
        // Inscription via API
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authEmail, password: authPassword, firstName: authFirstName, lastName: authLastName })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        if (data.success && data.user) {
          localStorage.setItem('current_user', JSON.stringify(data.user));
          setSessionUser(data.user);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Erreur d'authentification");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionUser) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#efefef] p-6">
        {!showAuth ? (
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-sm border border-gray-50 flex flex-col items-center max-w-sm w-full">
            <User className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-3xl font-cursive font-bold text-text-dark mb-4">Profil</h2>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
              Connectez-vous pour configurer vos paramètres personnels.
            </p>
            <Button onClick={() => setShowAuth(true)} variant="primary" className="w-full h-14 text-lg font-bold shadow-md hover:scale-[1.02] transition-transform">
              Se connecter
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-50 flex flex-col max-w-md w-full">
            <h2 className="text-3xl font-cursive font-bold text-text-dark mb-8 text-center tracking-wide">
              {isLoginMode ? "Connexion" : "Créer un compte"}
            </h2>
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-5">
              {!isLoginMode && (
                <div className="flex gap-4">
                  <input value={authFirstName} onChange={e => setAuthFirstName(e.target.value)} placeholder="Prénom" required type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                  <input value={authLastName} onChange={e => setAuthLastName(e.target.value)} placeholder="Nom" required type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                </div>
              )}
              <input value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email" required type="email" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
              <input value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="Mot de passe" required type="password" className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
              
              {authError && <p className="text-red-500 font-medium text-sm text-center">{authError}</p>}
              
              <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold mt-4 shadow-md hover:scale-[1.02] transition-transform">
                {isLoginMode ? "Se connecter" : "S'inscrire"}
              </Button>
            </form>
            
            <p className="text-center mt-8 text-gray-500 font-medium">
              {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button type="button" onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(""); }} className="text-primary-dark font-bold ml-2 hover:underline hover:underline-offset-4">
                {isLoginMode ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
             <button onClick={() => setShowAuth(false)} type="button" className="mx-auto block mt-6 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4">Retour</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#efefef]">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto pt-10 pb-6 px-10">
        <h1 className="font-cursive text-5xl text-text-dark font-bold tracking-wider">Paramètres</h1>
      </div>

      {/* Options Block (Green) */}
      <div className="w-full bg-[#bad2b6] flex flex-col items-center py-10 shadow-inner">
        <div className="w-full max-w-sm flex flex-col gap-4 px-6 md:px-0">
           
           <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
             <div className="flex items-center gap-4">
                <Archive className="text-text-dark w-5 h-5 stroke-[2.5]" />
                <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Stockage des Données</span>
             </div>
             <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
           </button>

           <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
             <div className="flex items-center gap-4">
                <Bell className="text-text-dark w-5 h-5 stroke-[2.5]" />
                <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Notifications</span>
             </div>
             <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
           </button>

           <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
             <div className="flex items-center gap-4">
                <PieChart className="text-text-dark w-5 h-5 stroke-[2.5]" />
                <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Activité du compte</span>
             </div>
             <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
           </button>

           <Link href="/favorites" className="w-full block">
             <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
               <div className="flex items-center gap-4">
                  <FolderHeart className="text-text-dark w-5 h-5 stroke-[2.5]" />
                  <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Gestion des favoris</span>
               </div>
               <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
             </button>
           </Link>

           <Link href="/adoptions" className="w-full block">
             <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
               <div className="flex items-center gap-4">
                  <Cat className="text-text-dark w-5 h-5 stroke-[2.5]" />
                  <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Mes adoptions</span>
               </div>
               <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
             </button>
           </Link>

           <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
             <div className="flex items-center gap-4">
                <Navigation className="text-text-dark w-5 h-5 stroke-[2.5]" />
                <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Localisation</span>
             </div>
             <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
           </button>

        </div>
      </div>

      {/* Disconnect Block */}
      <div className="w-full bg-[#efefef] flex flex-col items-center py-10 z-10 relative">
        <div className="w-full max-w-sm px-6 md:px-0 mb-6">
          <h2 className="font-cursive text-4xl md:text-5xl text-text-dark font-bold tracking-wider">Se déconnecter</h2>
        </div>
        <div className="w-full max-w-sm px-6 md:px-0">
          <button onClick={handleLogout} className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-4">
               <PowerOff className="text-text-dark w-5 h-5 stroke-[2.5]" />
               <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Se déconnecter</span>
            </div>
            <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
          </button>
        </div>
      </div>

      {/* Delete Account Block */}
      <div className="w-full bg-[#e8bebe] flex flex-col items-center py-10 z-0 relative flex-1">
        <div className="w-full max-w-sm px-6 md:px-0">
          <button className="w-full bg-[#f6f7f5] rounded-full px-5 py-3 border border-gray-400/40 shadow-sm flex items-center justify-between hover:scale-[1.02] hover:bg-red-50 transition-all">
            <div className="flex items-center gap-4">
               <Trash2 className="text-text-dark w-5 h-5 stroke-[2.5]" />
               <span className="font-cursive text-2xl text-text-dark font-bold tracking-wide">Supprimer mon compte</span>
            </div>
            <ArrowRight className="text-text-dark w-5 h-5 stroke-[2.5] mr-1" />
          </button>
        </div>
      </div>

    </div>
  );
}
