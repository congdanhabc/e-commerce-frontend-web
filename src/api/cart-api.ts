import { storeFront } from "./shopify";
import type { ShopifyCart, ShopifyVariant } from "../types/shopify";

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount { 
        amount 
        currencyCode 
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
    
    buyerIdentity {
      email
      phone
      countryCode
      customer {
        id
        email
        firstName
        lastName
      }
    }
    # -------------------------
  }
`;


export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `;
  try {
    const response = await storeFront(query, { cartId });
    return response.data.cart;
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng (getCart):", error);
    return null;
  }
}

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

// Định nghĩa kiểu cho toàn bộ đối tượng `input` của mutation `cartCreate`
type CartInput = {
  lines: CartLineInput[];
  buyerIdentity?: { // `?` nghĩa là thuộc tính này là tùy chọn
    customerAccessToken: string;
  };
};
export async function createCart(lines: { merchandiseId: string; quantity: number }[], customerAccessToken?: string): Promise<ShopifyCart> {
  const query = `
    mutation createCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFragment
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  // Xây dựng đối tượng `input` một cách linh hoạt
  const input: CartInput = { lines }; // Bắt đầu với `lines`
  
  // Nếu có token, thêm `buyerIdentity` vào `input`
  if (customerAccessToken) {
    input.buyerIdentity = {
      customerAccessToken: customerAccessToken,
    };
  }
  
  const response = await storeFront(query, { input });
  return response.data.cartCreate.cart;
}


export async function addCartLines(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const query = `
    mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await storeFront(query, { cartId, lines });
  return response.data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart> {
  const query = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await storeFront(query, { cartId, lines });
  return response.data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const query = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await storeFront(query, { cartId, lineIds });
  return response.data.cartLinesRemove.cart;
}

type CheckoutLineEdge = {
  node: {
    id: string;
    quantity: number;
    variant: ShopifyVariant;
  };
};

export async function getCustomerCart(customerAccessToken: string): Promise<ShopifyCart | null> {
  const query = `
    query getCustomerCart($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        lastIncompleteCheckout {
          id
          webUrl
          totalQuantity
          lineItems(first: 50) {
            edges {
              node {
                id
                quantity
                variant {
                  id
                  title
                  price { amount, currencyCode }
                  image { url, altText }
                  product { title, handle }
                }
              }
            }
          }
          buyerIdentity {
            email
            phone
            countryCode
            customer {
              id
            }
          }
        }
      }
    }
  `;

  try {
    const response = await storeFront(query, { customerAccessToken });
    const checkout = response.data?.customer?.lastIncompleteCheckout;

    if (!checkout) {
      return null;
    }
  
    const cart: ShopifyCart = {
      id: checkout.id,
      checkoutUrl: checkout.webUrl,
      totalQuantity: checkout.totalQuantity,
      cost: { 
        subtotalAmount: { amount: '0', currencyCode: 'VND' },
        totalAmount: { amount: '0', currencyCode: 'VND' },
        totalTaxAmount: { amount: '0', currencyCode: 'VND' },
      },
      lines: {
        edges: checkout.lineItems.edges.map((edge: CheckoutLineEdge) => ({
          node: {
            id: edge.node.id,
            quantity: edge.node.quantity,
            merchandise: edge.node.variant as ShopifyVariant,
          }
        }))
      },
      buyerIdentity: checkout.buyerIdentity
    };
    return cart;

  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng của khách hàng (getCustomerCart):", error);
    return null;
  }
}

export async function associateCartToCustomer(
  cartId: string, 
  customerAccessToken: string
): Promise<ShopifyCart> {

  // Định nghĩa mutation `cartBuyerIdentityUpdate`
  const query = `
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  // Chuẩn bị các biến cho mutation
  const variables = {
    cartId: cartId,
    buyerIdentity: {
      customerAccessToken: customerAccessToken // <-- Thông tin xác thực người mua
    }
  };

  // Gọi API và xử lý kết quả
  try {
    const response = await storeFront(query, variables);

    const userErrors = response.data?.cartBuyerIdentityUpdate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error("Lỗi khi hợp nhất giỏ hàng (userErrors):", userErrors);
      throw new Error(userErrors[0].message || "Failed to associate cart with customer.");
    }

    return response.data.cartBuyerIdentityUpdate.cart;
    
  } catch (error) {
    console.error("Lỗi hệ thống khi gọi associateCartToCustomer:", error);
    throw error; // Ném lỗi ra ngoài để hook có thể bắt
  }
}

export async function applyDiscountCode(cartId: string, discountCodes: string[]): Promise<ShopifyCart> {
  const query = `
    mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await storeFront(query, { cartId, discountCodes });

  // Kiểm tra và ném lỗi nghiệp vụ từ Shopify
  const userErrors = response.data?.cartDiscountCodesUpdate?.userErrors;
  if (userErrors && userErrors.length > 0) {
    console.error("Lỗi khi áp dụng mã giảm giá (userErrors):", userErrors);
    throw new Error(userErrors[0].message || "Mã giảm giá không hợp lệ.");
  }

  return response.data.cartDiscountCodesUpdate.cart;
}