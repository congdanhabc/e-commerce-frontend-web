import { storeFront } from "./shopify";

export interface ShopifyCustomerAddress {
  id: string;
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

export interface ShopifyAddressUpdateInput {
  address1?: string;
  city?: string;
  country?: string;
  phone?: string;
  zip?: string;
}

export interface ShopifyAddressUpdateResult {
    customerAddress: {
        id: string;
        address1: string | null;
        city: string | null;
        country: string | null;
        zip: string | null;
        phone: string | null;
    } | null;
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
          id
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

export async function updateCustomerAddress(customerAccessToken: string, addressId: string, address: ShopifyAddressUpdateInput): Promise<ShopifyAddressUpdateResult> {
    const query = `
      mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
          customerAddress {
            id
            address1
            city
            country
            zip
            phone
          }
          customerUserErrors {
            message
          }
        }
      }
    `;

    const variables = { customerAccessToken, id: addressId, address };

    try {
      const response = await storeFront(query, variables);
      return response.data.customerAddressUpdate;
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ khách hàng:", error);
      throw new Error("Không thể cập nhật địa chỉ khách hàng.");
    }
}

export interface ShopifyAddressCreateResult {
    customerAddress: ShopifyCustomerAddress | null;
    customerUserErrors: CustomerUserError[];
}

export async function createCustomerAddress(customerAccessToken: string, address: ShopifyAddressUpdateInput): Promise<ShopifyAddressCreateResult> {
    const query = `
        mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
            customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
                customerAddress {
                    id
                    address1
                    city
                    country
                    zip
                    phone
                }
                customerUserErrors {
                    message
                }
            }
        }
    `;

    const variables = { customerAccessToken, address };

    try {
        const response = await storeFront(query, variables);
        return response.data.customerAddressCreate;
    } catch (error) {
        console.error("Lỗi khi tạo địa chỉ khách hàng:", error);
        throw new Error("Không thể tạo địa chỉ khách hàng.");
    }
}

export async function setDefaultCustomerAddress(customerAccessToken: string, addressId: string): Promise<any> {
    const query = `
        mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
            customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
                customer {
                    id
                }
                customerUserErrors {
                    message
                }
            }
        }
    `;

    const variables = { customerAccessToken, addressId };

    try {
        const response = await storeFront(query, variables);
        return response.data.customerDefaultAddressUpdate;
    } catch (error) {
        console.error("Lỗi khi đặt địa chỉ mặc định:", error);
        throw new Error("Không thể đặt địa chỉ mặc định.");
    }
}

