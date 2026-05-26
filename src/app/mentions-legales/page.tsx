import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, User, Building2, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales - MatchPet",
  description: "Informations légales concernant l'éditeur et l'hébergeur du site MatchPet.",
};

export default function MentionsLegales() {
  return (
    <div className="w-full flex-1 bg-bg-light py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm border border-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full translate-x-10 -translate-y-10" />
          <h1 className="font-cursive text-5xl md:text-6xl text-secondary-dark font-bold mb-4">
            Mentions Légales
          </h1>
          <p className="text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
            Conformément aux dispositions de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
          
          {/* Section 1: Éditeur */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                Édition du site
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Le site internet <strong className="text-text-dark">MatchPet</strong> (accessible à l&apos;adresse <Link href="/" className="text-secondary-dark underline">matchpet.fr</Link>) est édité par :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li><strong className="text-text-dark">Nom/Raison sociale :</strong> L&apos;association MatchPet</li>
                  <li><strong className="text-text-dark">Forme juridique :</strong> Association loi 1901</li>
                  <li><strong className="text-text-dark">Siège social :</strong> 123 Rue des Animaux, 75000 Paris, France</li>
                  <li><strong className="text-text-dark">Numéro RNA :</strong> W123456789</li>
                  <li><strong className="text-text-dark">Directeur de la publication :</strong> Le Président de l&apos;association MatchPet</li>
                  <li><strong className="text-text-dark">Adresse e-mail :</strong> contact@matchpet.fr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Hébergeur */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                Hébergement du site
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Le site MatchPet est hébergé par :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li><strong className="text-text-dark">Hébergeur :</strong> Render Inc.</li>
                  <li><strong className="text-text-dark">Siège social :</strong> 525 Brannan St, San Francisco, CA 94107, États-Unis</li>
                  <li><strong className="text-text-dark">Site internet :</strong> <a href="https://render.com" target="_blank" rel="noopener noreferrer" className="text-secondary-dark underline">https://render.com</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Propriété Intellectuelle */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                Propriété intellectuelle
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Tous les contenus présents sur le site MatchPet (logos, textes, graphismes, icônes, images, modélisations 3D, bases de données) sont la propriété exclusive de l&apos;association MatchPet, sauf mentions contraires ou contenus issus de banques d&apos;images libres de droits.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de l&apos;éditeur.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Contact */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                Contact et Signalement
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Pour tout signalement de contenu illicite ou inapproprié, ou pour toute question relative à l&apos;utilisation du site, vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Par e-mail : <strong className="text-text-dark">contact@matchpet.fr</strong></li>
                  <li>Par courrier postal à l&apos;adresse du siège social de l&apos;association.</li>
                </ul>
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
