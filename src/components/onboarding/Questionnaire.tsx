"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type QuestionType = "single" | "multiple";
interface Option { label: string; value: string; }
interface StepData {
  id: string;
  question: string;
  type: QuestionType;
  options: Option[];
  helperText: string;
}

const STEPS: StepData[] = [
  {
    id: "hasAnimals",
    question: "Avez-vous déjà des animaux à la maison ?",
    type: "single",
    options: [
      { label: "Oui, 1", value: "yes-1" },
      { label: "Oui, 2", value: "yes-2" },
      { label: "Oui, 3 ou +", value: "yes-3+" },
      { label: "Non", value: "no" },
    ],
    helperText: "Vous ne pouvez sélectionner qu'une seule réponse.",
  },
  {
    id: "hasChildren",
    question: "Avez-vous des enfants ou prévu d'en avoir ?",
    type: "single",
    options: [
      { label: "Oui, 1", value: "yes-1" },
      { label: "Oui, 2", value: "yes-2" },
      { label: "Oui, 3 ou +", value: "yes-3+" },
      { label: "Non", value: "no" },
      { label: "Non, mais c'est prévu", value: "planned" },
    ],
    helperText: "Vous ne pouvez sélectionner qu'une seule réponse.",
  },
  {
    id: "desiredAnimal",
    question: "Quel animal voudriez-vous adopter ?",
    type: "multiple",
    options: [
      { label: "Chien", value: "dog" },
      { label: "Chat", value: "cat" },
      { label: "Lapin", value: "rabbit" },
      { label: "Autre", value: "other" },
    ],
    helperText: "Vous pouvez sélectionner plusieurs réponses.",
  },
  {
    id: "desiredAge",
    question: "Quel âge doit avoir votre compagnon ?",
    type: "multiple",
    options: [
      { label: "Jeune", value: "Young" },
      { label: "Adulte", value: "Adult" },
      { label: "Sénior", value: "Senior" },
      { label: "Pas d'importance", value: "any" },
    ],
    helperText: "Vous pouvez sélectionner plusieurs réponses.",
  },
  {
    id: "hasGarden",
    question: "Avez-vous un jardin ?",
    type: "single",
    options: [
      { label: "Oui", value: "yes" },
      { label: "Non", value: "no" },
    ],
    helperText: "Certains animaux ont besoin de se dégourdir les pattes en extérieur.",
  }
];

export default function Questionnaire() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  
  const currentAnswer = answers[currentStep.id];
  const isMultiple = currentStep.type === "multiple";
  
  const canProceed = isMultiple 
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0 
    : !!currentAnswer;

  const handleSelect = (value: string) => {
    if (isMultiple) {
      const current = (answers[currentStep.id] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [currentStep.id]: current.filter(v => v !== value) });
      } else {
        setAnswers({ ...answers, [currentStep.id]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [currentStep.id]: value });
      // For single choice, we could potentially auto-advance, but keeping manual next is safer
    }
  };

  const handleNext = async () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setLoading(true);
      try {
        localStorage.setItem("matchpet_answers", JSON.stringify(answers));
        router.push(`/match`);
      } catch (err) {
        console.error("Error submitting profile:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-12 min-h-[calc(100vh-80px)]">
      
      <div className="w-full max-w-[480px]">
        
        {/* Main Green Container */}
        <div className="bg-primary rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl flex flex-col relative min-h-[500px] md:min-h-[550px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col flex-1 w-full"
            >
              <div className="flex-1 flex flex-col gap-8">
                {/* Question Box (Pink) */}
                <div className="bg-secondary-dark rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 shadow-md w-full">
                  <h2 className="font-cursive text-3xl md:text-4xl text-white font-bold leading-snug tracking-wide text-center">
                    {currentStep.question}
                  </h2>
                </div>

                {/* Options Box (Gray) */}
                <div className="bg-[#f0f2f0] rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 shadow-inner mt-auto mb-6 md:mb-8 w-full">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {currentStep.options.map((opt, index) => {
                      const isSelected = 
                        currentStep.type === "multiple" 
                          ? (answers[currentStep.id] as string[])?.includes(opt.value) 
                          : answers[currentStep.id] === opt.value;
                      
                      // For uneven option counts, make the last one span full width
                      const isLastAndOdd = currentStep.options.length % 2 !== 0 && index === currentStep.options.length - 1;
                      
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(opt.value)}
                          className={`py-3.5 px-3 rounded-full border-2 shadow-sm transition-all text-center flex items-center justify-center
                            ${isSelected ? 'bg-primary border-primary text-text-dark font-bold scale-[1.02]' : 'bg-white border-primary/40 text-text-dark font-medium hover:scale-[1.02]'}
                            ${isLastAndOdd ? 'col-span-2' : ''}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center w-full mt-auto relative">
            {currentStepIndex > 0 && (
              <button 
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="absolute left-2 text-text-dark font-medium text-sm underline opacity-70 hover:opacity-100 transition-opacity"
              >
                Retour
              </button>
            )}
            
            <button
               onClick={handleNext}
               disabled={!canProceed || loading}
               className="bg-[#eaa3a3] text-white font-cursive text-3xl px-12 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
               {loading ? "..." : (currentStepIndex === STEPS.length - 1 ? "Terminer" : "Suivant")}
            </button>
          </div>
        </div>

        {/* Helper Text Details (Outside) */}
        <p className="text-center mt-6 text-text-dark font-medium text-sm opacity-80">
          {currentStep.helperText}
        </p>
      </div>
    </div>
  );
}
