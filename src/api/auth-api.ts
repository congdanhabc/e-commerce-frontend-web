import { storeFront } from "./shopify";

/** Đăng ký tài khoản mới trên Shopify */
export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  const variables = { input: { email, password, firstName, lastName } };

  try {
    const response = await storeFront(query, variables);
    return response.data.customerCreate;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw new Error("Không thể đăng ký khách hàng.");
  }
}

/** Đăng nhập tài khoản khách hàng Shopify */
export async function loginCustomer(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  const variables = { input: { email, password } };

  try {
    const response = await storeFront(query, variables);
    return response.data.customerAccessTokenCreate;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    throw new Error("Không thể đăng nhập khách hàng.");
  }
}
