import { type RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/notFound";
import HelloWorldPage from "./pages/helloWorld";
import ProductDetailPage from "./pages/product/productDetailPage";
import ProductListPage from "./pages/product/productListPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfilePage from "./pages/profile/ProfilePage";
import ContactPage from "./pages/contact/ContactPage";
import OrderHistoryPage from "./pages/auth/OrderHistoryPage";
import ThankyouPage from "./pages/ThankyouPage";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/auth/ForgotPassword";

const routes: RouteObject[] = [
    {
        
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children:[
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/helloWorld",
                element: <HelloWorldPage />,
            },
            {
                path: "/products",
                element: <ProductListPage />,
            },
            {
                path: "/products/:handle",
                element: <ProductDetailPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
            {
                path: "/order",
                element: <OrderHistoryPage />,
            },
            {
                path: "/thank-you",
                element: <ThankyouPage />,
            },
        ],
    },
];

const router =  createBrowserRouter(routes);
export default router;