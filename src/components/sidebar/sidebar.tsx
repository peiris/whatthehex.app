"use client";

import EmptyImage from "@/assets/images/empty.svg";
import ColorChip from "@/components/color-chip/color-chip";
import { useContext, useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Context, ColorObject } from "@/store";

const Sidebar = () => {
  const [state, dispatch] = useContext(Context);
  const [sortState, setSortState] = useState<ColorObject[]>([]);

  useEffect(() => {
    setSortState(state.savedColors);
  }, [state.savedColors]);

  const isTablet = useMediaQuery("(max-width: 1024px)");

  const savedColorsCount = state.savedColors.length;

  let heading = null;
  if (state.showColorPalette) {
    heading = "Palette";
  }
  if (state.showCssCODE) {
    heading = "CSS";
  }
  if (state.showScssCODE) {
    heading = "SCSS";
  }
  if (state.showLessCODE) {
    heading = "LESS";
  }

  const handleButtonClick = (stateType: string) => {
    dispatch({ type: "SET_COLOR_PALETTE_VISIBILITY", payload: false });
    dispatch({ type: "SET_CSS_CODE_VISIBILITY", payload: false });
    dispatch({ type: "SET_SCSS_CODE_VISIBILITY", payload: false });
    dispatch({ type: "SET_LESS_CODE_VISIBILITY", payload: false });
    dispatch({ type: stateType, payload: true });
  };

  const onClickSavedColorChip = (color: ColorObject) => {
    let { requested } = color;

    if (requested && requested.charAt(0) === "#") {
      requested = requested.substr(1);
    }

    const updatedColorObject = { ...color, requested, isSelected: true };

    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: updatedColorObject,
    });
    dispatch({ type: "SET_SELECTED_COLOR", payload: requested });
  };

  const onClickColorChipAction = (
    e: React.MouseEvent,
    color: ColorObject
  ) => {
    e.stopPropagation();
    dispatch({ type: "SET_SELECTED_COLOR_OBJECT", payload: color });
    dispatch({ type: "SET_SELECTED_COLOR", payload: color.requested });

    const arrayOfSavedColors = state.savedColors;
    const filteredItems = arrayOfSavedColors.filter(function (item) {
      return item !== color;
    });

    dispatch({ type: "SET_SAVED_COLORS", payload: filteredItems });
    localStorage.setItem("savedColors", JSON.stringify(filteredItems));
  };

  const hideTheSideBar = () => {
    dispatch({ type: "SET_SIDEBAR_VISIBILITY", payload: false });
  };

  const digitCheck = (variable: string | undefined) => {
    if (variable !== undefined && variable.match(/^\d/)) {
      return `clr-${variable}`;
    } else {
      return variable;
    }
  };

  const sidebarClasses = state.isSidebarOpen
    ? "translate-x-0"
    : "translate-x-full";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transition-transform duration-300 ${sidebarClasses} ${isTablet ? "shadow-2xl" : ""}`}
    >
      {state.isSidebarOpen && isTablet && (
        <span
          className="fixed inset-0 bg-black/50 -z-10"
          onClick={hideTheSideBar}
        ></span>
      )}

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-black">{heading}</h2>

          <div className="flex gap-1">
            <button
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${state.showColorPalette ? "bg-[#0d51ff] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleButtonClick("SET_COLOR_PALETTE_VISIBILITY")}
            >
              <i className="ri-stack-fill"></i>
            </button>

            <button
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${state.showCssCODE ? "bg-[#0d51ff] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleButtonClick("SET_CSS_CODE_VISIBILITY")}
            >
              CSS
            </button>

            <button
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${state.showScssCODE ? "bg-[#0d51ff] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleButtonClick("SET_SCSS_CODE_VISIBILITY")}
            >
              SASS
            </button>

            <button
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${state.showLessCODE ? "bg-[#0d51ff] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => handleButtonClick("SET_LESS_CODE_VISIBILITY")}
            >
              LESS
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {state.savedColors.length < 1 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <EmptyImage width={200} height={200} className="opacity-50" />
              <h4 className="mt-4 text-lg font-bold text-gray-400">
                Much colors, such empty...
              </h4>
              <span className="text-sm text-gray-400">
                Click on &quot;Save&quot; button to add colors
              </span>
            </div>
          )}

          {state.showColorPalette && state.savedColors.length > 0 && (
            <div className="flex flex-col gap-2">
              {sortState.map((color, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl cursor-pointer transition-colors ${state.selectedColor === color.requested ? "bg-[#0d51ff]/10 ring-2 ring-[#0d51ff]" : "bg-gray-50 hover:bg-gray-100"}`}
                  onClick={() => onClickSavedColorChip(color)}
                >
                  <ColorChip
                    colorHex={color.requested}
                    colorName={color.name}
                    colorNameType={color.requested}
                    isSmall={true}
                    onClick={(e) => onClickColorChipAction(e, color)}
                    isSidebar={true}
                  />
                </div>
              ))}
            </div>
          )}

          {state.showCssCODE && state.savedColors.length > 0 && (
            <div className="rounded-xl overflow-hidden bg-gray-50">
              <SyntaxHighlighter
                language="css"
                style={vs}
                showLineNumbers={false}
                customStyle={{ background: "transparent", padding: "1rem" }}
              >
                {`:root {\n${state.savedColors
                  .map((color, index) => {
                    if (savedColorsCount === index + 1) {
                      return `  --${color.variable}: ${color.requested};`;
                    } else {
                      return `  --${color.variable}: ${color.requested};\n`;
                    }
                  })
                  .join("")}\n}`}
              </SyntaxHighlighter>
            </div>
          )}

          {state.showScssCODE && state.savedColors.length > 0 && (
            <div className="rounded-xl overflow-hidden bg-gray-50">
              <SyntaxHighlighter
                language="scss"
                style={vs}
                customStyle={{ background: "transparent", padding: "1rem" }}
              >
                {state.savedColors
                  .map((color) => {
                    const string = `$${digitCheck(color.variable)}: ${color.requested}; \n`;
                    return string;
                  })
                  .join("")}
              </SyntaxHighlighter>
            </div>
          )}

          {state.showLessCODE && state.savedColors.length > 0 && (
            <div className="rounded-xl overflow-hidden bg-gray-50">
              <SyntaxHighlighter
                language="less"
                style={vs}
                customStyle={{ background: "transparent", padding: "1rem" }}
              >
                {state.savedColors
                  .map((color) => {
                    const string = `@${digitCheck(color.variable)}: ${color.requested}; \n`;
                    return string;
                  })
                  .join("")}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
