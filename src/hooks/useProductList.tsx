import { useEffect, useState } from "react";
import type { ShopifyProductEdge } from "../types/shopify";
import { getProducts, type ProductsOptions } from "../api/product-api";

export function useProductList(options: ProductsOptions = {})
{
    const [products, setProducts] = useState<ShopifyProductEdge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        const fetchProductList = async () =>
        {
            try {
                setLoading(true);
                const response = await getProducts(options);
                console.log(response);
                if (response) {
                    setProducts(response.edges);
                }
            } catch (error) {
                setError(error instanceof Error ? error : new Error("An unknown error occurred"));
            }
            finally{
                setLoading(false);
            }
        }

        fetchProductList();

    }, [options])

    return {products, loading, error};
}