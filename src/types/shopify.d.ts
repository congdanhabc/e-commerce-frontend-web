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

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type ShopifyCustomerInCart = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number; 
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null; 
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: ShopifyPrice
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
  buyerIdentity: {
    email: string | null;
    phone: string | null;
    countryCode: string | null;
    customer: ShopifyCustomerInCart | null;
  };
};

export interface CustomerUserError {
  field: string[] | null;
  message: string;
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

// Kiểu dữ liệu cho toàn bộ phản hồi của mutation đăng nhập
export interface LoginResult {
  customerAccessToken: CustomerAccessToken | null;
  customerUserErrors: CustomerUserError[];
}