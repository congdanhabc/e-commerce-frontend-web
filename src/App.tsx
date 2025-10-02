import { Outlet } from "react-router-dom";
import { TopBanner } from "./components/TopBanner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  return (
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
  )
}