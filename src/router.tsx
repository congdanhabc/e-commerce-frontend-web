import { type RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/notFound";
import HelloWorldPage from "./pages/helloWorld";
import ProductDetailPage from "./pages/product/productDetailPage";
import ProductListPage from "./pages/product/productListPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const routes: RouteObject[] = [
    {
        
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children:[
            {
                path: "/",
                element: <ProductListPage />,
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
                path: "/cart",
                element: <CartPage />,
            },
        ],
    },
];

const router =  createBrowserRouter(routes);
export default router;