import { type RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/notFound";
import HelloWorldPage from "./pages/helloWorld";
import ProductDetailPage from "./pages/productDetail";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children:[
            {
                path: "/helloWorld",
                element: <HelloWorldPage />,
            },
            {
                path: "/products/:handle",
                element: <ProductDetailPage />,
            }
        ],
    },
];

const router =  createBrowserRouter(routes);
export default router;