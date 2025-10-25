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
  collectionHandles?: string[];
  searchTerm?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortKey: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'BEST_SELLING' | 'RELEVANCE' | 'ID' | 'PRODUCT_TYPE' | 'UPDATED_AT' | 'VENDOR';
  reverse: boolean;
  first?: number;
  last?: number;
  after?: string;
  before?: string;
};

export async function getProducts(options: ProductsOptions = {sortKey: 'CREATED_AT', reverse: true}) {
  // 1. XÂY DỰNG CHUỖI `query` TỪ TẤT CẢ CÁC BỘ LỌC
  const filters: string[] = [];
  
  if (options.collectionHandles && options.collectionHandles.length > 0) {
    filters.push(`(${options.collectionHandles.map(h => `product_collection:'${h}'`).join(' OR ')})`);
  }
  if (options.tags && options.tags.length > 0) {
    filters.push(`(${options.tags.map(t => `tag:'${t}'`).join(' OR ')})`);
  }
  if (options.searchTerm) {
    filters.push(`(title:*${options.searchTerm}*)`);
  }
  if (options.minPrice) {
    filters.push(`(variants.price:>=${options.minPrice})`);
  }
  if (options.maxPrice) {
    filters.push(`(variants.price:<=${options.maxPrice})`);
  }
  
  const queryString = filters.join(' AND ');

  // 2. XÂY DỰNG TRUY VẤN GraphQL
  const query = `
    query getProducts(
      $query: String!,
      $sortKey: ProductSortKeys,
      $reverse: Boolean,
      $first: Int,
      $last: Int,
      $after: String,
      $before: String
    ) {
      products(
        first: $first,
        last: $last,
        after: $after,
        before: $before,
        query: $query,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node { ...ProductFragment }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  
  // 3. CHUẨN BỊ BIẾN VÀ GỌI API
  const variables = {
    query: queryString,
    sortKey: options.sortKey,
    reverse: options.reverse,
    first: options.before ? null : (options.first || 12),
    last: options.before ? (options.last || 12) : null,
    after: options.after ?? undefined,
    before: options.before ?? undefined,
  };
  
  try {
    const response = await storeFront(query, variables);
    return response.data?.products;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", { 
      queryStringSent: queryString, 
      variablesSent: variables, 
      errorReceived: error 
    });
    throw new Error("Không thể lấy danh sách sản phẩm.");
  }
}