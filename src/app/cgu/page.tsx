import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Unlock,
  Heart,
  UserCheck,
  ShieldAlert,
  MessageSquare,
  Lock,
  Award,
  Link2,
  RefreshCw,
  Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) - MatchPet",
  description: "Consultez les Conditions Générales d'Utilisation de l'application MatchPet.",
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
            Veuillez lire attentivement les présentes CGU avant d&apos;utiliser l&apos;application MatchPet.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
          
          {/* ARTICLE 1 – Objet */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 1 – Objet
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Les présentes conditions générales d’utilisation (ci-après « CGU ») ont pour objet d’encadrer l’utilisation de l’application MatchPet (ci-après « l’Application ») et de ses services.
                </p>
                <p>
                  Ce contrat est conclu entre l’équipe éditrice du projet MatchPet (ci-après « l’Éditeur ») et toute personne physique ou morale souhaitant accéder à l’Application, ci-après appelée « l’Utilisateur ».
                </p>
                <p>
                  L’accès et l’utilisation de l’Application impliquent l’acceptation sans réserve des présentes CGU.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 2 – Accès aux services */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Unlock className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 2 – Accès aux services
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’Application est accessible gratuitement à tout Utilisateur disposant d’un accès à internet.
                </p>
                <p>
                  Certaines fonctionnalités nécessitent la création d’un compte utilisateur, notamment :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>le système de matching (swipe),</li>
                  <li>l’envoi de messages,</li>
                  <li>la mise en relation avec des refuges.</li>
                </ul>
                <p>
                  Les frais liés à l’accès (connexion internet, matériel, etc.) sont à la charge de l’Utilisateur.
                </p>
                <p>
                  L’Éditeur se réserve le droit d’interrompre ou de suspendre l’accès à l’Application à tout moment, notamment pour maintenance, sans préavis.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 3 – Fonctionnement du service */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 3 – Fonctionnement du service
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  MatchPet est une plateforme de mise en relation entre des Utilisateurs souhaitant adopter un animal et des refuges ou associations proposant des animaux à l’adoption.
                </p>
                <p>
                  L’Application propose notamment :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>un questionnaire permettant de définir le profil de l’Utilisateur,</li>
                  <li>un système de recommandation d’animaux,</li>
                  <li>un système de type « swipe » pour exprimer un intérêt,</li>
                  <li>une messagerie permettant d’entrer en contact avec les refuges.</li>
                </ul>
                <p>
                  L’Éditeur ne garantit pas la compatibilité entre un Utilisateur et un animal proposé.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 4 – Responsabilité de l’Utilisateur */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 4 – Responsabilité de l’Utilisateur
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L&apos;utilisateur est responsable de l’utilisation de ses identifiants de connexion. Il s’engage à conserver son mot de passe confidentiel.
                </p>
                <p>
                  L’Utilisateur est seul responsable :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>des informations qu’il fournit,</li>
                  <li>de l’usage qu’il fait de l’Application,</li>
                  <li>des décisions qu’il prend, notamment en matière d’adoption.</li>
                </ul>
                <p>
                  L’Utilisateur s’engage à :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>fournir des informations exactes,</li>
                  <li>adopter un comportement respectueux,</li>
                  <li>ne pas détourner l’usage de l&apos;application.</li>
                </ul>
                <p>
                  Toute utilisation abusive ou frauduleuse pourra entraîner la suppression du compte.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 5 – Responsabilité de l’Éditeur */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 5 – Responsabilité de l’Éditeur
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’Éditeur agit uniquement en tant qu’intermédiaire technique de mise en relation.
                </p>
                <p>
                  En conséquence :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>l’Éditeur n’est pas responsable des décisions d’adoption,</li>
                  <li>l’Éditeur ne garantit pas l’exactitude des informations fournies par les refuges,</li>
                  <li>Les refuges sont seuls responsables des animaux proposés.</li>
                </ul>
                <p>
                  L’Éditeur ne peut être tenu responsable en cas :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>de dysfonctionnement de l’Application,</li>
                  <li>d’interruption de service,</li>
                  <li>de force majeure.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ARTICLE 6 – Contenus et modération */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 6 – Contenus et modération
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Les contenus présents sur l&apos;application sont fournis par les Utilisateurs et les refuges.
                </p>
                <p>
                  L’Utilisateur s’engage à ne pas publier de contenus :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>contraires à la loi,</li>
                  <li>violents, discriminatoires ou offensants,</li>
                  <li>portant atteinte aux droits de tiers.</li>
                </ul>
                <p>
                  L’Éditeur se réserve le droit de :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>modérer,</li>
                  <li>modifier,</li>
                  <li>ou supprimer tout contenu,</li>
                </ul>
                <p>
                  sans obligation de justification.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 7 – Données personnelles */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 7 – Données personnelles
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’Utilisateur est amené à fournir des données personnelles lors de son inscription, telles que :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>adresse email,</li>
                  <li>informations de profil,</li>
                  <li>préférences liées à l’adoption.</li>
                </ul>
                <p>
                  Ces données sont utilisées pour :
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>la gestion du compte,</li>
                  <li>le fonctionnement du service de matching,</li>
                  <li>la mise en relation avec les refuges.</li>
                </ul>
                <p>
                  L&apos;utilisateur peut demander la modification ou la suppression de ses données.
                </p>
                <p>
                  L’Éditeur met en œuvre des moyens raisonnables pour assurer la sécurité des données, sans garantie absolue.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 8 – Propriété intellectuelle */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 8 – Propriété intellectuelle
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’ensemble des éléments de l&apos;application (design, logo, textes, fonctionnalités) est protégé par le droit de la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction ou utilisation sans autorisation est interdite.
                </p>
                <p>
                  L&apos;utilisateur dispose uniquement d’un droit d’usage personnel de l’Application.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 9 – Liens hypertextes */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Link2 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 9 – Liens hypertextes
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’Application peut contenir des liens vers des sites externes.
                </p>
                <p>
                  L’Éditeur n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 10 – Évolution des CGU */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10 pb-8 border-b border-gray-100">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 10 – Évolution des CGU
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  L’Éditeur se réserve le droit de modifier les présentes CGU à tout moment.
                </p>
                <p>
                  Les nouvelles conditions s’appliquent dès leur mise en ligne.
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE 11 – Droit applicable */}
          <section className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-cursive text-3xl text-secondary-dark font-bold mb-4">
                ARTICLE 11 – Droit applicable
              </h2>
              <div className="text-gray-600 space-y-3 leading-relaxed text-[15px] font-medium">
                <p>
                  Les présentes CGU sont soumises au droit français.
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
