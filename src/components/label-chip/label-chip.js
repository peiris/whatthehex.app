import "./label-chip.scss";

import Tooltip from "components/tooltip/tooltip";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToasts } from "react-toast-notifications";

function LabelChip(props) {
  const { addToast } = useToasts();
  let label = props.label || "Label";
  let value = props.value || "Value";

  let className = `label-chip`;

  if (props.isLeftAlign) {
    className += ` label-chip--left-align`;
  }

  return (
    <div className={className}>
      <label className="label-chip__label noselect">{label}</label>

      <CopyToClipboard
        text={value}
        onCopy={() => {
          addToast(`"${value}" Copied to clipboard`, {
            appearance: "info",
            autoDismiss: true,
          });
        }}
      >
        <Tooltip title="Click to Copy to Clipboard" placement="top">
          <span className="label-chip__value">{value}</span>
        </Tooltip>
      </CopyToClipboard>
    </div>
  );
}

export default LabelChip;
