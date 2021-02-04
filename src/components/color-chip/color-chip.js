import "./color-chip.scss";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/button/button";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToasts } from "react-toast-notifications";

function ColorChip({ isSidebar, ...props }) {
  const { addToast } = useToasts();
  let colorHex = props.colorHex || "000000";
  let colorName = props.colorName || "black";
  let colorNameType = props.colorNameType || "Exact name";
  let classNames = `color-chip`;
  let colorReturned = props.colorReturned || false;

  if (props.isSmall) {
    classNames += ` color-chip--sm`;
  }

  const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "rgb(0,0,0)",
      fontSize: 12,
    },
  }))(Tooltip);

  return (
    <div className={classNames}>
      <span
        className="color-chip__preview"
        style={{ backgroundColor: colorHex }}
      ></span>
      <div className="color-chip__data">
        {!isSidebar && (
          <CopyToClipboard
            text={colorName}
            onCopy={() => {
              addToast("Copied to clipboard", {
                appearance: "info",
                autoDismiss: true,
              });
            }}
          >
            <CustomTooltip
              title={"Click to Copy to Clipboard"}
              aria-label={colorName}
              placement="top"
            >
              <h2 className="color-chip__data__title">{colorName}</h2>
            </CustomTooltip>
          </CopyToClipboard>
        )}

        {isSidebar && <h2 className="color-chip__data__title">{colorName}</h2>}

        {!isSidebar ? (
          <CustomTooltip
            title={colorReturned}
            aria-label={colorReturned}
            placement="bottom-end"
          >
            <span className="color-chip__data__label">
              {colorNameType} <i className="ri-question-line"></i>
            </span>
          </CustomTooltip>
        ) : (
          <span
            className="color-chip__data__label"
            style={{ cursor: "pointer" }}
          >
            {colorNameType}
          </span>
        )}
      </div>
      {props.onClick && (
        <div className="color-chip__action">
          <Button isExtraSmall={true} text={"Remove"} onClick={props.onClick} />
        </div>
      )}
    </div>
  );
}

export default ColorChip;
