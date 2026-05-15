import Link from "next/link";
import Image from "next/image";
import { safeSanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import {
  getFeaturedProducts,
  getCategories,
} from "@/lib/queries";
import type { ProductListItem } from "@/types/product";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 60;

type FeaturedProductResult = {
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

type CategoryPreviewResult = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: ProductListItem["images"][number] | null;
};

const STATIC_CATEGORIES = [
  { name: "Corporate Hampers", slug: "corporate-hampers", description: "Impress clients and teams with premium corporate gifting.", image: null },
  { name: "Festive Gifts", slug: "festive-gifts", description: "Celebrate every season with thoughtfully curated hampers.", image: null },
  { name: "Personalised Gifts", slug: "personalised", description: "One-of-a-kind keepsakes tailored to your recipient.", image: null },
  { name: "Luxury Gift Sets", slug: "luxury-gift-sets", description: "Elevated collections for the most discerning recipients.", image: null },
];

export default async function HomePage() {
  const [featuredProducts, categories]: [
    FeaturedProductResult[],
    CategoryPreviewResult[],
  ] = await Promise.all([
    safeSanityFetch<FeaturedProductResult[]>(getFeaturedProducts, {}, []),
    safeSanityFetch<CategoryPreviewResult[]>(getCategories, {}, []),
  ]);

  const mappedFeatured: ProductListItem[] = featuredProducts.map((p) => ({
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
    isFeatured: p.isFeatured ?? true,
    price: p.price ?? undefined,
  }));

  const displayCategories = categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <>
      <HeroSection featuredProducts={mappedFeatured} />

      {/* Featured Gift Collections */}
      <section className="bg-[#F3EFE6] pt-12 pb-10 sm:pt-20 sm:pb-12">
        <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#0f3d2e] sm:text-5xl">
                <span>Signature </span>
                <span className="font-serif font-normal italic text-[#c9a46c]">
                  Gifts
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#0f3d2e]/70 sm:text-base">
                The most loved and requested gifts chosen by top companies worldwide.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 items-center gap-2 border-b border-[#0f3d2e]/30 pb-2 text-sm font-semibold text-[#0f3d2e] transition-colors duration-200 hover:border-[#0f3d2e] hover:text-[#0a2f24] sm:inline-flex"
            >
              View All Products <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10 grid min-w-0 grid-cols-2 gap-4 sm:mt-14 sm:gap-8 lg:grid-cols-3">
            {mappedFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {mappedFeatured.length === 0 && (
              <div className="col-span-full rounded-2xl border border-[#0f3d2e]/10 bg-white/50 px-8 py-12 text-center">
                <p className="text-sm text-[#0f3d2e]/70">
                  Featured products will appear here once you add them in Sanity and mark them as featured.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#f5f2eb] pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-8 text-left sm:mb-12">
            <h2 className="font-serif text-3xl font-bold leading-[1.02] tracking-tight text-[#1a2e26] sm:text-5xl lg:text-6xl">
              <span className="block">Curated</span>
              <span className="block font-normal italic text-[#c5a36e]">
                Collections
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#666666] sm:mt-5 sm:text-base">
              Discover our thoughtfully categorized selections tailored for every corporate occasion, from onboarding to executive milestones.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-2 content-stretch gap-3 min-[769px]:gap-6 lg:grid-cols-3 lg:gap-6">
            {displayCategories.map((category) => {
              const imageUrl = category.image?.asset
                ? urlFor(category.image).width(1400).height(900).url()
                : null;
              return (
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.slug)}`}
                className="group relative block h-full min-h-0 min-w-0 overflow-hidden rounded-2xl bg-[#d9d2c4] ring-1 ring-[#0f3d2e]/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#0f3d2e]/20 max-[768px]:aspect-square min-[769px]:aspect-[4/3] min-[769px]:min-h-[200px]"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.image?.alt || category.name}
                    fill
                    sizes="(max-width: 768px) 48vw, (max-width: 1023px) 46vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#c4b49a_0%,#9fb09b_100%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 p-3 min-[769px]:p-5 min-[769px]:px-5 min-[769px]:pb-6 min-[769px]:pt-5 lg:p-6">
                  <span className="block line-clamp-2 font-serif text-[13px] font-semibold leading-tight tracking-tight text-white min-[400px]:text-sm min-[769px]:text-2xl min-[769px]:line-clamp-none lg:text-3xl">
                    {category.name}
                  </span>
                  <span className="mt-1 inline-flex max-w-full flex-wrap items-center gap-1 text-[9px] font-semibold uppercase leading-none tracking-[0.14em] text-white/90 min-[769px]:mt-2 min-[769px]:gap-2 min-[769px]:text-xs min-[769px]:tracking-[0.2em]">
                    Explore Collection
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Giftree */}
      <section id="vision" className="bg-[#F3EFE6] pt-10 pb-12 sm:pt-12 sm:pb-20">
        <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0f3d2e] sm:text-5xl">
              <span className="text-[#0f3d2e]">The Giftree </span>
              <span className="font-serif text-[#c9a46c] italic font-normal">
                Difference
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#0f3d2e]/70 sm:mt-5 sm:text-[1.12rem]">
              We don't just send gifts. We craft memorable experiences that strengthen your most valuable business relationships.
            </p>
          </div>

          <div className="mt-10 grid min-w-0 grid-cols-2 content-stretch gap-3 sm:mt-14 min-[769px]:grid-cols-12 min-[769px]:grid-rows-2 min-[769px]:gap-4">
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#0f3d2e]/10 bg-white p-4 sm:p-6 min-[769px]:col-span-8 min-[769px]:row-span-1 min-[769px]:rounded-3xl min-[769px]:p-8">
              <div className="mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f3d2e]/5 text-[#0f3d2e] sm:mb-4 min-[769px]:mb-5 min-[769px]:h-11 min-[769px]:w-11">
                <svg viewBox="0 0 24 24" className="h-5 w-5 min-[769px]:h-6 min-[769px]:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3 4.5 6v6c0 4.3 2.7 7.8 7.5 9 4.8-1.2 7.5-4.7 7.5-9V6L12 3Z" />
                  <path d="m9.5 12 1.8 1.8L14.8 10.3" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold tracking-tight text-[#0f3d2e] min-[520px]:text-lg min-[769px]:text-3xl">
                Uncompromising Quality
              </h3>
              <p className="mt-2 min-w-0 max-w-none text-[11px] leading-relaxed text-[#0f3d2e]/75 sm:mt-3 min-[769px]:max-w-2xl min-[769px]:text-base">
                Every item in our collection is rigorously tested and hand-selected from premium sustainable brands to ensure your gift leaves a lasting impression.
              </p>
            </div>

            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#0f3d2e]/10 bg-[#0f3d2e] p-4 sm:p-6 min-[769px]:col-span-4 min-[769px]:row-span-1 min-[769px]:rounded-3xl min-[769px]:p-8">
              <div className="mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c9a46c]/20 text-[#d7b87f] sm:mb-4 min-[769px]:mb-5 min-[769px]:h-11 min-[769px]:w-11">
                <svg viewBox="0 0 24 24" className="h-5 w-5 min-[769px]:h-6 min-[769px]:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3.5 7.5h17v11h-17z" />
                  <path d="M3.5 7.5 12 3l8.5 4.5" />
                  <path d="M12 3v15.5" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold tracking-tight text-white min-[520px]:text-lg min-[769px]:text-3xl">
                Bespoke Branding
              </h3>
              <p className="mt-2 min-w-0 text-[11px] leading-relaxed text-white/80 sm:mt-3 min-[769px]:text-base">
                Subtle, elegant customization that puts your brand forward without feeling like a promotional product.
              </p>
            </div>

            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-[#b8935b]/30 bg-[#c9a46c] p-4 sm:p-6 min-[769px]:col-span-4 min-[769px]:row-span-1 min-[769px]:rounded-3xl min-[769px]:p-8">
              <div className="mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f3d2e]/10 text-[#0f3d2e] sm:mb-4 min-[769px]:mb-5 min-[769px]:h-11 min-[769px]:w-11">
                <svg viewBox="0 0 24 24" className="h-5 w-5 min-[769px]:h-6 min-[769px]:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M3.5 12h17" />
                  <path d="M12 3.5c2.4 2.2 3.8 5.3 3.8 8.5S14.4 18.3 12 20.5c-2.4-2.2-3.8-5.3-3.8-8.5S9.6 5.7 12 3.5Z" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold tracking-tight text-[#0f3d2e] min-[520px]:text-lg min-[769px]:text-3xl">
                Global Logistics
              </h3>
              <p className="mt-2 min-w-0 text-[11px] leading-relaxed text-[#0f3d2e]/80 sm:mt-3 min-[769px]:text-base">
                Seamless worldwide delivery. You provide the addresses, we handle customs, tracking, and doorstep delivery.
              </p>
            </div>

            <div className="relative flex overflow-hidden rounded-2xl border border-[#0f3d2e]/10 bg-[radial-gradient(circle_at_25%_20%,#e8d7bb_0%,#d6b680_42%,#b98f4e_100%)] p-4 sm:p-6 min-[769px]:col-span-4 min-[769px]:row-span-1 min-[769px]:rounded-3xl min-[769px]:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.03)_65%)]" />
              <div className="relative flex min-h-[120px] w-full flex-1 flex-col items-center justify-center px-1 text-center min-[769px]:min-h-[210px]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-white/25 text-[#0f3d2e] backdrop-blur-sm min-[769px]:h-16 min-[769px]:w-16">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 min-[769px]:h-9 min-[769px]:w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 9h16v10H4z" />
                    <path d="M2.5 9h19" />
                    <path d="M12 4v15" />
                    <path d="M9.2 5.2C9.2 3.9 10.2 3 11.5 3c1.1 0 2 .9 2 2 0 1.7-1.5 2.2-2.5 2.2" />
                    <path d="M14.8 5.2c0-1.3-1-2.2-2.3-2.2-1.1 0-2 .9-2 2 0 1.7 1.5 2.2 2.5 2.2" />
                  </svg>
                </div>
                <p className="mt-2 max-w-[100%] text-[11px] font-medium leading-relaxed text-[#0f3d2e]/80 min-[769px]:mt-5 min-[769px]:max-w-xs min-[769px]:text-sm">
                  Curated stories in every box - from the first ribbon to the final reveal, each detail feels personal.
                </p>
              </div>
            </div>

            <div className="col-span-2 flex h-full min-h-0 min-w-0 flex-col rounded-2xl border border-[#0f3d2e]/10 bg-white p-4 sm:p-6 min-[769px]:col-span-4 min-[769px]:row-span-1 min-[769px]:rounded-3xl min-[769px]:p-8">
              <div className="mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0f3d2e]/5 text-[#0f3d2e] sm:mb-4 min-[769px]:mb-5 min-[769px]:h-11 min-[769px]:w-11">
                <svg viewBox="0 0 24 24" className="h-5 w-5 min-[769px]:h-6 min-[769px]:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12.5h5l2.1-6 3.2 12 2-6H20" />
                  <path d="M3 12h1" />
                  <path d="M20 12h1" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold tracking-tight text-[#0f3d2e] min-[520px]:text-lg min-[769px]:text-3xl">
                White-Glove Service
              </h3>
              <p className="mt-2 min-w-0 text-[11px] leading-relaxed text-[#0f3d2e]/75 sm:mt-3 min-[769px]:text-base">
                A dedicated concierge team guides you from curation to unboxing, ensuring zero stress and maximum delight.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
