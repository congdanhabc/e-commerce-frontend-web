import { storeFront } from "./shopify";
import type { ShopifyCart } from "../types/shopify";

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

export async function getCartSummary(cartId: string): Promise<{ totalQuantity: number } | null> {
  // 1. ĐỊNH NGHĨA MỘT TRUY VẤN RẤT NHẸ
  // Chỉ yêu cầu đúng một trường dữ liệu: `totalQuantity`
  const query = `
    query getCartSummary($cartId: ID!) {
      cart(id: $cartId) {
        id
        totalQuantity
      }
    }
  `;

  // 2. GỌI API VÀ XỬ LÝ
  try {
    const response = await storeFront(query, { cartId });
    // Dùng optional chaining `?.` để đảm bảo an toàn nếu `data` hoặc `cart` là null
    return response.data?.cart;
  } catch (error) {
    console.error("Lỗi khi lấy tóm tắt giỏ hàng (getCartSummary):", error);
    return null;
  }
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
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
  const response = await storeFront(query, { input: { lines } });
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