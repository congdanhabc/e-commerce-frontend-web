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

export const PRODUCTS_LIST_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    descriptionHtml
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 5) {
      edges {
        node {
          url
          altText
        }
      }
    }
  }
`;

export type ProductsOptions = {
  collectionHandle?: string;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  sortKey?: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'RELEVANCE';
  reverse?: boolean;
  first?: number;
  last?: number; 
  after?: string;
  before?: string;
};

export async function getProducts(options: ProductsOptions = {}) {
  const filters: string[] = [];
  
  if (options.searchTerm) {
    filters.push(`(title:*${options.searchTerm}*)`);
  }
  if (options.minPrice) {
    filters.push(`(variants.price:>=${options.minPrice})`);
  }
  if (options.maxPrice) {
    filters.push(`(variants.price:<=${options.maxPrice})`);
  }

  const filterQueryString = filters.length > 0 ? `, query: "${filters.join(' AND ')}"` : '';

  const query = `
    query getProducts(
      $handle: String!, 
      $sortKey: ProductCollectionSortKeys, 
      $reverse: Boolean,
      $first: Int,
      $last: Int,
      $after: String,
      $before: String
    ) {
      collection(handle: $handle) {
        products(
          first: $first, 
          last: $last,
          after: $after, 
          before: $before,
          sortKey: $sortKey, 
          reverse: $reverse
          ${filterQueryString}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              ...ProductFragment
            }
          }
        }
      }
    }
    ${PRODUCTS_LIST_FRAGMENT}
  `;

  const variables = {
    handle: options.collectionHandle || 'all',
    sortKey: options.sortKey || 'RELEVANCE',
    reverse: options.reverse || false,
    first: options.before ? null : (options.first || 12),
    last: options.before ? (options.last || 12) : null,
    after: options.after || null,
    before: options.before || null,
  };
  
  try {
    const response = await storeFront(query, variables);
    console.log(response);
    return response.data?.collection?.products;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", { options, error });
    throw new Error("Không thể lấy danh sách sản phẩm.");
  }
}