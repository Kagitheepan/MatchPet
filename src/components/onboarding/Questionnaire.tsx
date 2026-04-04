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
      { label: "- 1 an", value: "<1" },
      { label: "1 - 4 ans", value: "1-4" },
      { label: "4 - 8 ans", value: "4-8" },
      { label: "8 ans ou +", value: "8+" },
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
    <div className="w-full flex-1 flex flex-col bg-bg-light md:bg-[#f6f7f5] p-6 md:p-12 overflow-hidden relative md:items-center md:justify-center min-h-[calc(100vh-80px)]">
      {/* Desktop Card Container */}
      <div className="w-full flex-1 flex flex-col md:flex-none md:w-full md:max-w-2xl md:bg-white md:rounded-[3rem] md:shadow-[0_15px_50px_rgba(0,0,0,0.04)] md:px-12 md:py-10 md:min-h-[550px] relative border border-transparent md:border-gray-50">
        
        {/* Progress header */}
        <div className="w-full flex justify-between items-center mb-8 relative z-10 p-2">
          <div className="flex gap-1.5 md:gap-2 w-full max-w-[200px] md:max-w-[250px]">
            {STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                  i === currentStepIndex ? 'bg-primary-dark w-6 md:w-8' : 
                  i < currentStepIndex ? 'bg-primary/60' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-gray-400 text-sm md:text-base">
            {currentStepIndex + 1} / {STEPS.length}
          </span>
        </div>

        <div className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col"
            >
              <h2 className="font-cursive text-4xl md:text-5xl font-bold text-text-dark mb-4 md:mb-6 leading-tight">{currentStep.question}</h2>
              <p className="text-gray-500 mb-8 md:mb-8 text-[15px] md:text-lg font-medium leading-relaxed max-w-lg">{currentStep.helperText}</p>
              
              <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar pb-6 mt-auto">
                  {currentStep.options.map((opt) => {
                    const isSelected = 
                      currentStep.type === "multiple" ? (answers[currentStep.id] as string[])?.includes(opt.value) : answers[currentStep.id] === opt.value;
                    
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`w-full p-4 md:p-5 text-left rounded-2xl md:rounded-[2rem] border-2 transition-all duration-200 flex items-center justify-between group
                          ${isSelected ? 'border-primary-dark bg-primary/10 shadow-sm md:scale-[1.02]' : 'border-gray-100 bg-white hover:border-primary-dark hover:bg-gray-50 md:hover:scale-[1.01]'}`}
                      >
                        <span className={`font-semibold text-lg md:text-xl ${isSelected ? 'text-primary-dark' : 'text-gray-600 group-hover:text-text-dark'}`}>
                          {opt.label}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                          ${isSelected ? 'border-primary-dark bg-primary-dark' : 'border-gray-300 group-hover:border-primary-dark'}
                          ${currentStep.type === "multiple" ? 'rounded-md' : 'rounded-full'}`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation bottom */}
        <div className="w-full pt-6 md:pt-8 mt-auto flex justify-between items-center bg-bg-light md:bg-white relative z-10 border-t md:border-t-0 border-gray-100">
          {currentStepIndex > 0 ? (
            <button 
              onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
              className="px-4 py-2 text-gray-400 font-bold flex items-center gap-1 hover:text-gray-600 transition-colors md:text-lg"
            >
              Retour
            </button>
          ) : <div />}
          
          <Button 
            variant="primary" 
            onClick={handleNext} 
            disabled={!canProceed || loading}
            className="px-8 shadow-md hover:shadow-lg transition-all h-[3.2rem] md:h-14 md:text-lg md:px-10 ml-auto"
          >
            {loading ? "Envoi..." : (currentStepIndex === STEPS.length - 1 ? "Terminer" : "Suivant")}
            {!loading && (currentStepIndex === STEPS.length - 1 ? <Check className="w-5 h-5 ml-2" /> : <ChevronRight className="w-5 h-5 ml-2" />)}
          </Button>
        </div>
      </div>
    </div>
  );
}
