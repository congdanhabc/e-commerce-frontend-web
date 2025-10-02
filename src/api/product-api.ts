import { storeFront } from "./shopify";

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    descriptionHtml
    options(first: 3) {
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;


export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  try {
    const response = await storeFront(query,{ handle });
    
    if(!response.data.product)
    {
        console.warn(`Sản phẩm với handle "${handle}" không được tìm thấy.`);
        return null;
    }

    return response.data.product;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm với handle ${handle}:`, error);
    throw new Error("Không thể lấy dữ liệu sản phẩm.");
  }
}