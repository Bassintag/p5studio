import { Sketch } from "../../../../types";
import { createContext, useContext, useRef } from "react";

export interface SketchCanvasContextProps {
  sketch: Sketch;

  canvasRef: React.RefObject<HTMLDivElement>;
}

export const SketchCanvasContext =
  createContext<SketchCanvasContextProps | null>(null);

export interface SketchCanvasProviderProps {
  sketch: Sketch;

  children?: React.ReactNode;
}

export const SketchCanvasProvider = ({
  sketch,
  children,
}: SketchCanvasProviderProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <SketchCanvasContext.Provider
      value={{
        sketch,
        canvasRef,
      }}
    >
      {children}
    </SketchCanvasContext.Provider>
  );
};

export const useSketchCanvasContext = () =>
  useContext(SketchCanvasContext) as SketchCanvasContextProps;
