"use client";

import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

interface LabelChipProps {
  label?: string;
  value?: string;
  isLeftAlign?: boolean;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(0,0,0)",
    fontSize: 12,
  },
});

function LabelChip({
  label = "Label",
  value = "Value",
  isLeftAlign,
}: LabelChipProps) {
  const alignClasses = isLeftAlign ? "items-start" : "items-center";

  return (
    <div className={`flex flex-col ${alignClasses} gap-1`}>
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider select-none">
        {label}
      </label>

      <CopyToClipboard
        text={value}
        onCopy={() => {
          toast(`"${value}" Copied to clipboard`);
        }}
      >
        <CustomTooltip
          title="Click to Copy to Clipboard"
          aria-label={label}
          placement="top"
        >
          <span className="text-sm font-medium text-black cursor-pointer hover:text-[#0d51ff] transition-colors px-3 py-1.5 bg-gray-100 rounded-lg">
            {value}
          </span>
        </CustomTooltip>
      </CopyToClipboard>
    </div>
  );
}

export default LabelChip;
