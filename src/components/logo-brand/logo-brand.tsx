"use client";

import Logo from "@/assets/logos/wthlogo.svg";
import LogoType from "@/assets/logos/wthlogotype.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const LogoBrand = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <section className="flex flex-col items-center gap-4 pt-12 pb-8">
      <Logo
        className="w-60"
        width={240}
        height={isMobile ? 48 : 60}
      />
      <LogoType height={isMobile ? 20 : 28} />
    </section>
  );
};

export default LogoBrand;
