export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyPrice = {
  amount: string;
  currencyCode: string;
};

export type ShopifyOption = {
  name: string;
  values: string[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  options: ShopifyOption[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
};


export type ShopifyProductEdge = {
  node: ShopifyProduct;
};


export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            handle: string;
          };
          image: ShopifyImage;
        };
        cost: {
          totalAmount: ShopifyPrice;
        };
      };
    }[];
  };
};