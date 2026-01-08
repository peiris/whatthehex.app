"use client";

import HintIcon from "@/assets/icons/hint.svg";

const Hint = () => {
  return (
    <label className="flex items-center gap-2 text-xs text-gray-400 mt-3">
      <HintIcon className="w-4 h-4 opacity-50" />
      <span>Type or Pick a color from picker</span>
    </label>
  );
};

export default Hint;
