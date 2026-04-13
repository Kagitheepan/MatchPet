"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Users, PlusCircle, FileText, LogOut, ChevronDown, Check, X, Eye, Clock, CheckCircle, XCircle, MessageCircle, Send, ArrowLeft } from "lucide-react";

type TabType = "animals" | "addAnimal" | "adoptions" | "messages";

interface AnimalData {
  id: number;
  externalId: string;
  name: string;
  species: string;
  breed?: string;
  age?: string;
  gender?: string;
  size?: string;
  description?: string;
  photos?: string[];
}

interface AdoptionData {
  id: number;
  animalName: string;
  animalImage?: string;
  status: string;
  createdAt: string;
  user: { name?: string; email: string; phone?: string };
}

export default function AssociationsPage() {
  const [refuge, setRefuge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth
  const [showAuth, setShowAuth] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState("");

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPostalCode, setRegPostalCode] = useState("");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Dashboard
  const [activeTab, setActiveTab] = useState<TabType>("animals");
  const [animals, setAnimals] = useState<AnimalData[]>([]);
  const [adoptions, setAdoptions] = useState<AdoptionData[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Chat
  const [chatAdoption, setChatAdoption] = useState<AdoptionData | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add animal form
  const [animalName, setAnimalName] = useState("");
  const [animalSpecies, setAnimalSpecies] = useState("Dog");
  const [animalBreed, setAnimalBreed] = useState("");
  const [animalAge, setAnimalAge] = useState("Young");
  const [animalGender, setAnimalGender] = useState("Male");
  const [animalSize, setAnimalSize] = useState("Medium");
  const [animalDescription, setAnimalDescription] = useState("");
  const [animalPhotoUrl, setAnimalPhotoUrl] = useState("");
  const [animalPhotos, setAnimalPhotos] = useState<string[]>([]);
  const [goodWithChildren, setGoodWithChildren] = useState(false);
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [needsGarden, setNeedsGarden] = useState(false);
  const [animalEnergy, setAnimalEnergy] = useState("Medium");

  useEffect(() => {
    const stored = localStorage.getItem("matchpet_refuge");
    if (stored) {
      try {
        setRefuge(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (refuge?.id) {
      fetchAnimals();
      fetchAdoptions();
      const interval = setInterval(fetchAdoptions, 30000);
      return () => clearInterval(interval);
    }
  }, [refuge]);

  useEffect(() => {
    if (chatAdoption) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(`/api/messages?adoptionId=${chatAdoption.id}&viewerType=refuge`);
          const data = await res.json();
          if (Array.isArray(data)) setChatMessages(data);
        } catch {}
      };
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [chatAdoption]);

  const fetchAnimals = async () => {
    try {
      const res = await fetch(`/api/admin/animals?refugeId=${refuge.id}`);
      const data = await res.json();
      if (Array.isArray(data)) setAnimals(data);
    } catch {}
  };

  const fetchAdoptions = async () => {
    try {
      const res = await fetch(`/api/admin/adoptions?refugeId=${refuge.id}`);
      const data = await res.json();
      if (Array.isArray(data)) setAdoptions(data);
    } catch {}
  };

  // ── Auth handlers ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword, phone: regPhone, address: regAddress, city: regCity, postalCode: regPostalCode }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setIsLoginMode(true);
      setSuccessMsg("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      // Reset register fields
      setRegName(""); setRegEmail(""); setRegPassword(""); setRegPhone(""); setRegAddress(""); setRegCity(""); setRegPostalCode("");
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      localStorage.setItem("matchpet_refuge", JSON.stringify(data.refuge));
      setRefuge(data.refuge);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("matchpet_refuge");
    setRefuge(null);
  };

  // ── Add animal ──
  const handleAddAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    try {
      // Combiner l'URL manuelle et les photos téléchargées
      const photos = [...animalPhotos];
      if (animalPhotoUrl.trim()) photos.push(animalPhotoUrl.trim());

      const res = await fetch("/api/admin/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refugeId: refuge.id, name: animalName, species: animalSpecies, breed: animalBreed || null,
          age: animalAge, gender: animalGender, size: animalSize, description: animalDescription || null,
          photos: photos.length > 0 ? photos : null, goodWithChildren, goodWithDogs, goodWithCats, needsGarden, energyLevel: animalEnergy,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSuccessMsg(`${animalName} a été ajouté avec succès !`);
      setAnimalName(""); setAnimalBreed(""); setAnimalDescription(""); setAnimalPhotoUrl("");
      setAnimalPhotos([]);
      setGoodWithChildren(false); setGoodWithDogs(false); setGoodWithCats(false); setNeedsGarden(false);
      fetchAnimals();
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnimalPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setAnimalPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // ── Update adoption status ──
  const handleUpdateAdoption = async (adoptionId: number, status: string) => {
    try {
      await fetch("/api/admin/adoptions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adoptionId, status }),
      });
      fetchAdoptions();
    } catch {}
  };

  const handleDeleteAdoption = async (adoptionId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir clôturer et supprimer ce dossier ? Cette action est irréversible.")) return;
    try {
      await fetch(`/api/admin/adoptions?adoptionId=${adoptionId}`, {
        method: "DELETE",
      });
      fetchAdoptions();
    } catch {}
  };

  // ── Chat ──
  const openChat = async (adoption: AdoptionData) => {
    setChatAdoption(adoption);
    setChatLoading(true);
    try {
      const res = await fetch(`/api/messages?adoptionId=${adoption.id}&viewerType=refuge`);
      const data = await res.json();
      if (Array.isArray(data)) setChatMessages(data);
    } catch {}
    setChatLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !chatAdoption || !refuge) return;
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adoptionId: chatAdoption.id,
          senderType: 'refuge',
          senderId: refuge.id,
          content: chatInput.trim(),
        }),
      });
      setChatInput('');
      // Refresh messages
      const res = await fetch(`/api/messages?adoptionId=${chatAdoption.id}&viewerType=refuge`);
      const data = await res.json();
      if (Array.isArray(data)) setChatMessages(data);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch {}
  };

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: "En attente", color: "bg-amber-100 text-amber-700", icon: Clock },
    reviewing: { label: "En cours", color: "bg-blue-100 text-blue-700", icon: Eye },
    approved: { label: "Approuvé", color: "bg-green-100 text-green-700", icon: CheckCircle },
    rejected: { label: "Refusé", color: "bg-red-100 text-red-700", icon: XCircle },
  };

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center bg-white min-h-[calc(100vh-80px)]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not logged in ──
  if (!refuge) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-white p-6 min-h-[calc(100vh-80px)]">
        {!showAuth ? (
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-lg border border-gray-100 flex flex-col items-center max-w-sm w-full">
            <Users className="w-16 h-16 text-primary-dark mb-6" />
            <h2 className="text-3xl font-cursive font-bold text-text-dark mb-4">Espace Associations</h2>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
              Accédez à votre tableau de bord pour gérer vos animaux et vos dossiers d'adoption.
            </p>
            <Button onClick={() => { setShowAuth(true); setIsLoginMode(true); }} variant="primary" className="w-full h-14 text-lg font-bold shadow-md hover:scale-[1.02] transition-transform">
              Se connecter
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-lg border border-gray-100 flex flex-col max-w-lg w-full">
            <h2 className="text-3xl font-cursive text-bold text-text-dark mb-8 text-center tracking-wide">
              {isLoginMode ? "Connexion Association" : "Inscrire votre refuge"}
            </h2>
            {successMsg && <p className="text-green-600 font-medium text-sm text-center mb-4 bg-green-50 p-3 rounded-xl">{successMsg}</p>}

            {isLoginMode ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Email du refuge" required type="email"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Mot de passe" required type="password"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                {authError && <p className="text-red-500 font-medium text-sm text-center">{authError}</p>}
                <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold mt-2 shadow-md hover:scale-[1.02] transition-transform" disabled={submitting}>
                  {submitting ? "..." : "Se connecter"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Nom de l'association *" required type="text"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email de l'association *" required type="email"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                <input value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Mot de passe *" required type="password"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                <input value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder="Téléphone" type="tel"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                <div className="flex gap-3">
                  <input value={regAddress} onChange={e => setRegAddress(e.target.value)} placeholder="Adresse *" required type="text"
                    className="flex-1 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                </div>
                <div className="flex gap-3">
                  <input value={regCity} onChange={e => setRegCity(e.target.value)} placeholder="Ville *" required type="text"
                    className="flex-1 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                  <input value={regPostalCode} onChange={e => setRegPostalCode(e.target.value)} placeholder="Code postal *" required type="text"
                    className="w-32 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium transition-all" />
                </div>
                {authError && <p className="text-red-500 font-medium text-sm text-center">{authError}</p>}
                <Button type="submit" variant="primary" className="w-full h-14 text-lg font-bold mt-2 shadow-md hover:scale-[1.02] transition-transform" disabled={submitting}>
                  {submitting ? "..." : "S'inscrire"}
                </Button>
              </form>
            )}

            <p className="text-center mt-8 text-gray-500 font-medium">
              {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button type="button" onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(""); setSuccessMsg(""); }} className="text-primary-dark font-bold ml-2 hover:underline hover:underline-offset-4">
                {isLoginMode ? "Inscrire votre refuge" : "Se connecter"}
              </button>
            </p>
            <button onClick={() => { setShowAuth(false); setAuthError(""); setSuccessMsg(""); }} type="button" className="mx-auto block mt-6 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4">Retour</button>
          </div>
        )}
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="w-full flex-1 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto p-4 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-cursive text-3xl md:text-5xl font-bold text-text-dark">{refuge.name}</h1>
            <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">{refuge.city} · {refuge.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors w-fit">
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5">
          {([
            { id: "animals" as TabType, label: "Mes Animaux", icon: Users },
            { id: "addAnimal" as TabType, label: "Ajouter un Animal", icon: PlusCircle },
            { id: "adoptions" as TabType, label: "Dossiers d'Adoption", icon: FileText },
            { id: "messages" as TabType, label: "Messages", icon: MessageCircle },
          ]).map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSuccessMsg(""); }}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs md:text-sm transition-all
                ${activeTab === tab.id ? "bg-white text-text-dark shadow-sm" : "text-gray-500 hover:text-text-dark"}`}
            >
              <tab.icon className="w-4 h-4 shrink-0" /> {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Messages (Conversations) ── */}
        {activeTab === "messages" && (
          <div className="max-w-2xl mx-auto w-full">
            {adoptions.length === 0 ? (
              <div className="text-center py-16 md:py-20 text-gray-400">
                <MessageCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-40" />
                <p className="font-medium text-base md:text-lg">Aucune conversation.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {adoptions.map(adoption => (
                  <button
                    key={adoption.id}
                    onClick={() => openChat(adoption)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-left group"
                  >
                    <div className="relative shrink-0">
                      {adoption.animalImage ? (
                        <img src={adoption.animalImage} alt={adoption.animalName} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-white shadow-sm">🐾</div>
                      )}
                      {(adoption as any).hasUnreadRefuge && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-dark rounded-full border-2 border-white animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-text-dark truncate">{adoption.animalName}</h4>
                        <span className="text-[10px] font-bold text-gray-400 shrink-0">
                          {new Date(adoption.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 font-medium truncate">
                        Avec {adoption.user.name || adoption.user.email}
                      </p>
                      {(adoption as any).hasUnreadRefuge && (
                        <p className="text-[10px] text-primary-dark font-bold mt-1 uppercase tracking-wider italic">Nouveau message</p>
                      )}
                    </div>
                    <div className="text-gray-300 group-hover:text-primary-dark transition-colors shrink-0">
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Mes Animaux ── */}
        {activeTab === "animals" && (
          <div>
            {animals.length === 0 ? (
              <div className="text-center py-16 md:py-20 text-gray-400">
                <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-40" />
                <p className="font-medium text-base md:text-lg">Aucun animal enregistré.</p>
                <p className="text-xs md:text-sm mt-2">Ajoutez votre premier animal via l'onglet dédié.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {animals.map(animal => (
                  <div key={animal.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {animal.photos && Array.isArray(animal.photos) && (animal.photos as string[])[0] ? (
                      <img src={(animal.photos as string[])[0]} alt={animal.name} className="w-full h-40 md:h-44 object-cover" />
                    ) : (
                      <div className="w-full h-40 md:h-44 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl md:text-5xl">🐾</div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-text-dark">{animal.name}</h3>
                      <p className="text-gray-500 text-sm font-medium">{animal.species} {animal.breed ? `· ${animal.breed}` : ""}</p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {animal.age && <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">{animal.age}</span>}
                        {animal.gender && <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{animal.gender}</span>}
                        {animal.size && <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">{animal.size}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Ajouter un Animal ── */}
        {activeTab === "addAnimal" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-10 border border-gray-100">
              <h2 className="font-cursive text-2xl md:text-3xl font-bold text-text-dark mb-6 md:mb-8 text-center">Nouvel Animal</h2>
              {successMsg && <p className="text-green-600 font-medium text-sm text-center mb-6 bg-green-50 p-3 rounded-xl">{successMsg}</p>}
              <form onSubmit={handleAddAnimal} className="flex flex-col gap-4 md:gap-5">
                <input value={animalName} onChange={e => setAnimalName(e.target.value)} placeholder="Nom de l'animal *" required
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium transition-all text-sm md:text-base" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select value={animalSpecies} onChange={e => setAnimalSpecies(e.target.value)}
                    className="p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium text-sm md:text-base">
                    <option value="Dog">Chien</option>
                    <option value="Cat">Chat</option>
                    <option value="Rabbit">Lapin</option>
                    <option value="Other">Autre</option>
                  </select>
                  <input value={animalBreed} onChange={e => setAnimalBreed(e.target.value)} placeholder="Race"
                    className="p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium transition-all text-sm md:text-base" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select value={animalAge} onChange={e => setAnimalAge(e.target.value)}
                    className="p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium text-sm md:text-base">
                    <option value="Young">Jeune</option>
                    <option value="Adult">Adulte</option>
                    <option value="Senior">Sénior</option>
                  </select>
                  <select value={animalGender} onChange={e => setAnimalGender(e.target.value)}
                    className="p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium text-sm md:text-base">
                    <option value="Male">Mâle</option>
                    <option value="Female">Femelle</option>
                  </select>
                  <select value={animalSize} onChange={e => setAnimalSize(e.target.value)}
                    className="p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium text-sm md:text-base">
                    <option value="Small">Petit</option>
                    <option value="Medium">Moyen</option>
                    <option value="Large">Grand</option>
                  </select>
                </div>

                <textarea value={animalDescription} onChange={e => setAnimalDescription(e.target.value)} placeholder="Description de l'animal..."
                  rows={3} className="w-full p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium transition-all resize-none text-sm md:text-base" />

                <div className="space-y-3">
                  <p className="font-bold text-text-dark text-xs md:text-sm uppercase tracking-wide">Photos de l'animal</p>
                  
                  {/* Preview des photos */}
                  {animalPhotos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {animalPhotos.map((photo, index) => (
                        <div key={index} className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange}
                        className="hidden" 
                        id="photo-upload" 
                      />
                      <label 
                        htmlFor="photo-upload"
                        className="flex items-center justify-center gap-2 w-full p-3 md:p-4 rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-primary-dark hover:bg-gray-50 cursor-pointer transition-all text-sm font-medium text-gray-500"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Ajouter depuis PC
                      </label>
                    </div>
                    <input value={animalPhotoUrl} onChange={e => setAnimalPhotoUrl(e.target.value)} placeholder="Ou URL d'image"
                      className="w-full p-3 md:p-4 rounded-xl border border-gray-200 bg-white focus:border-primary-dark outline-none font-medium transition-all text-sm md:text-base" />
                  </div>
                </div>

                {/* Critères de matching */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100">
                  <p className="font-bold text-text-dark mb-4 text-[10px] md:text-sm uppercase tracking-wide">Critères de compatibilité</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    {[
                      { label: "Enfants", value: goodWithChildren, setter: setGoodWithChildren },
                      { label: "Chiens", value: goodWithDogs, setter: setGoodWithDogs },
                      { label: "Chats", value: goodWithCats, setter: setGoodWithCats },
                      { label: "Jardin requis", value: needsGarden, setter: setNeedsGarden },
                    ].map(item => (
                      <button type="button" key={item.label} onClick={() => item.setter(!item.value)}
                        className={`flex items-center gap-2.5 p-2.5 md:p-3 rounded-xl border-2 transition-all font-medium text-xs md:text-sm
                          ${item.value ? "border-primary bg-primary/10 text-text-dark" : "border-gray-200 text-gray-500"}`}
                      >
                        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-md flex items-center justify-center transition-all ${item.value ? "bg-primary text-white" : "bg-gray-200"}`}>
                          {item.value && <Check className="w-3 md:w-3.5 h-3 md:h-3.5" strokeWidth={3} />}
                        </div>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <select value={animalEnergy} onChange={e => setAnimalEnergy(e.target.value)}
                    className="mt-4 w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium text-xs md:text-sm">
                    <option value="Low">Énergie : Calme</option>
                    <option value="Medium">Énergie : Modérée</option>
                    <option value="High">Énergie : Élevée</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" className="w-full h-12 md:h-14 text-base md:text-lg font-bold shadow-md hover:scale-[1.02] transition-transform mt-2" disabled={submitting}>
                  {submitting ? "Ajout en cours..." : "Ajouter l'animal"}
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* ── Tab: Dossiers d'adoption ── */}
        {activeTab === "adoptions" && (
          <div className="space-y-4">
            {adoptions.length === 0 ? (
              <div className="text-center py-16 md:py-20 text-gray-400">
                <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-40" />
                <p className="font-medium text-base md:text-lg">Aucun dossier en cours.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {adoptions.map(adoption => {
                  const config = statusConfig[adoption.status] || statusConfig.pending;
                  const StatusIcon = config.icon;
                  return (
                    <div key={adoption.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        {adoption.animalImage ? (
                          <img src={adoption.animalImage} alt={adoption.animalName} className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center text-xl md:text-2xl shrink-0">🐾</div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-text-dark truncate">{adoption.animalName}</h3>
                            {(adoption as any).hasUnreadRefuge && (
                              <span className="w-2.5 h-2.5 bg-primary-dark rounded-full animate-pulse shrink-0" title="Nouveau message" />
                            )}
                          </div>
                          <p className="text-gray-500 text-xs md:text-sm font-medium truncate">Demandeur : {adoption.user.name || adoption.user.email}</p>
                          {adoption.user.phone && <p className="text-gray-400 text-[10px] md:text-xs">{adoption.user.phone}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold ${config.color}`}>
                          <StatusIcon className="w-3 h-3 md:w-3.5 md:h-3.5" /> {config.label}
                        </span>

                        <button onClick={() => openChat(adoption)}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary-dark text-[10px] md:text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-1.5">
                          <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5" /> Chat
                        </button>

                        <div className="flex gap-2 w-full md:w-auto">
                          {adoption.status === "pending" && (
                            <>
                              <button onClick={() => handleUpdateAdoption(adoption.id, "reviewing")}
                                className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold hover:bg-blue-100 transition-colors">
                                Examiner
                              </button>
                              <button onClick={() => handleUpdateAdoption(adoption.id, "approved")}
                                className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-[10px] md:text-xs font-bold hover:bg-green-100 transition-colors">
                                Approuver
                              </button>
                            </>
                          )}
                          {adoption.status === "reviewing" && (
                            <button onClick={() => handleUpdateAdoption(adoption.id, "approved")}
                              className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-[10px] md:text-xs font-bold hover:bg-green-100 transition-colors">
                              Approuver
                            </button>
                          )}
                          {(adoption.status === "approved" || adoption.status === "rejected") && (
                            <button onClick={() => handleDeleteAdoption(adoption.id)}
                              className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] md:text-xs font-bold hover:bg-gray-200 hover:text-gray-700 transition-colors">
                              Clôturer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Chat Modal ── */}
        {chatAdoption && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setChatAdoption(null)}>
            <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg h-[90vh] sm:max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
              {/* Chat Header */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex items-center gap-3 md:gap-4">
                <button onClick={() => setChatAdoption(null)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-dark truncate text-sm md:text-base">{chatAdoption.animalName}</h3>
                  <p className="text-gray-500 text-[10px] md:text-xs font-medium truncate">Avec {chatAdoption.user.name || chatAdoption.user.email}</p>
                </div>
                <MessageCircle className="w-5 h-5 text-primary-dark" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 min-h-0">
                {chatLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm">
                    <p>Aucun message. Démarrez la conversation !</p>
                  </div>
                ) : (
                  chatMessages.map(msg => {
                    const isRefuge = msg.senderType?.toUpperCase() === 'REFUGE';
                    return (
                      <div key={msg.id} className={`flex ${isRefuge ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[75%] px-3 md:px-4 py-2 md:py-2.5 rounded-2xl text-xs md:text-sm font-medium text-white ${
                          isRefuge 
                            ? 'bg-pink-500 rounded-br-md' 
                            : 'bg-green-600 rounded-bl-md'
                        }`}>
                          <p className="break-words">{msg.content}</p>
                          <p className="text-[9px] md:text-[10px] mt-1 text-white/70">
                            {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-gray-100 flex items-center gap-2 md:gap-3 bg-white">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Écrire un message..."
                  className="flex-1 p-2.5 md:p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-primary-dark outline-none font-medium text-xs md:text-sm transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-40 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
