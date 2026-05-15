import type { Category } from "./category";

export type SanityImage = {
  _key?: string;
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
};

export type Product = {
  id: string;
  title: string;
  shortDescription?: string;
  slug: string;
  description?: string;
  images: SanityImage[];
  lifestyleImage?: SanityImage | null;
  internalViewImage?: SanityImage | null;
  category?: Category;
  isFeatured: boolean;
  price?: number | null;
  brochureUrl?: string;
  brochureFilename?: string;
};

export type ProductListItem = Pick<
  Product,
  | "id"
  | "title"
  | "shortDescription"
  | "slug"
  | "description"
  | "images"
  | "lifestyleImage"
  | "internalViewImage"
  | "category"
  | "isFeatured"
  | "price"
>;


