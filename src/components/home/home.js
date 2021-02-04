import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Context } from "store";
import { generateColorDetails } from "./../../functions/what-the-hex";
import ColorCard from "./../color-card/color-card";
import Footer from "./../footer/footer";
import HeroSearch from "./../hero-search/hero-search";
import LogoBrand from "./../logo-brand/logo-brand";
import "./home.scss";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });
  const isLegacyMobile = useMediaQuery({
    query: "(max-width: 320px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useEffect(() => {
    const getSavedColors = JSON.parse(localStorage.getItem("savedColors"));
    if (getSavedColors !== null) {
      dispatch({ type: "SET_SAVED_COLORS", payload: getSavedColors });
      // dispatch({ type: 'SET_SIDEBAR_VISIBILITY', payload: true });
    }
    let randomColor = "000000".replace(/0/g, function () {
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

  const handleChange = (value) => {
    dispatch({
      type: "SET_SELECTED_COLOR_OBJECT",
      payload: generateColorDetails(value),
    });
  };

  let className = `home`;
  if (isMobile) {
    className += ` is-mobile`;
  }
  if (isLegacyMobile) {
    className += ` is-legacy-mobile`;
  }
  if (state.isSidebarOpen && !isTablet) {
    className += ` is-sidebar-open`;
  }

  return (
    <div className={className}>
      <LogoBrand />
      <HeroSearch onChange={handleChange} />
      <ColorCard />
      <Footer />
    </div>
  );
};

export default Home;
