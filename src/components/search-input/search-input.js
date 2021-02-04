import React, { useContext, useRef } from "react";
import { SketchPicker } from "react-color";
import { Context } from "../../store";
import { generateColorDetails } from "./../../functions/what-the-hex";
import Button from "./../button/button";
import "./search-input.scss";

const SearchInput = (props) => {
  const inputEl = useRef(null);
  const [state, dispatch] = useContext(Context);

  const handleChangeComplete = (color) => {
    let hex = color.hex;

    if (hex.charAt(0) === "#") {
      hex = hex.substr(1);
    }

    dispatch({ type: "SET_SELECTED_COLOR", payload: hex });
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(hex),
    });
  };

  const _onFormSubmit = (e) => {
    e.preventDefault();
    e.persist();
    dispatch({ type: "SET_SELECTED_COLOR", payload: inputEl.current.value });
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(inputEl.current.value),
    });
    dispatch({ type: "SET_PICKER_VISIBILITY", payload: false });
  };

  const _onInputChange = (value) => {
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(inputEl.current.value),
    });
    dispatch({ type: "SET_SELECTED_COLOR", payload: value });

    if (state.savedColors.filter((e) => e.requested === value).length > 0) {
      dispatch({ type: "SET_IS_SAVED_COLOR", payload: true });
    } else {
      dispatch({ type: "SET_IS_SAVED_COLOR", payload: false });
    }
  };

  const showPicker = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_PICKER_VISIBILITY",
      payload: !state.isPickerVisible,
    });
  };

  const _hidePicker = () => {
    dispatch({ type: "SET_PICKER_VISIBILITY", payload: false });
  };

  return (
    <form
      onSubmit={_onFormSubmit}
      className={`search-input ${props.isHero ? "search-input--hero" : ""}`}
    >
      <span className="search-input__prefix">#</span>
      <input
        type="text"
        className="form-control search-input__form-control"
        placeholder="Enter your hex colour code"
        value={state.selectedColor || ""}
        ref={inputEl}
        onChange={(e) => _onInputChange(e.target.value)}
        onClick={_hidePicker}
      />

      <Button
        className={"search-input__btn"}
        iconComponent={
          <i className="ri-contrast-drop-line" style={{ fontSize: 20 }} />
        }
        isSmall={true}
        isIconOnly={true}
        onClick={showPicker}
      />

      {state.isPickerVisible && (
        <div className="search-input--color-picker">
          <span className="search-input--overlay" onClick={_hidePicker}></span>
          <SketchPicker
            color={state.selectedColor}
            onChange={handleChangeComplete}
            disableAlpha={true}
          />
        </div>
      )}
    </form>
  );
};

export default SearchInput;
