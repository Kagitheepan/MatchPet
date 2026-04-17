"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Heart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getFallbackImage } from "@/lib/utils";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface LikedAnimal {
  id: string;
  image?: string;
}

function AdoptForm() {
  const [submitted, setSubmitted] = useState(false);
  const [animalName, setAnimalName] = useState<string>("cet animal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    if (name && name !== animalName) {
      Promise.resolve().then(() => setAnimalName(name));
    }
    const loggedUserStr = localStorage.getItem('current_user');
    if (loggedUserStr) {
      try {
        const loggedUser = JSON.parse(loggedUserStr);
        if (loggedUser && loggedUser.email && (!sessionUser || loggedUser.email !== sessionUser.email)) {
          Promise.resolve().then(() => setSessionUser(loggedUser));
        }
      } catch {
        // Handle error
      }
    }
  }, [searchParams, animalName, sessionUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const id = searchParams.get("animalId");
    
    const savedLikes: LikedAnimal[] = JSON.parse(localStorage.getItem('liked_animals') || '[]');
    const adoptedAnimal = savedLikes.find((a) => a.id === id);

    let data;
    if (sessionUser) {
      data = {
        firstName: sessionUser.firstName,
        lastName: sessionUser.lastName,
        email: sessionUser.email,
        phone: sessionUser.phone,
        password: "existing_user_hidden_password",
        animalName: animalName,
        animalId: id,
        animalImage: adoptedAnimal?.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'
      };
    } else {
      const formData = new FormData(e.currentTarget);
      
      if (isLoginMode) {
        // Procéder à la connexion avant d'adopter
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.get("email"), password: formData.get("password") })
        });
        const loginData = await loginRes.json();
        
        if (!loginData.success) {
          setErrorMessage(loginData.error || "Identifiants invalides");
          setIsSubmitting(false);
          return;
        }

        data = {
          firstName: loginData.user.firstName,
          lastName: loginData.user.lastName,
          email: loginData.user.email,
          phone: loginData.user.phone,
          password: "existing_user_hidden_password",
          animalName: animalName,
          animalId: id,
          animalImage: adoptedAnimal?.image || getFallbackImage()
        };
        
        localStorage.setItem('current_user', JSON.stringify(loginData.user));
      } else {
        // Inscription directe
        data = {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          password: formData.get("password") as string,
          animalName: animalName,
          animalId: id,
          animalImage: adoptedAnimal?.image || getFallbackImage()
        };

        localStorage.setItem('current_user', JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        }));
      }
    }

    try {
      await fetch('/api/adopt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch(err) {
      console.error(err);
    }

    setSubmitted(true);
    setIsSubmitting(false);

    if (id) {
       const updated = savedLikes.filter((a) => a.id !== id);
       localStorage.setItem('liked_animals', JSON.stringify(updated));
    }
  };

  if (submitted) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 bg-bg-light">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
          </div>
          <h1 className="font-cursive text-4xl font-bold text-text-dark mb-4 drop-shadow-sm">Félicitations !</h1>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            {sessionUser ? 
              `Votre demande d'adoption pour ${animalName} a bien été enregistrée sur votre profil.` : 
              `Votre demande d'adoption pour ${animalName} a été enregistrée avec succès sous votre profil.`}
            Ils vous recontacteront très vite !
          </p>
          <Link href="/adoptions">
            <Button variant="primary" className="w-full text-lg h-14 shadow-sm">Suivre mon dossier</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-bg-light md:items-center py-6 md:py-12 px-4 md:px-0">
      <div className="w-full max-w-xl bg-white md:rounded-[3rem] rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <h1 className="font-cursive text-4xl md:text-5xl font-bold text-text-dark mb-3 relative z-10 flex items-center gap-3">
          Adopter <span className="text-primary-dark">{animalName}</span>
        </h1>
        <p className="text-gray-500 font-medium mb-8 relative z-10 text-sm md:text-base">
          {sessionUser ? 
            "Vous êtes déjà connecté ! Cliquez simplement pour finaliser votre demande avec les coordonnées de votre profil." :
            "Pour finaliser votre demande d&apos;adoption, veuillez vous identifier ou créer votre compte."
          }
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          {!sessionUser && (
            <>
              <div className="flex gap-2 p-1 bg-gray-50 border border-gray-100 rounded-2xl mb-2">
                <button type="button" onClick={() => { setIsLoginMode(false); setErrorMessage(""); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isLoginMode ? 'bg-white text-primary-dark shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>Nouveau Compte</button>
                <button type="button" onClick={() => { setIsLoginMode(true); setErrorMessage(""); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isLoginMode ? 'bg-white text-primary-dark shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>Se Connecter</button>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold text-center">
                  {errorMessage}
                </div>
              )}

              {!isLoginMode && (
                <div className="flex flex-col md:flex-row gap-5 md:gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Prénom</label>
                    <input name="firstName" required type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-primary-dark focus:bg-white outline-none font-medium transition-all" placeholder="Jean" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Nom</label>
                    <input name="lastName" required type="text" className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-primary-dark focus:bg-white outline-none font-medium transition-all" placeholder="Dupont" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                <input name="email" required type="email" className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-primary-dark focus:bg-white outline-none font-medium transition-all" placeholder="jean.dupont@email.com" />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Téléphone</label>
                  <input name="phone" required type="tel" className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-primary-dark focus:bg-white outline-none font-medium transition-all" placeholder="06 12 34 56 78" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Mot de passe</label>
                <input name="password" required type="password" className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-primary-dark focus:bg-white outline-none font-medium transition-all" placeholder="••••••••" />
              </div>
            </>
          )}

          {sessionUser && (
            <div className="bg-green-50 text-green-700 p-5 rounded-2xl border border-green-100 font-medium mb-2 flex items-center justify-between">
              <div>
                Connecté en tant que <span className="font-bold">{sessionUser.firstName} {sessionUser.lastName}</span>
                <div className="text-[13px] opacity-70 mt-0.5">{sessionUser.email}</div>
              </div>
              <Check className="text-green-500 w-6 h-6" />
            </div>
          )}

          <Button disabled={isSubmitting} type="submit" variant="primary" className="w-full text-xl h-[3.5rem] md:h-[4rem] group mt-4 shadow-md hover:shadow-lg transition-all rounded-[2rem] disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? "Envoi en cours..." : (isLoginMode ? "S&apos;identifier et Adopter" : "Confirmer l&apos;adoption")}
            {!isSubmitting && <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform fill-current text-primary-dark group-hover:text-white" />}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdoptPage() {
  return (
    <Suspense fallback={<div className="w-full flex-1 flex items-center justify-center">Chargement...</div>}>
      <AdoptForm />
    </Suspense>
  );
}
