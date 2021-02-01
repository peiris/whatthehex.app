import { ReactComponent as EmptyImage } from "assets/images/empty.svg";
import ColorChip from "components/color-chip/color-chip";
import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Context } from "store";
import "./sidebar.scss";

const Sidebar = () => {
  const [state, dispatch] = useContext(Context);
  const [sortState, setSortState] = useState([]);

  useEffect(() => {
    setSortState(state.savedColors);
  }, [state.savedColors]);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  let savedColorsCount = state.savedColors.length;
  let classNames = `sidebar`;
  if (isTablet) {
    classNames += ` is-tablet`;
  }
  if (state.isSidebarOpen) {
    classNames += ` sidebar--is-open`;
  }

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

  const handleButtonClick = (stateType) => {
    dispatch({ type: "SET_COLOR_PALETTE_VISIBILITY", payload: false });
    dispatch({ type: "SET_CSS_CODE_VISIBILITY", payload: false });
    dispatch({ type: "SET_SCSS_CODE_VISIBILITY", payload: false });
    dispatch({ type: stateType, payload: true });
  };

  const onClickSavedColorChip = (color) => {
    // console.log(color);
    let updatedColorObject = { ...color, isSelected: true };

    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: updatedColorObject,
    });
    dispatch({ type: "SET_SELECTED_COLOR", payload: color.requested });
  };

  const onClickColorChipAction = (e, color) => {
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

  const digitCheck = (variable) => {
    if (variable !== undefined && variable.match(/^\d/)) {
      return `clr-${variable}`;
    } else {
      return variable;
    }
  };

  const saveSortedList = () => {
    console.log("Update sorted list");
    console.log(sortState);
    // dispatch({ type: "SET_SAVED_COLORS", payload: sortState });
    // localStorage.setItem("savedColors", JSON.stringify(sortState));
  };

  // const reorder = (list, startIndex, endIndex) => {
  // 	const result = Array.from(list);
  // 	const [removed] = result.splice(startIndex, 1);
  // 	result.splice(endIndex, 0, removed);

  // 	return result;
  // };

  return (
    <div className={`${classNames}`}>
      {state.isSidebarOpen && isTablet && (
        <span className="sidebar__backdrop" onClick={hideTheSideBar}></span>
      )}

      <div className="sidebar__content">
        <div className="sidebar__header">
          <h2 className={"sidebar__heading"}>{heading}</h2>

          <div className="sidebar__tab-heading">
            <button
              className={state.showColorPalette ? "active" : ""}
              onClick={(e) => handleButtonClick("SET_COLOR_PALETTE_VISIBILITY")}
            >
              <i className="ri-stack-fill"></i>
            </button>

            <button
              className={state.showCssCODE ? "active" : ""}
              onClick={(e) => handleButtonClick("SET_CSS_CODE_VISIBILITY")}
            >
              CSS
            </button>

            <button
              className={state.showScssCODE ? "active" : ""}
              onClick={(e) => handleButtonClick("SET_SCSS_CODE_VISIBILITY")}
            >
              SASS
            </button>
          </div>
        </div>

        <div className="sidebar__body">
          {state.savedColors.length < 1 && (
            <div className={"sidebar__placeholder"}>
              <EmptyImage width={200} height={200} />
              <h4 className={"sidebar__placeholder__title"}>
                Much colors, such empty...
              </h4>
              <span className={"sidebar__placeholder__sub-title"}>
                Click on "Save" button to add colors
              </span>
            </div>
          )}

          {state.showColorPalette && state.savedColors.length > 0 && (
            <div className="sidebar--colors-list">
              {sortState.map((color, index) => (
                <div
                  key={index}
                  className={`color-chip-wrapper ${
                    state.selectedColor === color.requested && "is-active"
                  }`}
                  onClick={(e) => onClickSavedColorChip(color)}
                >
                  <ColorChip
                    colorHex={color.requested}
                    colorName={color.name}
                    colorNameType={color.requested}
                    isSmall={true}
                    onClick={(e) => onClickColorChipAction(e, color)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* {state.showColorPalette && state.savedColors.length > 0 && (
						<div className="sidebar--colors-list">
							{state.savedColors &&
								state.savedColors.map((color, index) => {
									return (
										<div key={index} className={`color-chip-wrapper ${state.selectedColor === color.requested && "is-active"}`} onClick={(e) => onClickSavedColorChip(color)}>
											<ColorChip colorHex={color.requested} colorName={color.name} colorNameType={color.requested} isSmall={true} onClick={(e) => onClickColorChipAction(e, color)} />
										</div>
									);
								})}
						</div>
					)} */}

          {state.showCssCODE && state.savedColors.length > 0 && (
            <div className="sidebar--code sidebar--code--css">
              <SyntaxHighlighter
                language="css"
                style={vs}
                showLineNumbers={false}
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
            <div className="sidebar--code sidebar--code--scss">
              <SyntaxHighlighter language="scss" style={vs}>
                {state.savedColors
                  .map((color) => {
                    let string = `$${digitCheck(color.variable)}: ${
                      color.requested
                    }; \n`;
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
