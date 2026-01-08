"use client";

import { useContext, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Context } from "@/store";
import { generateColorDetails } from "@/functions/what-the-hex";
import ColorCard from "@/components/color-card/color-card";
import Footer from "@/components/footer/footer";
import HeroSearch from "@/components/hero-search/hero-search";
import LogoBrand from "@/components/logo-brand/logo-brand";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    const getSavedColors = JSON.parse(
      localStorage.getItem("savedColors") || "null"
    );
    if (getSavedColors !== null) {
      dispatch({ type: "SET_SAVED_COLORS", payload: getSavedColors });
    }
    const randomColor = "000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    dispatch({ type: "SET_SELECTED_COLOR", payload: randomColor });
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(randomColor),
    });

    if (!isTablet) {
      dispatch({ type: "SET_SIDEBAR_VISIBILITY", payload: true });
    }
  }, [dispatch, isTablet]);

  const sidebarOffset = state.isSidebarOpen && !isTablet ? "mr-80" : "";

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarOffset} ${isMobile ? "px-4" : ""}`}
    >
      <LogoBrand />
      <HeroSearch />
      <ColorCard />
      <Footer />
    </div>
  );
};

export default Home;
