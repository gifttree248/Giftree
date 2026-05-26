export const featuredProductsQuery = `
*[_type == "product" && isFeatured == true]{
  _id,
  title,
  shortDescription,
  description,
  "slug": slug.current,
  "image": images[0],
  "lifestyleImage": lifestyleImage,
  "internalViewImage": coalesce(internalViewImage, images[1]),
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  isFeatured,
  price
} | order(_createdAt desc)[0...6]
`;

export const categoriesPreviewQuery = `
*[_type == "category"] | order(name asc)[0...6]{
  _id,
  name,
  "slug": slug.current,
  description,
  image
}
`;

export const allCategoriesQuery = `
*[_type == "category"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  description,
  image
}
`;

export const allProductsQuery = `
*[_type == "product"] | order(_createdAt desc){
  _id,
  title,
  shortDescription,
  description,
  "slug": slug.current,
  "image": images[0],
  "lifestyleImage": lifestyleImage,
  "internalViewImage": coalesce(internalViewImage, images[1]),
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  isFeatured,
  price
}
`;

export const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  shortDescription,
  "slug": slug.current,
  description,
  images[],
  "category": category->{
    _id,
    name,
    "slug": slug.current,
    description
  },
  isFeatured,
  brochurePdf{
    asset->{
      url,
      originalFilename
    }
  }
}
`;

export const allProductSlugsQuery = `
*[_type == "product" && defined(slug.current)]{
  "slug": slug.current
}
`;

// Friendly aliases used by the app
export const getAllProducts = allProductsQuery;
export const getFeaturedProducts = featuredProductsQuery;
export const getProductBySlug = productBySlugQuery;
export const getCategories = categoriesPreviewQuery;
export const getAllCategories = allCategoriesQuery;

