import "./color-chip.scss";

import Tooltip from "components/tooltip/tooltip";
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

  return (
    <div className={classNames}>
      <span
        className="color-chip__preview"
        style={{
          backgroundColor:
            colorHex.charAt(0) === "#" ? colorHex : `#${colorHex}`,
        }}
      />
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
            <Tooltip title="Click to Copy to Clipboard" placement="top">
              <h2 className="color-chip__data__title">{colorName}</h2>
            </Tooltip>
          </CopyToClipboard>
        )}

        {isSidebar && <h2 className="color-chip__data__title">{colorName}</h2>}

        {!isSidebar ? (
          <Tooltip title={colorReturned} placement="bottom-end">
            <span className="color-chip__data__label">
              {colorNameType} <i className="ri-question-line"></i>
            </span>
          </Tooltip>
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
