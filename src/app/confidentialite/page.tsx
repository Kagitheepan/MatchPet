import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Database, Share2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - MatchPet",
  description: "Découvrez comment MatchPet protège vos données personnelles conformément au RGPD.",
};

export default function Confidentialite() {
  return (
    <div className="w-full flex-1 bg-bg-light py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm border border-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full translate-x-10 -translate-y-10" />
          <h1 className="font-cursive text-5xl md:text-6xl text-secondary-dark font-bold mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
            Chez MatchPet, nous prenons soin de votre vie privée autant que de vos futurs compagnons. Découvrez comment nous gérons vos données personnelles.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
          
          {/* Introduction */}
          <p className="text-gray-600 leading-relaxed text-[15px] font-medium border-b border-gray-100 pb-6">
            L&apos;association MatchPet s&apos;engage à ce que la collecte et le traitement de vos données, effectués à partir du site <Link href="/" className="text-secondary-dark underline">matchpet.fr</Link>, soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>

          {/* Section 1: Collecte */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                1. Les données que nous collectons
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Dans le cadre de votre utilisation du site, nous collectons les catégories de données suivantes :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-2">
                  <li><strong className="text-text-dark">Données d&apos;inscription :</strong> e-mail, mot de passe (crypté).</li>
                  <li><strong className="text-text-dark">Profil d&apos;onboarding :</strong> informations sur votre logement (appartement/maison, jardin), votre composition familiale (enfants, autres animaux), vos horaires de présence et votre expérience de garde.</li>
                  <li><strong className="text-text-dark">Données d&apos;activité :</strong> vos animaux favoris et vos demandes d&apos;adoptions/contacts formulées.</li>
                  <li><strong className="text-text-dark">Données techniques :</strong> adresse IP anonymisée, type de navigateur, choix de consentement pour les cookies.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Finalités */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                2. Pourquoi collectons-nous ces données ?
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Le traitement de vos données est nécessaire pour :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Calculer l&apos;indice de compatibilité (matching) entre votre profil et les animaux disponibles.</li>
                  <li>Vous permettre de sauvegarder et retrouver vos animaux coup de cœur.</li>
                  <li>Transmettre vos demandes d&apos;adoption aux associations partenaires compétentes.</li>
                  <li>Améliorer le parcours utilisateur et corriger les bugs techniques du site.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Destinataires */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                3. Destinataires et Transfert des données
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  <strong className="text-text-dark font-bold">Aucune revente commerciale :</strong> MatchPet s&apos;engage formellement à ne jamais vendre ou louer vos données personnelles à des tiers.
                </p>
                <p>
                  Vos données de profil ne sont transmises qu&apos;aux <strong className="text-secondary-dark font-semibold">associations partenaires</strong> de votre choix, et ce uniquement lorsque vous validez une demande de contact ou d&apos;adoption pour l&apos;un de leurs animaux.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Conservation et Sécurité */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                4. Durée de conservation et Sécurité
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  <strong className="text-text-dark">Durée :</strong> Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernière activité (dernière connexion). Si vous supprimez votre compte, vos données personnelles sont définitivement effacées sous 30 jours.
                </p>
                <p>
                  <strong className="text-text-dark">Sécurité :</strong> Nous mettons en œuvre des mesures de sécurité techniques (chiffrement SSL des échanges, hachage des mots de passe) et organisationnelles pour protéger vos informations contre les accès non autorisés.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Droits */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                5. Vos droits (RGPD)
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement (droit à l&apos;oubli), de portabilité et de limitation du traitement de vos données. Vous pouvez également vous opposer à tout moment au traitement de vos données pour motifs légitimes.
                </p>
                <p>
                  Pour exercer ces droits, vous pouvez contacter notre délégué à la protection des données (DPO) :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Par e-mail : <strong className="text-text-dark">privacy@matchpet.fr</strong></li>
                  <li>Par courrier : Association MatchPet, DPO, 123 Rue des Animaux, 75000 Paris</li>
                </ul>
                <p>
                  Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation auprès de la CNIL (<a href="https://cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary-dark underline">cnil.fr</a>).
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
