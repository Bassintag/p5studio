import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { loadSketch } from "../../services/sketchService";

export interface SketchSliceState {
  sketchNames?: string[];
}

const initialState: SketchSliceState = {
  sketchNames: [],
};

export const sketchSlice = createSlice({
  name: "sketch",
  initialState,
  reducers: {
    upsertSketches: (state, { payload }: PayloadAction<string[]>) => {
      if (state.sketchNames == null) {
        state.sketchNames = [];
      }
      for (const sketch of payload) {
        if (!state.sketchNames.includes(sketch)) {
          state.sketchNames.push(sketch);
        }
      }
      state.sketchNames.sort();
      for (const sketch of payload) {
        loadSketch(sketch);
      }
    },
  },
});

export const { upsertSketches } = sketchSlice.actions;

export const sketchReducer = sketchSlice.reducer;

export const selectSketches = (root: RootState) => root.sketches.sketchNames;
