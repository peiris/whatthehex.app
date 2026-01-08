"use client";

import { useContext, useRef } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Context } from "@/store";
import { generateColorDetails } from "@/functions/what-the-hex";
import Button from "@/components/button/button";

interface SearchInputProps {
  isHero?: boolean;
  selectedColor?: string | null;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchInput = (props: SearchInputProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useContext(Context);

  const handleChangeComplete = (color: ColorResult) => {
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

  const _onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEl.current) {
      dispatch({ type: "SET_SELECTED_COLOR", payload: inputEl.current.value });
      dispatch({
        type: "SET_SELECTED_COLOR_OBJECT",
        payload: generateColorDetails(inputEl.current.value),
      });
    }
    dispatch({ type: "SET_PICKER_VISIBILITY", payload: false });
  };

  const _onInputChange = (value: string) => {
    if (inputEl.current) {
      dispatch({
        type: "SET_SELECTED_COLOR_OBJECT",
        payload: generateColorDetails(inputEl.current.value),
      });
    }
    dispatch({ type: "SET_SELECTED_COLOR", payload: value });

    if (state.savedColors.filter((e) => e.requested === value).length > 0) {
      dispatch({ type: "SET_IS_SAVED_COLOR", payload: true });
    } else {
      dispatch({ type: "SET_IS_SAVED_COLOR", payload: false });
    }
  };

  const showPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "SET_PICKER_VISIBILITY",
      payload: !state.isPickerVisible,
    });
  };

  const _hidePicker = () => {
    dispatch({ type: "SET_PICKER_VISIBILITY", payload: false });
  };

  const formClasses = props.isHero
    ? "relative flex items-center w-full max-w-xl mx-auto"
    : "relative flex items-center";

  return (
    <form onSubmit={_onFormSubmit} className={formClasses}>
      <span className="absolute left-4 text-2xl font-bold text-black select-none">
        #
      </span>
      <input
        type="text"
        className="w-full h-14 pl-10 pr-14 text-xl font-semibold text-black bg-white border-2 border-black/10 rounded-xl outline-none transition-all focus:border-[#0d51ff] focus:ring-4 focus:ring-[#0d51ff]/20"
        placeholder="Enter your hex colour code"
        value={state.selectedColor || ""}
        ref={inputEl}
        onChange={(e) => _onInputChange(e.target.value)}
        onClick={_hidePicker}
      />

      <Button
        className="absolute right-2"
        iconComponent={
          <i className="ri-contrast-drop-line text-xl" />
        }
        isSmall={true}
        isIconOnly={true}
        onClick={showPicker}
      />

      {state.isPickerVisible && (
        <div className="absolute top-full mt-2 z-50 right-0">
          <span
            className="fixed inset-0 bg-transparent"
            onClick={_hidePicker}
          ></span>
          <div className="relative">
            <SketchPicker
              color={state.selectedColor || undefined}
              onChange={handleChangeComplete}
              disableAlpha={true}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchInput;
