import "./tooltip.scss";
import React from "react";

function Tooltip({ title, placement = "top", children }) {
  return (
    <div className={`custom-tooltip custom-tooltip--${placement}`}>
      {children}
      <span className="custom-tooltip__text">{title}</span>
    </div>
  );
}

export default Tooltip;
