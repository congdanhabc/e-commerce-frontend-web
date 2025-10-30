import { storeFront } from "./shopify";

export interface ShopifyCustomerAddress {
  address1: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  zip: string | null;
}

export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress?: ShopifyCustomerAddress;
}

export interface ShopifyCustomerUpdateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface CustomerUserError {
  field: string[] | null;
  message: string;
}

export interface ShopifyCustomerUpdateResult {
  customer: ShopifyCustomer | null;
  customerUserErrors: CustomerUserError[];
}

export async function fetchCustomerDetails(customerAccessToken: string): Promise<ShopifyCustomer | null> {
  const query = `
    query customerDetail($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        acceptsMarketing
        defaultAddress {
          address1
          city
          country
          phone
          zip
        }
      }
    }
  `;

  const variables = { customerAccessToken };

  try {
    const response = await storeFront(query, variables);
    return response.data.customer;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng:", error);
    throw new Error("Không thể lấy thông tin khách hàng.");
  }
}

export async function updateCustomerDetails(customerAccessToken: string, customer: ShopifyCustomerUpdateInput, newPassword?: string): Promise<ShopifyCustomerUpdateResult> {
  const customerUpdateInput: ShopifyCustomerUpdateInput = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
  };

  if (newPassword) {
    customerUpdateInput.password = newPassword;
  }

  const query = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  const variables = { customerAccessToken, customer: customerUpdateInput };

  try {
    const response = await storeFront(query, variables);
    return response.data.customerUpdate;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin khách hàng:", error);
    throw new Error("Không thể cập nhật thông tin khách hàng.");
  }
}
