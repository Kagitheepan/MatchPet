import Link from "next/link";
import { Button } from "@/components/ui/Button";
import DesktopScene from "@/components/3d/DesktopScene";
import { ArrowRight, ShieldCheck, HeartPulse, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90dvh] md:min-h-[85vh] flex items-center bg-[#f6f7f5] overflow-hidden justify-center md:justify-start">
        
        {/* 3D Background on PC / Hidden on Mobile */}
        <div className="absolute inset-0 z-0 hidden md:block w-full h-full lg:w-3/5 lg:left-auto lg:right-0">
          <div className="w-full h-full relative">
             <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#f6f7f5] to-transparent z-10" />
             <DesktopScene />
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:w-1/2 xl:w-[45%] pointer-events-none mt-[-10vh] md:mt-0 text-center md:text-left items-center md:items-start">
          <span className="inline-block py-2 px-4 rounded-full bg-secondary/10 text-secondary-dark font-bold text-[13px] md:text-sm mb-6 md:mb-8 border border-secondary/20 shadow-sm">
            ✨ Plus de 5000 adoptions réussies
          </span>
          <h1 className="font-cursive text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tight text-primary-dark mb-4 md:mb-6 leading-[0.9] drop-shadow-sm pointer-events-auto">
            Trouvez l'ami<br />parfait.
          </h1>
          <p className="text-gray-500 mb-10 text-[1.1rem] md:text-xl font-medium leading-relaxed max-w-md pointer-events-auto">
            Découvrez les animaux de nos refuges partenaires près de chez vous. Adoptez, rencontrez et partagez des moments uniques.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md pointer-events-auto">
            <Link href="/onboarding" className="w-full">
              <Button className="w-full h-[3.8rem] md:h-14 text-xl shadow-xl hover:shadow-2xl transition-all" variant="primary">
                Commencer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/search" className="w-full">
              <Button className="w-full h-[3.8rem] md:h-14 text-lg border-2 border-gray-200 hover:border-text-dark transition-all" variant="muted">
                Explorer les annonces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Desktop enhancements) */}
      <section className="w-full bg-white py-24 px-6 md:px-12 z-10 relative shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cursive text-[3.5rem] font-bold text-secondary-dark mb-4">Pourquoi MatchPet ?</h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">Une application conçue pour le bien-être animal et pour faciliter votre rencontre.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="hidden lg:block w-3/5 h-[calc(100vh-80px)] xl:h-[calc(100vh-100px)] relative rounded-r-[3rem] overflow-hidden ml-6 shadow-[10px_0_30px_rgba(0,0,0,0.05)] border-r border-[#bceba6]/20">
        <DesktopScene model="dog" />
      </div>
            <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[#f9fdf8] hover:bg-white hover:shadow-xl transition-all border border-[#eff6ec]">
              <div className="w-20 h-20 rounded-full bg-[#d2e4c8] flex items-center justify-center mb-6 shadow-sm group hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10 text-primary-dark" />
              </div>
              <h3 className="font-cursive text-3xl font-bold text-text-dark mb-3">De Proximité</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Nous priorisons les refuges situés à moins de 50km de chez vous pour faciliter la rencontre dans le monde réel.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[#fffaf9] hover:bg-white hover:shadow-xl transition-all border border-[#fdf2f1]">
              <div className="w-20 h-20 rounded-full bg-[#f4c4c4] flex items-center justify-center mb-6 shadow-sm group hover:scale-110 transition-transform">
                <HeartPulse className="w-10 h-10 text-secondary-dark" />
              </div>
              <h3 className="font-cursive text-3xl font-bold text-text-dark mb-3">Match Intelligent</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Notre algorithme analyse vos réponses pour vous proposer exclusivement un animal adapté à votre rythme de vie.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all border border-gray-100/50">
              <div className="w-20 h-20 rounded-full bg-[#e6ece4] flex items-center justify-center mb-6 shadow-sm group hover:scale-110 transition-transform">
                <ShieldCheck className="w-10 h-10 text-text-dark" />
              </div>
              <h3 className="font-cursive text-3xl font-bold text-text-dark mb-3">Sécurisé</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Toutes nos annonces proviennent de refuges officiels et de partenaires certifiés. Pas de trafic, juste de l'amour.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
