import Link from "next/link";
import { Settings, Bell, Clock, Heart, Shield, LogOut, ChevronRight, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MENU_GROUPS = [
  {
    title: "Mes Préférences",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell, href: "/account/notifications", color: "text-blue-500", bg: "bg-blue-100" },
      { id: "location", label: "Périmètre de recherche", icon: MapPin, href: "#", color: "text-green-500", bg: "bg-green-100" },
    ]
  },
  {
    title: "Mon Activité",
    items: [
      { id: "favorites", label: "Mes coups de coeur", icon: Heart, href: "/favorites", color: "text-red-500", bg: "bg-red-100" },
      { id: "adoptions", label: "Mes adoptions", icon: Clock, href: "#", color: "text-purple-500", bg: "bg-purple-100" },
    ]
  },
  {
    title: "Confidentialité",
    items: [
      { id: "data", label: "Données personnelles", icon: Shield, href: "#", color: "text-orange-500", bg: "bg-orange-100" },
      { id: "settings", label: "Paramètres du compte", icon: Settings, href: "#", color: "text-gray-500", bg: "bg-gray-100" },
    ]
  }
];

export default function AccountPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-bg-light">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12 md:px-12">
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 md:mb-16 bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white shadow-sm">
            <User className="w-10 h-10 md:w-12 md:h-12 text-primary-dark" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h1 className="font-cursive text-4xl md:text-5xl font-bold text-text-dark leading-none mb-2">Mon Profil</h1>
            <p className="text-gray-500 font-medium md:text-lg">steef@matchpet.com</p>
          </div>
        </div>

        {/* Menu Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
          {MENU_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 w-full px-2">{group.title}</h2>
              <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden flex flex-col">
                {group.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.id} 
                      href={item.href}
                      className={`flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group ${index !== group.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg}`}>
                          <Icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <span className="font-bold text-text-dark text-lg group-hover:text-primary-dark transition-colors">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-dark transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="w-full flex justify-center pb-8 border-t border-gray-200/60 max-w-2xl mx-auto pt-8">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button variant="outline" className="text-gray-600 border-gray-200 bg-white h-14 md:w-1/2 rounded-[1.5rem] shadow-sm">
              <LogOut className="w-5 h-5 mr-2" />
              Se déconnecter
            </Button>
            <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-50 h-14 md:w-1/2 rounded-[1.5rem]">
              Supprimer mon compte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
