"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ProductListItem, SanityImage } from "@/types/product";
import { urlFor } from "@/lib/sanity";
import { getProductShortDescription } from "@/lib/productText";

type ProductCardProps = {
  product: ProductListItem;
  layout?: "default" | "featured";
};

const luxuryEase = [0.22, 1, 0.36, 1] as const;

function getMainImage(images: SanityImage[] | undefined) {
  if (!images || images.length === 0) return undefined;
  return images[0];
}

function imageUrl(img: SanityImage | undefined, width: number, height: number) {
  return img?.asset ? urlFor(img).width(width).height(height).url() : null;
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

export function ProductCard({ product, layout = "default" }: ProductCardProps) {
  const mainImage = getMainImage(product.images);
  const isFeaturedLayout = layout === "featured";
  const lifestyle = product.lifestyleImage;
  const displayImage =
    isFeaturedLayout && lifestyle?.asset ? lifestyle : mainImage;
  const secondaryRaw = product.internalViewImage ?? product.images?.[1];
  const secondaryImage =
    secondaryRaw &&
    secondaryRaw.asset?._ref !== displayImage?.asset?._ref
      ? secondaryRaw
      : undefined;

  const primaryUrl = displayImage
    ? imageUrl(
        displayImage,
        isFeaturedLayout ? 1200 : 600,
        isFeaturedLayout ? 750 : 480,
      )
    : null;
  const secondaryUrl = secondaryImage
    ? imageUrl(
        secondaryImage,
        isFeaturedLayout ? 1200 : 600,
        isFeaturedLayout ? 750 : 480,
      )
    : null;

  const priceStr = formatPrice(product.price ?? null);
  const productSubtitle = getProductShortDescription(
    product.shortDescription,
    product.description,
  );
  const hasCrossfade = Boolean(primaryUrl && secondaryUrl);
  const sizes = isFeaturedLayout
    ? "(min-width: 1280px) 66vw, (min-width: 640px) 100vw, 100vw"
    : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw";

  const aspectClass = isFeaturedLayout
    ? "aspect-[16/10] sm:aspect-[5/3]"
    : "aspect-[4/3]";

  const [imageHovered, setImageHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-white/70 ring-1 ring-[#0f3d2e]/10 transition-[box-shadow,background-color] duration-500 hover:bg-white hover:ring-[#0f3d2e]/18"
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      <div
        className={`relative w-full min-h-0 overflow-hidden bg-[#F3EFE6] ${aspectClass}`}
      >
        {primaryUrl ? (
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity:
                  hasCrossfade && imageHovered
                    ? 0
                    : 1,
                scale: imageHovered ? 1.03 : 1,
              }}
              transition={{ duration: 0.48, ease: luxuryEase }}
            >
              <Image
                src={primaryUrl}
                alt={
                  displayImage?.alt || mainImage?.alt || product.title
                }
                fill
                sizes={sizes}
                className="h-full w-full object-cover"
              />
            </motion.div>
            {secondaryUrl ? (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={false}
                animate={{
                  opacity:
                    hasCrossfade && imageHovered ? 1 : 0,
                  scale: imageHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.48, ease: luxuryEase }}
              >
                <Image
                  src={secondaryUrl}
                  alt={
                    secondaryImage?.alt ||
                    `${product.title} — detail`
                  }
                  fill
                  sizes={sizes}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#0f3d2e]/40">
            Image coming soon
          </div>
        )}
        {product.isFeatured ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#c9a46c]/95 px-3 py-1.5 text-[10px] font-light uppercase tracking-widest text-[#0f3d2e] shadow-sm backdrop-blur-[2px]">
            Best Seller
          </span>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-col gap-1.5 px-4 pb-5 pt-4 sm:gap-2 sm:px-5 sm:pb-6 sm:pt-5">
        {product.category ? (
          <p className="text-xs font-light uppercase tracking-widest text-[#0f3d2e]/55">
            {product.category.name}
          </p>
        ) : null}
        <h3 className="line-clamp-2 font-serif text-base font-semibold tracking-tight text-[#0f3d2e] sm:text-lg">
          {product.title}
        </h3>
        {productSubtitle ? (
          <p className="line-clamp-2 text-xs font-normal leading-relaxed text-gray-500 sm:text-sm">
            {productSubtitle}
          </p>
        ) : null}
        {priceStr ? (
          <p className="text-sm font-light tracking-tight text-[#0f3d2e]/85">
            {priceStr}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
