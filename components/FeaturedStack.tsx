"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductListItem, SanityImage } from "@/types/product";
import { urlFor } from "@/lib/sanity";

type FeaturedStackProps = {
  products: ProductListItem[];
};

const STACK_OFFSET = 24;
const CARD_MAX_WIDTH = 340;

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

function StackCard({
  product,
  index,
  total,
  cardWidth,
  cardHeight,
}: {
  product: ProductListItem;
  index: number;
  total: number;
  cardWidth: number;
  cardHeight: number;
}) {
  const mainImage = getMainImage(product.images);
  const imageUrl =
    mainImage && mainImage.asset
      ? urlFor(mainImage).width(500).height(400).url()
      : null;
  const priceStr = formatPrice(product.price ?? null);

  const left = index * STACK_OFFSET;
  const top = index * STACK_OFFSET;
  const zIndex = index;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group absolute overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#0f3d2e]/5 transition-all duration-300 hover:z-[100] hover:-translate-y-1 hover:shadow-2xl"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        zIndex,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainImage?.alt || product.title}
            fill
            sizes="340px"
            className="object-cover transition duration-500 group-hover:scale-105 rounded-2xl"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#F3EFE6] text-sm text-[#0f3d2e]/40">
            Image coming soon
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-2xl pt-16 pb-4 pl-4 pr-4"
          style={{
            background: `linear-gradient(to top, #0f3d2e 0%, #0f3d2e 55%, transparent 100%)`,
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a46c]">
            Best Seller
          </p>
          <h3 className="mt-0.5 font-serif text-base font-bold tracking-tight text-white sm:text-lg">
            {product.title}
          </h3>
          {priceStr ? (
            <p className="mt-1 font-serif text-sm font-semibold text-white/90">
              {priceStr}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function FeaturedStack({ products }: FeaturedStackProps) {
  const displayProducts = products.slice(0, 5);
  const total = displayProducts.length;

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-[#0f3d2e]/10 bg-white/50 px-8 py-12 text-center">
        <p className="text-sm text-[#0f3d2e]/70">
          Featured products will appear here once you add them in Sanity and mark
          them as featured.
        </p>
      </div>
    );
  }

  const cardWidth = CARD_MAX_WIDTH - (total - 1) * STACK_OFFSET;
  const cardHeight = Math.round(cardWidth * (4 / 3));
  const containerWidth = CARD_MAX_WIDTH;
  const containerHeight = cardHeight + (total - 1) * STACK_OFFSET;

  return (
    <div
      className="relative w-full max-w-[min(340px,85vw)]"
      style={{
        height: `${containerHeight}px`,
      }}
    >
      {displayProducts.map((product, index) => (
        <StackCard
          key={product.id}
          product={product}
          index={index}
          total={total}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      ))}
    </div>
  );
}
