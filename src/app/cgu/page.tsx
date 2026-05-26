import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ShieldAlert, Heart, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) - MatchPet",
  description: "Consultez les Conditions Générales d'Utilisation du site et des services de MatchPet.",
};

export default function CGU() {
  return (
    <div className="w-full flex-1 bg-bg-light py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm border border-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full translate-x-10 -translate-y-10" />
          <h1 className="font-cursive text-5xl md:text-6xl text-secondary-dark font-bold mb-4">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
            Dernière mise à jour : 26 mai 2026. Veuillez lire attentivement les présentes CGU avant d&apos;utiliser notre plateforme.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
          
          {/* Section 1: Objet */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                1. Objet des CGU
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Les présentes Conditions Générales d&apos;Utilisation (dites « CGU ») encadrent juridiquement l&apos;utilisation des services du site <strong className="text-text-dark">MatchPet</strong>.
                </p>
                <p>
                  L&apos;accès et l&apos;utilisation du site par l&apos;utilisateur impliquent son acceptation sans réserve des présentes CGU. En cas de non-acceptation des CGU, l&apos;utilisateur se doit de renoncer à l&apos;accès aux services proposés par le site.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Fonctionnement */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                2. Les Services MatchPet
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  MatchPet met en relation des utilisateurs souhaitant adopter un animal de compagnie avec des associations partenaires proposant des animaux à l&apos;adoption. Le site propose notamment :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Un moteur de recherche d&apos;animaux de compagnie.</li>
                  <li>Un système de matching personnalisé basé sur le profil de l&apos;utilisateur.</li>
                  <li>Une mise en favoris d&apos;animaux et de fiches de conseils.</li>
                  <li>Un espace d&apos;onboarding pour cibler le profil d&apos;adoption idéal.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Responsabilités */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                3. Responsabilités &amp; Disclaimers
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  <strong className="text-secondary-dark font-semibold">Responsabilité de MatchPet :</strong> MatchPet intervient uniquement en tant qu&apos;intermédiaire technique de mise en relation. Nous ne saurions être tenus responsables des processus d&apos;adoption menés à bien ou non, du comportement des animaux adoptés, ou de l&apos;exactitude des fiches fournies par les associations.
                </p>
                <p>
                  <strong className="text-text-dark">Responsabilité de l&apos;utilisateur :</strong> L&apos;utilisateur est responsable de la sincérité des informations saisies lors de l&apos;onboarding et de ses fiches profils. Tout comportement malveillant ou fausse déclaration pourra entraîner la clôture immédiate de son compte.
                </p>
                <p>
                  L&apos;adoption d&apos;un animal est un acte sérieux qui vous engage sur le long terme. Les utilisateurs doivent s&apos;assurer de disposer des ressources nécessaires (temps, espace, finances) avant d&apos;initier un contact d&apos;adoption.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Propriété intellectuelle */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                4. Propriété intellectuelle
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Les marques, logos, graphismes et modélisations 3D du site MatchPet font l&apos;objet d&apos;une protection par le Code de la propriété intellectuelle.
                </p>
                <p>
                  L&apos;utilisateur doit solliciter l&apos;autorisation préalable de MatchPet pour toute reproduction, publication, copie des différents contenus. Il s&apos;engage à une utilisation des contenus du site dans un cadre strictement privé ; toute utilisation à des fins commerciales est interdite.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Loi applicable */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                5. Droit applicable &amp; Juridiction
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  La législation française s&apos;applique au présent contrat. En cas d&apos;absence de résolution amiable d&apos;un litige né entre les parties, les tribunaux de Paris seront seuls compétents pour en connaître.
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
