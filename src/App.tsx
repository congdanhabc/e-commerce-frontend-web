import { Outlet, useNavigate } from "react-router-dom";
import { TopBanner } from "./components/shared/TopBanner";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("shopify_token");
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("shopify_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

   const handleLoginSuccess = (token: string) => {
    localStorage.setItem('shopify_token', token);
    setIsLoggedIn(true);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBanner />
      <Header isLoggedIn = {isLoggedIn} onLogout={handleLogout} />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 lg:px-10">
          <Outlet context={{ onLoginSuccess: handleLoginSuccess }} />
        </div>
      </main>

      <Footer />
    </div>
  )
}