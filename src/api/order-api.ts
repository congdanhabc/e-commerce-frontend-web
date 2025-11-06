import { storeFront } from "./shopify";
import type { ShopifyOrder } from "../types/shopify";

type GetCustomerOrdersOptions = {
  customerAccessToken: string;
  first?: number;
  after?: string | null;
};

// Kiểu dữ liệu cho kết quả trả về, bao gồm cả pageInfo
type OrdersConnection = {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
  edges: { node: ShopifyOrder }[];
};

export async function getCustomerOrders({
  customerAccessToken,
  first = 10, // Mặc định 10 đơn hàng mỗi trang
  after = null
}: GetCustomerOrdersOptions): Promise<OrdersConnection | null> {
  const query = `
    query getCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await storeFront(query, { customerAccessToken, first, after });
    return response.data?.customer?.orders;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    throw new Error("Không thể lấy lịch sử đơn hàng.");
  }
}