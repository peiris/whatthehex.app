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