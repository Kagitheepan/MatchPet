"use client";

import { useState, useEffect } from "react";
import { CookiePreferences } from "./CookieBanner";
import { CheckCircle2, Save, Undo2 } from "lucide-react";

const COOKIE_CONSENT_KEY = "matchpet-cookie-consent";

export default function CookieSettings() {
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPrefs({
          essential: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === "essential") return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsSaved(true);
    // Notifier le reste de l'application
    window.dispatchEvent(new Event("cookie-consent-changed"));
    
    // Masquer le message de confirmation après 3 secondes
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    const defaultPrefs = { essential: true, analytics: false, marketing: false };
    setPrefs(defaultPrefs);
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setIsSaved(true);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-50 rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col gap-6 mt-6">
      <div className="flex items-center gap-3">
        <h3 className="font-cursive text-2xl text-secondary-dark font-bold">
          Gérer mes préférences de cookies
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 font-medium">
        Vous pouvez activer ou désactiver les différentes catégories de cookies utilisées sur MatchPet à l&apos;aide des sélecteurs ci-dessous :
      </p>

      <div className="flex flex-col gap-4">
        {/* Essential */}
        <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-text-dark">Cookies essentiels</span>
              <span className="text-[10px] bg-primary/20 text-[#035718] px-2 py-0.5 rounded-full font-bold">Toujours actif</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Ces cookies sont indispensables pour naviguer sur le site, utiliser ses fonctionnalités de base (comme l&apos;onboarding) et sécuriser la plateforme. Ils ne collectent aucune information personnelle à des fins de marketing.
            </p>
          </div>
          <div className="relative inline-flex items-center shrink-0">
            <div className="w-11 h-6 bg-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:translate-x-5" />
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="font-semibold text-base text-text-dark">Cookies de mesure d&apos;audience (Analyses)</span>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Ces cookies nous aident à comprendre comment les visiteurs interagissent avec MatchPet (pages visitées, temps passé). Toutes les informations recueillies par ces cookies sont agrégées et donc anonymisées.
            </p>
          </div>
          <button
            onClick={() => togglePref("analytics")}
            className={`relative inline-flex items-center cursor-pointer w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus:outline-none ${
              prefs.analytics ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 shadow-sm ${
                prefs.analytics ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Marketing */}
        <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="font-semibold text-base text-text-dark">Cookies marketing et réseaux sociaux</span>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Ces cookies permettent d&apos;intégrer des fonctionnalités interactives tierces (comme le partage sur les réseaux sociaux, des vidéos ou des cartes). Si vous les refusez, certains contenus externes risquent de ne pas s&apos;afficher correctement.
            </p>
          </div>
          <button
            onClick={() => togglePref("marketing")}
            className={`relative inline-flex items-center cursor-pointer w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus:outline-none ${
              prefs.marketing ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 shadow-sm ${
                prefs.marketing ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between mt-2 pt-4 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-100 active:scale-95 transition-all"
        >
          <Undo2 className="w-4 h-4" />
          Réinitialiser le consentement
        </button>
        
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-text-dark text-xs font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          Enregistrer mes choix
        </button>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 bg-green-50 text-green-800 p-4 rounded-2xl border border-green-100 text-sm font-semibold animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          Vos choix ont été enregistrés avec succès.
        </div>
      )}
    </div>
  );
}
