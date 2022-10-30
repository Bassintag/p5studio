import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { LogLevel } from "./domain/LogLevel";

export enum SketchLogType {
  SETUP,
  DRAW,
}

export interface SketchLog {
  type: SketchLogType;
  level: LogLevel;
  timestamp: number;
  parts: unknown[];
}

export interface SketchSliceState {
  autoRefresh: boolean;
  background: string;
  collapseFooter: boolean;
  zoomAmount: number;
  translateAmount: [number, number];
  logs: Record<string, SketchLog[]>;
}

const initialState: SketchSliceState = {
  autoRefresh: true,
  collapseFooter: false,
  background: "white",
  zoomAmount: 1,
  translateAmount: [0, 0],
  logs: {},
};

const sketchSlice = createSlice({
  name: "sketch",
  initialState,
  reducers: {
    setSketchAutoRefresh: (state, { payload }: PayloadAction<boolean>) => {
      state.autoRefresh = payload;
    },
    setCollapseFooter: (state, { payload }: PayloadAction<boolean>) => {
      state.collapseFooter = payload;
    },
    setSketchBackground: (state, { payload }: PayloadAction<string>) => {
      state.background = payload;
    },
    addSketchLog: (
      state,
      {
        payload,
      }: PayloadAction<Omit<SketchLog, "timestamp"> & { sketchId: string }>
    ) => {
      const { sketchId, ...log } = payload;
      const withTimestamp: SketchLog = {
        ...log,
        timestamp: Date.now(),
      };
      if (state.logs) {
        if (state.logs[sketchId] == null) {
          state.logs[sketchId] = [withTimestamp];
        } else {
          state.logs[sketchId].unshift(withTimestamp);
        }
      }
    },
    clearSketchLogs: (state, { payload }: PayloadAction<string>) => {
      delete state.logs[payload];
    },
    setZoomAmount: (state, { payload }: PayloadAction<number>) => {
      state.zoomAmount = payload;
    },
    setTranslateAmount: (
      state,
      { payload }: PayloadAction<[number, number]>
    ) => {
      state.translateAmount = payload;
    },
  },
});

export const sketchReducer = persistReducer(
  {
    key: "p5:sketch",
    version: 1,
    storage,
    blacklist: ["files", "logs"],
  },
  sketchSlice.reducer
);

export const {
  addSketchLog,
  setCollapseFooter,
  clearSketchLogs,
  setSketchAutoRefresh,
  setSketchBackground,
  setZoomAmount,
  setTranslateAmount,
} = sketchSlice.actions;

export const selectSketchAutoRefresh = (state: RootState) =>
  state.sketch.autoRefresh;

export const selectSketchCollapseFooter = (state: RootState) =>
  state.sketch.collapseFooter;

export const selectSketchBackground = (state: RootState) =>
  state.sketch.background;

export const selectSketchZoomAmount = (state: RootState) =>
  state.sketch.zoomAmount;

export const selectSketchTranslateAmount = (state: RootState) =>
  state.sketch.translateAmount;

export const selectSketchLogs = (state: RootState, sketchId: string) =>
  state.sketch.logs[sketchId] ?? [];
