import { safeSanityFetch } from "@/lib/sanity";
import { getAllProducts, getAllCategories } from "@/lib/queries";
import type { ProductListItem } from "@/types/product";
import type { Category } from "@/types/category";
import { ProductCatalog } from "@/components/ProductCatalog";

export const revalidate = 60;

type ProductResult = {
  _id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  slug: string;
  image: ProductListItem["images"][number] | null;
  lifestyleImage?: ProductListItem["lifestyleImage"];
  internalViewImage?: ProductListItem["internalViewImage"];
  category?: { _id: string; name: string; slug: string; description?: string };
  isFeatured?: boolean;
  price?: number | null;
};

type CategoryResult = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Category["image"];
};

type ProductsPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [products, categories]: [ProductResult[], CategoryResult[]] =
    await Promise.all([
      safeSanityFetch<ProductResult[]>(getAllProducts, {}, []),
      safeSanityFetch<CategoryResult[]>(getAllCategories, {}, []),
    ]);

  const mappedProducts: ProductListItem[] = products.map((p) => ({
    id: p._id,
    title: p.title,
    shortDescription: p.shortDescription,
    description: p.description,
    slug: p.slug,
    images: p.image ? [p.image] : [],
    lifestyleImage: p.lifestyleImage ?? undefined,
    internalViewImage: p.internalViewImage ?? undefined,
    category: p.category
      ? {
          id: p.category._id,
          name: p.category.name,
          slug: p.category.slug,
          description: p.category.description,
        }
      : undefined,
    isFeatured: p.isFeatured ?? false,
    price: p.price ?? undefined,
  }));

  const mappedCategories: Category[] = categories.map((c) => ({
    id: c._id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image ?? null,
  }));

  const resolvedSearchParams = (await searchParams) ?? {};
  const categoryParam = resolvedSearchParams.category;
  const initialSelectedCategorySlugs = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  return (
    <ProductCatalog
      products={mappedProducts}
      categories={mappedCategories}
      initialSelectedCategorySlugs={initialSelectedCategorySlugs}
    />
  );
}
