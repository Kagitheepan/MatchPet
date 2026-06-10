"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import Link from "next/link";

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = "matchpet-cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si le consentement a déjà été donné
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Attendre un peu avant d'afficher pour l'animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allAccepted));
    setPrefs(allAccepted);
    setIsVisible(false);
    // Dispatch d'un événement personnalisé pour informer les autres composants
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  const handleDeclineAll = () => {
    const allDeclined = { essential: true, analytics: false, marketing: false };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allDeclined));
    setPrefs(allDeclined);
    setIsVisible(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Toujours requis
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-[2rem] p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 overflow-hidden relative">
        {/* Decorative corner shape */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full translate-x-8 -translate-y-8 -z-10" />

        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 text-[#035718] rounded-2xl shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-cursive text-2xl text-text-dark font-bold">
              Respect de votre vie privée
            </h3>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              MatchPet utilise des cookies pour améliorer votre expérience, analyser le trafic du site et sécuriser nos formulaires d&apos;adoption.
            </p>
          </div>
        </div>

        {!showPreferences ? (
          <>
            <div className="text-[12px] text-gray-500 font-medium leading-relaxed">
              En cliquant sur &quot;Tout accepter&quot;, vous acceptez l&apos;utilisation de tous les cookies. Vous pouvez modifier vos préférences ou refuser à tout moment en visitant notre{" "}
              <Link href="/cookies" className="text-secondary-dark underline hover:brightness-95 transition-all">
                Politique de Cookies
              </Link>
              .
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
              <button
                onClick={handleDeclineAll}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
              >
                Tout refuser
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
              >
                Personnaliser
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 rounded-full bg-secondary text-text-dark text-xs font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all"
              >
                Tout accepter
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-2 border-t border-gray-100 pt-4">
            <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider">
              Préférences des cookies
            </h4>

            <div className="flex flex-col gap-3">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-gray-50">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-text-dark">Essentiels</span>
                    <span className="text-[10px] bg-primary/20 text-[#035718] px-1.5 py-0.5 rounded font-bold">Toujours actif</span>
                  </div>
                  <span className="text-[11px] text-gray-500 leading-normal">
                    Nécessaires au fonctionnement de MatchPet (session, sécurité, formulaires).
                  </span>
                </div>
                <div className="relative inline-flex items-center cursor-not-allowed">
                  <div className="w-11 h-6 bg-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:translate-x-5" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm text-text-dark">Mesure d&apos;audience</span>
                  <span className="text-[11px] text-gray-500 leading-normal">
                    Permettent d&apos;analyser les performances et les pages visitées pour améliorer MatchPet.
                  </span>
                </div>
                <button
                  onClick={() => togglePref("analytics")}
                  className={`relative inline-flex items-center cursor-pointer w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
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
              <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm text-text-dark">Marketing &amp; Réseaux Sociaux</span>
                  <span className="text-[11px] text-gray-500 leading-normal">
                    Servent à intégrer du contenu de réseaux sociaux et d&apos;autres partenaires tiers.
                  </span>
                </div>
                <button
                  onClick={() => togglePref("marketing")}
                  className={`relative inline-flex items-center cursor-pointer w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
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

            <div className="flex gap-2 mt-2 w-full">
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2.5 rounded-full bg-secondary text-text-dark text-xs font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
