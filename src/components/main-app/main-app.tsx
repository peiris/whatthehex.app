"use client";

import Navigation from "@/components/navigation/navigation";
import Home from "@/components/home/home";
import Sidebar from "@/components/sidebar/sidebar";

const MainApp = () => {
  return (
    <>
      <Navigation />
      <Home />
      <Sidebar />
    </>
  );
};

export default MainApp;
