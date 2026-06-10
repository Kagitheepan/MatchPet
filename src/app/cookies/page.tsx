import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ShieldCheck, Clock } from "lucide-react";
import CookieSettings from "@/components/layout/CookieSettings";

export const metadata: Metadata = {
  title: "Politique de Cookies - MatchPet",
  description: "Découvrez notre politique d'utilisation des cookies et gérez vos préférences.",
};

export default function CookiesPage() {
  return (
    <div className="w-full flex-1 bg-bg-light py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm border border-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full translate-x-10 -translate-y-10" />
          <h1 className="font-cursive text-5xl md:text-6xl text-secondary-dark font-bold mb-4">
            Politique de Cookies
          </h1>
          <p className="text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
            Consultez les informations relatives aux cookies utilisés sur le site MatchPet et personnalisez vos choix à tout moment.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
          
          {/* Section 1: Qu'est-ce qu'un cookie */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Cookie className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                1. Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Un cookie (ou traceur) est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d&apos;un site internet. Il permet au site de mémoriser des informations sur votre visite, comme votre session utilisateur, vos préférences linguistiques, ou vos réponses à des questionnaires (comme l&apos;onboarding de MatchPet).
                </p>
                <p>
                  Les cookies jouent un rôle essentiel pour améliorer l&apos;ergonomie des sites et garantir la sécurité des services en ligne.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie preference settings (Client component) */}
          <section>
            <CookieSettings />
          </section>

          {/* Section 3: Durée de conservation */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100 pt-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                2. Durée de conservation des cookies
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Conformément aux directives de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Les cookies de session et de sécurité sont supprimés dès que vous fermez votre navigateur.</li>
                  <li>Les cookies nécessitant votre consentement (mesure d&apos;audience, réseaux sociaux) sont conservés pour une durée maximale de <strong className="text-text-dark">13 mois</strong>. Vos choix de consentement sont eux-mêmes mémorisés pendant une durée de <strong className="text-text-dark">6 mois</strong> (au-delà de laquelle nous vous solliciterons à nouveau).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Paramétrage du navigateur */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                3. Configurer votre navigateur
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Vous pouvez également configurer votre navigateur pour qu&apos;il accepte ou rejette systématiquement les cookies. Voici comment procéder sur les principaux navigateurs :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li><strong className="text-text-dark">Google Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données de site.</li>
                  <li><strong className="text-text-dark">Mozilla Firefox :</strong> Options &gt; Vie privée et sécurité &gt; Cookies et données de sites.</li>
                  <li><strong className="text-text-dark">Safari :</strong> Préférences &gt; Confidentialité &gt; Bloquer tous les cookies.</li>
                  <li><strong className="text-text-dark">Microsoft Edge :</strong> Paramètres &gt; Autorisations du site &gt; Cookies et données de site.</li>
                </ul>
                <p className="text-[13px] italic text-gray-500 mt-2">
                  Note : le blocage complet de tous les cookies de manière globale dans votre navigateur peut perturber l&apos;accès à certaines fonctionnalités essentielles du site MatchPet.
                </p>
              </div>
            </div>
          </section>

        </div>
        
        {/* Footer Nav Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-secondary-dark font-semibold hover:translate-x-[-4px] transition-transform font-cursive text-2xl">
            ← Retourner à l&apos;accueil
          </Link>
        </div>

      </div>
    </div>
  );
}
