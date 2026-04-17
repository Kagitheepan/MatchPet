"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdoptionAwarenessModal from './AdoptionAwarenessModal';

export default function HomeMatcherButton() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setShowModal(false);
    router.push('/onboarding');
  };

  return (
    <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-20">
      <button 
        onClick={() => setShowModal(true)}
        className="bg-secondary-dark text-white font-cursive text-3xl md:text-4xl px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform border border-white/20 hover:shadow-xl"
      >
        Matcher !
      </button>

      <AdoptionAwarenessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        animalName="un compagnon"
      />
    </div>
  );
}
