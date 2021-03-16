const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        lang: action.payload
      };
    case 'SET_SELECTED_COLOR':
      return {
        ...state,
        selectedColor: action.payload
      };
    case 'SET_SELECTED_COLOR_OBJECT':
      return {
        ...state,
        selectedColorObj: action.payload
      };
    case 'SET_PICKER_VISIBILITY':
      return {
        ...state,
        isPickerVisible: action.payload
      };
    case 'SET_IS_COPIED_TO_CLIPBOARD':
      return {
        ...state,
        isCopiedToClipboard: action.payload
      };
    case 'SET_CLIPBOARD_TEXT':
      return {
        ...state,
        clipboardText: action.payload
      };
    case 'SET_SAVED_COLORS':
      return {
        ...state,
        savedColors: action.payload
      };
    case 'SET_SIDEBAR_VISIBILITY':
      return {
        ...state,
        isSidebarOpen: action.payload
      };
    case 'SET_COLOR_PALETTE_VISIBILITY':
      return {
        ...state,
        showColorPalette: action.payload
      };
    case 'SET_CSS_CODE_VISIBILITY':
      return {
        ...state,
        showCssCODE: action.payload
      };
    case 'SET_SCSS_CODE_VISIBILITY':
      return {
        ...state,
        showScssCODE: action.payload
      };
    case 'SET_LESS_CODE_VISIBILITY':
      return {
        ...state,
        showLessCODE: action.payload
      };
    case 'SET_IS_SAVED_COLOR':
      return {
        ...state,
        isSavedColor: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;