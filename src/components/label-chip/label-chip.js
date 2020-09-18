import "./label-chip.scss";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
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

	const CustomTooltip = withStyles((theme) => ({
		tooltip: {
			backgroundColor: "rgb(0,0,0)",
			fontSize: 12,
		},
	}))(Tooltip);

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
					console.log({ copied: true });
				}}
			>
				<CustomTooltip title={`Click to Copy to Clipboard`} aria-label={label} placement="top">
					<span className="label-chip__value">{value}</span>
				</CustomTooltip>
			</CopyToClipboard>
		</div>
	);
}

export default LabelChip;
