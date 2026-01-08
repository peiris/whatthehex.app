"use client";

import { useContext } from "react";
import { Context } from "@/store";
import { generateColorDetails } from "@/functions/what-the-hex";
import Hint from "@/components/hint/hint";
import SearchInput from "@/components/search-input/search-input";

const HeroSearch = () => {
  const [, dispatch] = useContext(Context);

  const handleChange = (value: string) => {
    dispatch({ type: "SET_SELECTED_COLOR", payload: value });
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(value),
    });
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <SearchInput isHero={true} onChange={handleChange} />
      <Hint />
    </div>
  );
};

export default HeroSearch;
