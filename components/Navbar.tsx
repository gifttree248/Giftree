"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import type { ProductListItem } from "@/types/product";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop Collections" },
  { href: "/contact", label: "Custom Concierge" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

type NavbarProps = {
  products: ProductListItem[];
};

export function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchWrapperRef.current) return;
      if (!searchWrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery),
    );
  }, [products, normalizedQuery]);

  const showDropdown = isOpen && normalizedQuery.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#0f3d2e]/10 bg-[#F3EFE6]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
          aria-label="Giftree home"
        >
          <div className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Image
              src="/giftree-logo.png"
              alt="Giftree"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold leading-none text-[#0f3d2e] sm:text-3xl">
            Giftree
          </span>
        </Link>
        <LayoutGroup id="primary-nav">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative",
                    "text-xs font-semibold uppercase tracking-widest",
                    "transition-all duration-200 ease-out",
                    active
                      ? "text-[#0f3d2e]"
                      : "text-[#0f3d2e]/80 hover:text-[#0f3d2e]/60",
                  ].join(" ")}
                >
                  <span className="relative inline-block py-1">
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#0f3d2e]"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>
        <div ref={searchWrapperRef} className="relative flex items-center">
          <div
            className={`mr-2 transition-all duration-300 ease-out ${
              isOpen
                ? "w-44 translate-x-0 opacity-100 sm:w-72"
                : "pointer-events-none w-0 translate-x-1 opacity-0"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none [-webkit-appearance:none] [box-shadow:0_1px_2px_rgba(15,61,46,0.08)] focus:border-[#0f3d2e]/30 focus:ring-4 focus:ring-[#0f3d2e]/10"
            />
          </div>
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full p-2 text-[#0f3d2e]/80 transition-colors hover:bg-[#0f3d2e]/5 hover:text-[#0f3d2e]"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="ml-1 rounded-full p-2 text-[#0f3d2e]/80 transition-colors hover:bg-[#0f3d2e]/5 hover:text-[#0f3d2e] md:hidden"
          >
            <span className="sr-only">Open navigation menu</span>
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
              {filteredProducts.length === 0 ? (
                <p className="px-4 py-3 text-sm text-neutral-500">No products found</p>
              ) : (
                <ul className="max-h-80 overflow-y-auto py-2">
                  {filteredProducts.map((product) => {
                    const image = product.images?.[0];
                    const imageUrl =
                      image?.asset ? urlFor(image).width(80).height(80).url() : null;

                    return (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-neutral-50"
                        >
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={image?.alt || product.title}
                              width={36}
                              height={36}
                              className="h-9 w-9 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-md bg-neutral-100" />
                          )}
                          <span className="line-clamp-1 text-sm font-medium text-neutral-800">
                            {product.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-[#0f3d2e]/10 bg-[#F3EFE6] px-4 py-3 sm:px-6 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={[
                    "rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200",
                    active
                      ? "bg-[#0f3d2e]/8 text-[#0f3d2e]"
                      : "text-[#0f3d2e]/80 hover:bg-[#0f3d2e]/5 hover:text-[#0f3d2e]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
