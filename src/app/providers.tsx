"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Store from "@/store";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Store>
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#000000",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "4px",
            padding: "4px 12px",
          },
        }}
      />
      {children}
    </Store>
  );
}
