"use client";

import React from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface AdoptionAwarenessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  animalName: string;
}

export default function AdoptionAwarenessModal({ isOpen, onClose, onConfirm, animalName }: AdoptionAwarenessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className="p-8 md:p-10">
              {/* Header Icon */}
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                <ShieldAlert className="w-10 h-10 text-primary-dark" />
              </div>

              {/* Text Content */}
              <div className="text-center space-y-4 mb-10">
                <h2 className="font-cursive text-3xl md:text-4xl font-bold text-text-dark">
                  Un engagement pour la vie
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Adopter <span className="text-primary-dark font-bold">{animalName}</span> est une décision magnifique, mais qui demande réflexion. Un animal n&apos;est pas un jouet, c&apos;est un être sensible.
                </p>
              </div>

              {/* Commitments List */}
              <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary-dark shrink-0" />
                  <p className="text-sm font-semibold text-gray-600 leading-snug">
                    Je m&apos;engage à lui offrir des soins, de la nourriture et beaucoup d&apos;amour au quotidien.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary-dark shrink-0" />
                  <p className="text-sm font-semibold text-gray-600 leading-snug">
                    Je promets de ne jamais l&apos;abandonner ni de le maltraiter, quelle que soit la situation.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary-dark shrink-0" />
                  <p className="text-sm font-semibold text-gray-600 leading-snug">
                    Je suis prêt(e) à assumer les responsabilités (vétérinaire, éducation, temps libre) pour toute sa vie.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={onConfirm}
                  variant="primary" 
                  className="w-full h-16 text-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all bg-secondary text-white"
                >
                  Je m&apos;engage et je continue
                </Button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors text-sm"
                >
                  Revenir en arrière
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
