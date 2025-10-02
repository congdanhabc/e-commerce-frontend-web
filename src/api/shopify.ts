type StorefrontApiVariables = {
  [key: string]: unknown;
};

export async function storeFront(query: string, variables: StorefrontApiVariables = {}) {
  const response = await fetch (
    `${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`,
    {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({query, variables}),
      cache: 'no-store',
    }
  );

  if(!response.ok){
    const errorBody = await response.text();
    console.log("Shopify Storefront API request failed:", errorBody);
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}