import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Folder } from "../../../common/Document";
import { RootState } from "../../store";

export interface FilesSliceState {
  rootFolder?: Folder;
}

const initialState: FilesSliceState = {};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setRootFolder: (state, { payload }: PayloadAction<Folder>) => {
      state.rootFolder = payload;
    },
  },
});

export const filesReducer = filesSlice.reducer;

export const { setRootFolder } = filesSlice.actions;

export const selectRootFolder = (state: RootState) => state.files.rootFolder;
