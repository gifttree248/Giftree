"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductListItem, SanityImage } from "@/types/product";
import { urlFor } from "@/lib/sanity";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80";
const AUTO_ROTATE_MS = 3800;

type HeroBestSellersStackProps = {
  products: ProductListItem[];
};

function getMainImage(images: SanityImage[] | undefined) {
  if (!images || images.length === 0) return undefined;
  return images[0];
}

function formatPrice(price: number | null | undefined): string | null {
  if (price == null || Number.isNaN(price)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function HeroCard({
  product,
  imageUrl,
  priceStr,
  isActive,
  eagerLoad,
}: {
  product: ProductListItem;
  imageUrl: string | null;
  priceStr: string | null;
  isActive: boolean;
  eagerLoad: boolean;
}) {
  const mainImage = getMainImage(product.images);

  const content = (
    <>
      <Image
        src={imageUrl ?? FALLBACK_IMAGE}
        alt={mainImage?.alt || product.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        loading={eagerLoad ? "eager" : "lazy"}
        priority={eagerLoad}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f3d2e]/90 to-transparent p-4 text-white sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a46c]">
          Best Seller
        </p>
        <p className="mt-0.5 font-serif text-base font-semibold sm:text-lg">{product.title}</p>
        {priceStr ? (
          <p className="text-sm font-semibold">{priceStr}</p>
        ) : null}
        <Link
          href={`/products/${product.slug}`}
          className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-[#c9a46c] underline underline-offset-2 hover:text-[#c9a46c]/90"
        >
          View details →
        </Link>
      </div>
    </>
  );

  return (
    <div
      className={
        "absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-[#0f3d2e]/5 transition-opacity duration-700 ease-out " +
        (isActive ? "opacity-100" : "pointer-events-none opacity-0")
      }
      aria-hidden={!isActive}
    >
      {content}
    </div>
  );
}

export function HeroBestSellersStack({ products }: HeroBestSellersStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % products.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [products.length]);

  if (!products.length) {
    return (
      <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#0f3d2e]/5">
        <div className="flex h-full w-full items-center justify-center bg-[#F3EFE6] text-[#0f3d2e]/50">
          Best sellers will appear here
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full justify-center lg:justify-end">
      <div className="relative w-full max-w-xl">
        <div className="relative aspect-[4/3] w-full">
          {products.map((product, index) => {
            const mainImage = getMainImage(product.images);
            const imageUrl = mainImage?.asset
              ? urlFor(mainImage).width(900).height(675).url()
              : null;
            const isActive = index === currentIndex;
            const eagerLoad = index < 3;

            return (
              <HeroCard
                key={product.id}
                product={product}
                imageUrl={imageUrl}
                priceStr={formatPrice(product.price ?? null)}
                isActive={isActive}
                eagerLoad={eagerLoad}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
