"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/types/category";
import type { ProductListItem } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { getProductShortDescription } from "@/lib/productText";

type ProductCatalogProps = {
  products: ProductListItem[];
  categories: Category[];
  initialSelectedCategorySlugs?: string[];
};

const luxuryEase = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

const cardSlideUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
};

export function ProductCatalog({
  products,
  categories,
  initialSelectedCategorySlugs = [],
}: ProductCatalogProps) {
  const allowedCategorySlugs = useMemo(
    () => new Set(categories.map((c) => c.slug)),
    [categories],
  );

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(() => {
    const initial = initialSelectedCategorySlugs.find((slug) =>
      allowedCategorySlugs.has(slug),
    );
    return initial ?? null;
  });

  const filterItems = useMemo(
    () => [
      { slug: null as string | null, label: "All Products" },
      ...categories.map((c) => ({ slug: c.slug, label: c.name })),
    ],
    [categories],
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatch =
        selectedCategorySlug === null ||
        product.category?.slug === selectedCategorySlug;

      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;

      const searchableContent = [
        product.title,
        getProductShortDescription(product.shortDescription, product.description),
        product.category?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedQuery);
    });
  }, [products, selectedCategorySlug, searchQuery]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,#185c46_0%,#0f3d2e_46%,#0b2e23_100%)] pb-12 pt-24 sm:pb-22 sm:pt-32">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-[#d8b784]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#7cc2a7]/15 blur-3xl" />
        <div className="mx-auto min-w-0 max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-[#d8b784]/80 bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6d3ad]">
            Curated selection
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance font-sans text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">Explore Our Handpicked</span>
            <span className="mt-1 block text-[#e6d3ad] sm:mt-1.5">
              Gift Collections
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            Browse premium hampers, festive selections, and tailored gift
            sets—organized by category so you can find the right piece for
            every occasion.
          </p>
          <p className="mt-8 flex justify-center">
            <span className="inline-flex max-w-sm flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-sm text-white/60 sm:max-w-none sm:gap-x-2.5">
              <span>Handpicked quality</span>
              <span className="text-white/30" aria-hidden>
                &middot;
              </span>
              <span>Filter by category</span>
              <span className="text-white/30" aria-hidden>
                &middot;
              </span>
              <span>Custom &amp; corporate orders</span>
            </span>
          </p>
        </div>
      </section>

      <section className="bg-[#F3EFE6] pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 gap-6 lg:grid-cols-12 lg:gap-8">
            <aside className="lg:col-span-3">
              <div className="space-y-4 rounded-3xl border border-[#0f3d2e]/10 bg-white/85 p-4 shadow-[0_16px_40px_rgba(15,61,46,0.08)] backdrop-blur-sm sm:space-y-5 sm:p-5 lg:sticky lg:top-24">
                <div>
                  <p className="mb-3 text-lg font-semibold tracking-tight text-[#0f3d2e]">
                    Search
                  </p>
                  <label htmlFor="catalog-search" className="sr-only">
                    Search products
                  </label>
                  <input
                    id="catalog-search"
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-[#0f3d2e]/15 bg-white px-3.5 py-2.5 text-sm text-[#0f3d2e] outline-none ring-[#0f3d2e]/30 transition focus:ring-2"
                  />
                </div>

                <div>
                  <p className="mb-3 text-lg font-semibold tracking-tight text-[#0f3d2e]">
                    Categories
                  </p>
                  <div className="space-y-1.5">
                    {filterItems.map((item) => {
                      const slug = item.slug;
                      const isAll = slug === null;
                      const active = isAll
                        ? selectedCategorySlug === null
                        : selectedCategorySlug === slug;

                      return (
                        <button
                          key={slug ?? "all"}
                          type="button"
                          onClick={() =>
                            setSelectedCategorySlug(isAll ? null : slug)
                          }
                          className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                            active
                              ? "bg-[#0f5c3a] font-medium text-white"
                              : "text-[#0f3d2e]/75 hover:bg-[#0f3d2e]/6"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <p className="mb-5 text-xs font-light uppercase tracking-widest text-[#0f3d2e]/50 sm:mb-6">
                Showing {filteredProducts.length} of {products.length} pieces
              </p>

              <motion.div
                id="catalog-grid"
                key={`${selectedCategorySlug ?? "all"}-${searchQuery}`}
                className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredProducts.map((product) => {
                  return (
                    <motion.div
                      key={product.id}
                      variants={cardSlideUp}
                      className="min-w-0"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-[#0f3d2e]/10 bg-white/50 px-8 py-16 text-center">
              <p className="text-[#0f3d2e]/70">
                No products match your filters. Try choosing another category or
                view all.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
