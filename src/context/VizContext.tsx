'use client';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import type { AlgorithmModule, Frame } from '@/types/types';
import { moduleCategories } from '@/modules/modulesConfig';

const defaultModule = moduleCategories[1].subcategories[0].modules[0];

interface VizContextType {
  currentModule: AlgorithmModule;
  params: Record<string, number | string | boolean>;
  currentFrame: Frame;
  currentStep: number;
  selectModule: (mod: AlgorithmModule) => void;
  updateParam: (key: string, value: any) => void;
  play: () => void;
  pause: () => void;
  step: () => void;
  reset: () => void;
  isPlaying: boolean;
}

const VizContext = createContext<VizContextType>({} as VizContextType);
export const useViz = () => useContext(VizContext);

export const VizProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentModule, setModule] = useState<AlgorithmModule>(defaultModule);
  const [params, setParams] = useState(currentModule.defaultParams);
  const [currentFrame, setCurrentFrame] = useState<Frame>({
    state: currentModule.init(params),
    highlights: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const animationRef = useRef<number>(0);

  const selectModule = (mod: AlgorithmModule) => {
    setModule(mod);
    const newParams = mod.defaultParams;
    setParams(newParams);
    setCurrentFrame({ state: mod.init(newParams), highlights: [] });
    setCurrentStep(0);
    setPlaying(false);
  };

  const updateParam = (key: string, value: any) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    setCurrentFrame({ state: currentModule.reset(newParams), highlights: [] });
    setCurrentStep(0);
    setPlaying(false);
  };

  const step = () => {
    const frame = currentModule.step(currentFrame.state);
    if (frame) {
      setCurrentFrame(frame);
      setCurrentStep((s) => s + 1);
    } else {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = window.setInterval(step, 500);
    } else {
      clearInterval(animationRef.current);
    }
    return () => clearInterval(animationRef.current);
  }, [isPlaying]);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);
  const reset = () => {
    setCurrentFrame({ state: currentModule.reset(params), highlights: [] });
    setCurrentStep(0);
    setPlaying(false);
  };

  return (
    <VizContext.Provider
      value={{
        currentModule,
        params,
        currentFrame,
        currentStep,
        selectModule,
        updateParam,
        play,
        pause,
        step,
        reset,
        isPlaying,
      }}
    >
      {children}
    </VizContext.Provider>
  );
};
