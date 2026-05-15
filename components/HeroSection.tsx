import Link from "next/link";
import type { ProductListItem } from "@/types/product";
import { HeroBestSellersStack } from "@/components/HeroBestSellersStack";

type HeroSectionProps = {
  featuredProducts?: ProductListItem[];
};

export function HeroSection({ featuredProducts = [] }: HeroSectionProps) {
  return (
    <section
      className="bg-[#F3EFE6] pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
      aria-label="Hero"
    >
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="luxury-caps-label mb-4 inline-flex items-center gap-2 rounded-full border border-[#0f3d2e]/15 bg-white/60 px-4 py-1.5 text-[#0f3d2e]/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a46c]" />
              New Collection Live
            </p>
            <h1 className="font-serif text-[1.75rem] font-bold tracking-tight text-[#0f3d2e] sm:text-5xl lg:text-6xl xl:text-7xl">
              The Art of{" "}
              <span className="text-[#c9a46c]">Giving,</span>
              <br />
              Reimagined.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#0f3d2e]/80 sm:mt-6 sm:text-lg">
              Vibrant, bold, and unapologetically premium. Discover our new
              generation of curated gift sets designed to spark joy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/products"
                className="luxury-caps-cta inline-flex w-full items-center justify-center rounded-full bg-[#0f3d2e] px-8 py-3.5 text-sm text-white shadow-sm transition-all duration-200 hover:bg-[#134e3a] hover:shadow-md sm:w-auto"
              >
                Explore Collections
              </Link>
              <Link
                href="/contact"
                className="luxury-caps-cta inline-flex w-full items-center justify-center rounded-full border-2 border-[#0f3d2e] bg-transparent px-8 py-3.5 text-sm text-[#0f3d2e] transition-all duration-200 hover:bg-[#0f3d2e] hover:text-white sm:w-auto"
              >
                Talk to Us
              </Link>
            </div>
          </div>
          <HeroBestSellersStack products={featuredProducts} />
        </div>
      </div>
    </section>
  );
}
