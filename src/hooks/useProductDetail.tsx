import { useEffect, useState } from "react";
import type { ShopifyProduct } from "../types/shopify";
import { getProductByHandle } from "../api/product-api";

export function useProductDetail(handle: string)
{
    const [product, setProduct] = useState<ShopifyProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        const fetchProductDetail = async () =>
        {
            try {
                setLoading(true);
                const productData = await getProductByHandle(handle);
                setProduct(productData)
            } catch (error) {
                setError(error instanceof Error ? error : new Error("An unknown error occurred"));
            }
            finally{
                setLoading(false);
            }
        }

        if(handle)
        {
            fetchProductDetail();
        }

    }, [handle])

    return {product, loading, error};
}