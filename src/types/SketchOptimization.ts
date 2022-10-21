export type SketchOptimizationOptions =
  | {
      type: "lineSimplify";
      tolerance?: string;
      layer?: string;
    }
  | {
      type: "reLoop";
      tolerance?: string;
      layer?: string;
    }
  | {
      type: "lineMerge";
      tolerance?: string;
      noFlip?: boolean;
      layer?: string;
    }
  | {
      type: "lineSort";
      noFlip?: boolean;
      twoOpt?: boolean;
      passes?: number;
      layer?: string;
    };

export type SketchOptimizationType = SketchOptimizationOptions["type"];

export type SketchOptimization =
  | SketchOptimizationType
  | SketchOptimizationOptions;
