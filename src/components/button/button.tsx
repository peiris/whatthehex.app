"use client";

import { useState, CSSProperties, ReactNode } from "react";

interface ButtonProps {
  icon?: string;
  iconComponent?: ReactNode;
  text?: string;
  className?: string;
  isWide?: boolean;
  isSmall?: boolean;
  isExtraSmall?: boolean;
  isPrimary?: boolean;
  isReadOnly?: boolean;
  isPin?: boolean;
  isIconOnly?: boolean;
  isHover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const [icon, setIcon] = useState(props.icon);

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = props.isSmall
    ? "px-3 py-1.5 text-xs"
    : props.isExtraSmall
      ? "px-2 py-1 text-[10px]"
      : "";

  const wideClasses = props.isWide ? "w-full" : "";
  const primaryClasses = props.isPrimary ? "bg-[#0d51ff] text-white border-[#0d51ff] hover:bg-[#0a41cc]" : "";
  const readOnlyClasses = props.isReadOnly ? "pointer-events-none opacity-70" : "";
  const pinClasses = props.isPin ? "fixed top-5 right-5 z-50" : "";
  const iconOnlyClasses = props.isIconOnly ? "px-2" : "";

  const switchIconToFillIcon = () => {
    if (icon && props.isHover !== false) {
      const fillIcon = icon.replace("line", "fill");
      setIcon(fillIcon);
    }
  };

  const switchIconToLineIcon = () => {
    if (icon && props.isHover !== false) {
      const lineIcon = icon.replace("fill", "line");
      setIcon(lineIcon);
    }
  };

  return (
    <button
      onMouseEnter={switchIconToFillIcon}
      onMouseLeave={switchIconToLineIcon}
      onClick={props.onClick}
      className={`${baseClasses} ${sizeClasses} ${wideClasses} ${primaryClasses} ${readOnlyClasses} ${pinClasses} ${iconOnlyClasses} ${props.className || ""}`}
      style={props.style}
      disabled={props.disabled}
    >
      {props.iconComponent && props.iconComponent}
      {icon && <i className={`${icon}`}></i>}
      {props.text && <span>{props.text}</span>}
    </button>
  );
}

export default Button;
