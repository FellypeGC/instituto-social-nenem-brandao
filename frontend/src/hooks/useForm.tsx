import { useState, type SubmitEvent, type ReactElement } from "react";

export function useForm(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const changeStep = (i: number, e?: SubmitEvent) => {
    if (e) e.preventDefault();

    if (i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }

  return {
    currentStep,
    changeStep,
    currentComponent: steps[currentStep],
    isLastStep: currentStep + 1 === steps.length ? true : false,
  }
} 