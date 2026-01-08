import { AppState, Action, ColorObject } from "./store";

const Reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        lang: action.payload as string,
      };
    case "SET_SELECTED_COLOR":
      return {
        ...state,
        selectedColor: action.payload as string,
      };
    case "SET_SELECTED_COLOR_OBJECT":
      return {
        ...state,
        selectedColorObj: action.payload as ColorObject,
      };
    case "SET_PICKER_VISIBILITY":
      return {
        ...state,
        isPickerVisible: action.payload as boolean,
      };
    case "SET_IS_COPIED_TO_CLIPBOARD":
      return {
        ...state,
        isCopiedToClipboard: action.payload as boolean,
      };
    case "SET_CLIPBOARD_TEXT":
      return {
        ...state,
        clipboardText: action.payload as string,
      };
    case "SET_SAVED_COLORS":
      return {
        ...state,
        savedColors: action.payload as ColorObject[],
      };
    case "SET_SIDEBAR_VISIBILITY":
      return {
        ...state,
        isSidebarOpen: action.payload as boolean,
      };
    case "SET_COLOR_PALETTE_VISIBILITY":
      return {
        ...state,
        showColorPalette: action.payload as boolean,
      };
    case "SET_CSS_CODE_VISIBILITY":
      return {
        ...state,
        showCssCODE: action.payload as boolean,
      };
    case "SET_SCSS_CODE_VISIBILITY":
      return {
        ...state,
        showScssCODE: action.payload as boolean,
      };
    case "SET_LESS_CODE_VISIBILITY":
      return {
        ...state,
        showLessCODE: action.payload as boolean,
      };
    case "SET_IS_SAVED_COLOR":
      return {
        ...state,
        isSavedColor: action.payload as boolean,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload as string,
      };
    default:
      return state;
  }
};

export default Reducer;
