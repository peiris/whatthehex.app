"use client";

import Button from "@/components/button/button";
import ColorChip from "@/components/color-chip/color-chip";
import LabelChip from "@/components/label-chip/label-chip";
import { generateColorDetails } from "@/functions/what-the-hex";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Context, ColorObject } from "@/store";

const ColorCard = () => {
  const [state, dispatch] = useContext(Context);
  const [colorType, setColorType] = useState<string>("");
  const [colorObj, setColorObj] = useState<ColorObject>(state.selectedColorObj);
  const [validColor, setValidColor] = useState(true);

  const isMobile = useMediaQuery("(max-width: 480px)");

  const digitCheck = (variable: string | undefined) => {
    if (variable !== undefined && variable.match(/^\d/)) {
      return `clr-${variable}`;
    } else {
      return variable;
    }
  };

  useEffect(() => {
    if (colorObj.message && colorObj.message === "Invalid hex code") {
      setValidColor(false);
    } else {
      setValidColor(true);
    }

    setColorType(colorObj.isExact ? "Exact color" : "Closest color");
  }, [colorObj]);

  useEffect(() => {
    setColorObj(state.selectedColorObj);
  }, [state.selectedColorObj]);

  const refreshColor = () => {
    const randomColor = "000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });

    dispatch({ type: "SET_SELECTED_COLOR", payload: randomColor });
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(randomColor),
    });
  };

  const saveColor = () => {
    const getLSsavedColors = [...state.savedColors];

    if (
      getLSsavedColors.filter(
        (e) => e.returned === state.selectedColorObj.returned
      ).length < 1
    ) {
      const updatedColorObject = {
        ...state.selectedColorObj,
        isSelected: true,
      };
      dispatch({
        type: "SET_SELECTED_COLOR_OBJECT",
        payload: updatedColorObject,
      });

      getLSsavedColors.push(state.selectedColorObj);
      dispatch({ type: "SET_SAVED_COLORS", payload: getLSsavedColors });
      localStorage.setItem("savedColors", JSON.stringify(getLSsavedColors));
    }

    dispatch({ type: "SET_SIDEBAR_VISIBILITY", payload: true });
  };

  const disableSaveButton = (colorObj: ColorObject) => {
    if (colorObj.isSelected || state.isSavedColor) {
      return true;
    } else {
      return false;
    }
  };

  if (validColor) {
    return (
      <article className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <ColorChip
            colorHex={colorObj.requested}
            colorName={colorObj.name}
            colorNameType={colorType}
            colorReturned={colorObj.returned}
            isInCard={true}
          />

          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button icon="ri-shuffle-line" onClick={refreshColor} />
            )}

            {!isMobile && !disableSaveButton(colorObj) && (
              <Button
                icon="ri-heart-add-line"
                text="Save"
                onClick={saveColor}
              />
            )}

            {!isMobile && disableSaveButton(colorObj) && (
              <Button
                icon="ri-check-double-fill"
                text="Saved"
                isReadOnly={true}
              />
            )}
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-4 ${isMobile ? "mb-4" : ""}`}
        >
          <LabelChip label="String" value={`${colorObj.variable}`} />
          <LabelChip label="RGB" value={`rgb(${colorObj.rgb})`} />
          <LabelChip
            label="CSS"
            value={`--${colorObj.variable}: ${
              colorObj.requested && colorObj.requested.charAt(0) === "#"
                ? colorObj.requested
                : `#${colorObj.requested}`
            }`}
          />
          <LabelChip
            label="SCSS"
            value={`$${digitCheck(colorObj.variable)}: ${
              colorObj.requested && colorObj.requested.charAt(0) === "#"
                ? colorObj.requested
                : `#${colorObj.requested}`
            }`}
          />
          <LabelChip
            label="LESS"
            value={`@${digitCheck(colorObj.variable)}: ${
              colorObj.requested && colorObj.requested.charAt(0) === "#"
                ? colorObj.requested
                : `#${colorObj.requested}`
            }`}
          />
        </div>

        {isMobile && (
          <div className="flex gap-2 mt-4">
            <Button
              icon="ri-shuffle-line"
              onClick={refreshColor}
              text="Random"
            />

            {!disableSaveButton(colorObj) && (
              <Button
                icon="ri-heart-add-line"
                text="Save"
                onClick={saveColor}
              />
            )}

            {disableSaveButton(colorObj) && (
              <Button
                icon="ri-check-double-fill"
                text="Saved"
                isReadOnly={true}
              />
            )}
          </div>
        )}
      </article>
    );
  } else {
    return (
      <article className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-2 text-red-500 py-8">
          <i className="ri-error-warning-fill text-2xl"></i>
          <span className="font-semibold">Invalid color code</span>
        </div>
      </article>
    );
  }
};

export default ColorCard;
