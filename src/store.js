import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
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
  error: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
