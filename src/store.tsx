"use client";

import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import Reducer from "./reducer";

export interface ColorObject {
  id?: number;
  requested: string;
  returned?: string;
  isExact?: boolean;
  name?: string;
  rgb?: number[];
  variable?: string;
  message?: string;
  isSelected?: boolean;
}

export interface AppState {
  lang: string;
  selectedColor: string | null;
  selectedColorObj: ColorObject;
  isPickerVisible: boolean;
  isCopiedToClipboard: boolean;
  clipboardText: string | null;
  savedColors: ColorObject[];
  isSavedColor: boolean;
  isSidebarOpen: boolean;
  showColorPalette: boolean;
  showCssCODE: boolean;
  showScssCODE: boolean;
  showLessCODE: boolean;
  error: string | null;
}

export interface Action {
  type: string;
  payload?: unknown;
}

const initialState: AppState = {
  lang: "en",
  selectedColor: null,
  selectedColorObj: {
    requested: "",
    isExact: false,
    variable: "",
  },
  isPickerVisible: false,
  isCopiedToClipboard: false,
  clipboardText: null,
  savedColors: [],
  isSavedColor: false,
  isSidebarOpen: false,
  showColorPalette: true,
  showCssCODE: false,
  showScssCODE: false,
  showLessCODE: false,
  error: null,
};

interface StoreProps {
  children: ReactNode;
}

export const Context = createContext<[AppState, Dispatch<Action>]>([
  initialState,
  () => null,
]);

const Store = ({ children }: StoreProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Store;
