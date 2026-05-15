import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { safeSanityFetch } from "@/lib/sanity";
import { getAllProducts } from "@/lib/queries";
import type { ProductListItem } from "@/types/product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GIFTREE | Premium Gift Articles Portfolio",
  description:
    "A curated portfolio of premium gift products for corporate and personal occasions.",
};

type ProductResult = {
  _id: string;
  title: string;
  slug: string;
  image: ProductListItem["images"][number] | null;
  lifestyleImage?: ProductListItem["lifestyleImage"];
  internalViewImage?: ProductListItem["internalViewImage"];
  category?: { _id: string; name: string; slug: string; description?: string };
  isFeatured?: boolean;
  price?: number | null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await safeSanityFetch<ProductResult[]>(getAllProducts, {}, []);

  const mappedProducts: ProductListItem[] = products.map((p) => ({
    id: p._id,
    title: p.title,
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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} bg-[#f3efe6] text-neutral-800 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar products={mappedProducts} />
          <main className="min-w-0 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
