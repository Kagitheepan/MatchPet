"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, MapPin, XCircle, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type AdoptionStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

interface Adoption {
  id: string | number;
  name: string;
  image?: string;
  status: AdoptionStatus;
  location?: string;
  requestDate: string;
}

export default function AdoptionsPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem('current_user');
    if (!userStr) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      if (user && user.firstName && user.firstName !== userName) {
        Promise.resolve().then(() => setUserName(user.firstName));
      }
      
      if (user && user.email) {
        fetch(`/api/adoptions?email=${encodeURIComponent(user.email)}`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) {
              setAdoptions(data);
            }
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      } else {
        Promise.resolve().then(() => setLoading(false));
      }
    } catch {
      Promise.resolve().then(() => setLoading(false));
    }
  }, [userName]);

  const getStatusInfo = (status: AdoptionStatus) => {
    switch(status) {
      case 'pending':
        return { label: "En attente d&apos;examen", color: "text-amber-600", bg: "bg-amber-100", bar: "bg-amber-500", progress: 25, icon: Clock };
      case 'reviewing':
        return { label: "Dossier en cours d&apos;étude", color: "text-blue-600", bg: "bg-blue-100", bar: "bg-blue-500", progress: 60, icon: FileText };
      case 'approved':
        return { label: "Adoption validée", color: "text-green-600", bg: "bg-green-100", bar: "bg-green-500", progress: 100, icon: CheckCircle2 };
      case 'rejected':
        return { label: "Demande refusée", color: "text-red-600", bg: "bg-red-100", bar: "bg-red-500", progress: 100, icon: XCircle };
      default:
        return { label: "En cours", color: "text-gray-600", bg: "bg-gray-100", bar: "bg-gray-500", progress: 0, icon: Clock };
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Date inconnue";
    return new Date(isoString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-white">
      <div className="w-full max-w-5xl mx-auto px-6 py-6 md:py-12 md:px-12">
        <h1 className="font-cursive text-4xl md:text-5xl text-text-dark font-bold mb-3">
          {userName ? `Les Adoptions de ${userName}` : "Mes Adoptions"}
        </h1>
        <p className="text-gray-500 font-medium mb-8 md:mb-12">Suivez l&apos;évolution de vos demandes d&apos;adoptions en temps réel.</p>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : adoptions.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-sm border border-gray-50 flex flex-col items-center">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-text-dark mb-2">Aucun dossier en cours</h2>
            <p className="text-gray-500 font-medium mb-8 max-w-sm">Vous n&apos;avez pas encore fait de demande d&apos;adoption.</p>
            <Link href="/match">
              <Button variant="primary" className="h-12 px-8">Trouver mon compagnon</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:gap-8">
            {adoptions.map((adoption, index) => {
              const status = getStatusInfo(adoption.status || 'pending');
              const StatusIcon = status.icon;
              
              return (
                <div key={index} className="bg-white rounded-[2rem] p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  {/* Animal Info */}
                  <div className="flex gap-4 md:w-1/3 w-full shrink-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.2rem] overflow-hidden bg-gray-100 shrink-0">
                      <Image src={adoption.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'} alt={adoption.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-cursive text-2xl md:text-3xl font-bold text-text-dark leading-none mb-1">
                        {adoption.name}
                      </h3>
                      {adoption.location && (
                        <p className="text-xs font-bold text-gray-400 mt-1 flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {adoption.location}
                        </p>
                      )}
                      <p className="text-[11px] font-bold text-gray-400 mt-2">
                        Demandé le {formatDate(adoption.requestDate)}
                      </p>
                    </div>
                  </div>

                  {/* Status Tracking */}
                  <div className="flex-1 w-full bg-gray-50 rounded-2xl p-4 md:p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${status.color}`} />
                        </div>
                        <span className={`font-bold text-sm ${status.color}`} dangerouslySetInnerHTML={{ __html: status.label }} />
                      </div>
                      
                      {status.progress === 100 && adoption.status === 'approved' && (
                        <span className="font-bold text-xs uppercase tracking-wider text-green-500 bg-green-100 px-3 py-1 rounded-full">
                          Terminé
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-100 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${status.bar}`}
                        style={{ width: `${status.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-2 px-1">
                      <span>Dossier envoyé</span>
                      <span>En étude</span>
                      <span>Décision</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
