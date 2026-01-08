import Providers from "./providers";
import MainApp from "@/components/main-app/main-app";

export default function Home() {
  return (
    <Providers>
      <MainApp />
    </Providers>
  );
}
