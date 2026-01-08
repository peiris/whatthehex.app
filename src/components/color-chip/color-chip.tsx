"use client";

import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Button from "@/components/button/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

interface ColorChipProps {
  colorHex?: string;
  colorName?: string;
  colorNameType?: string;
  colorReturned?: string;
  isSmall?: boolean;
  isSidebar?: boolean;
  isInCard?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(0,0,0)",
    fontSize: 12,
  },
});

function ColorChip({
  isSidebar,
  colorHex = "000000",
  colorName = "black",
  colorNameType = "Exact name",
  colorReturned = "",
  isSmall,
  onClick,
}: ColorChipProps) {
  const sizeClasses = isSmall ? "gap-2" : "gap-4";
  const previewSize = isSmall ? "w-10 h-10" : "w-16 h-16";
  const titleSize = isSmall ? "text-sm" : "text-2xl";

  return (
    <div className={`flex items-center ${sizeClasses}`}>
      <span
        className={`${previewSize} rounded-xl shadow-md flex-shrink-0`}
        style={{
          backgroundColor:
            colorHex.charAt(0) === "#" ? colorHex : `#${colorHex}`,
        }}
      />
      <div className="flex flex-col">
        {!isSidebar && (
          <CopyToClipboard
            text={colorName}
            onCopy={() => {
              toast("Copied to clipboard");
            }}
          >
            <CustomTooltip
              title="Click to Copy to Clipboard"
              aria-label={colorName}
              placement="top"
            >
              <h2
                className={`${titleSize} font-bold text-black cursor-pointer hover:text-[#0d51ff] transition-colors`}
              >
                {colorName}
              </h2>
            </CustomTooltip>
          </CopyToClipboard>
        )}

        {isSidebar && (
          <h2 className={`${titleSize} font-bold text-black truncate max-w-40`}>
            {colorName}
          </h2>
        )}

        {!isSidebar ? (
          <CustomTooltip
            title={colorReturned}
            aria-label={colorReturned}
            placement="bottom-end"
          >
            <span className="text-xs text-gray-400 cursor-help">
              {colorNameType} <i className="ri-question-line"></i>
            </span>
          </CustomTooltip>
        ) : (
          <span className="text-xs text-gray-400 cursor-pointer">
            {colorNameType}
          </span>
        )}
      </div>
      {onClick && (
        <div className="ml-auto">
          <Button isExtraSmall={true} text="Remove" onClick={onClick} />
        </div>
      )}
    </div>
  );
}

export default ColorChip;
