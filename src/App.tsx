import { Outlet } from "react-router-dom";
import { TopBanner } from "./components/shared/TopBanner";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { AppProviders } from "./providers/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <div className="flex min-h-screen flex-col bg-white">
        <TopBanner />
        <Header />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 lg:px-10">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </AppProviders>
  );
}
