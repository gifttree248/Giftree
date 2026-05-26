import { notFound } from "next/navigation";
import Image from "next/image";
import { safeSanityFetch } from "@/lib/sanity";
import {
  allProductSlugsQuery,
  getProductBySlug,
} from "@/lib/queries";
import type { SanityImage } from "@/types/product";
import { urlFor } from "@/lib/sanity";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";

type ProductDetailResult = {
  _id: string;
  title: string;
  shortDescription?: string;
  slug: string;
  description?: string;
  images?: SanityImage[];
  category?: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
  };
  isFeatured?: boolean;
  brochurePdf?: {
    asset?: {
      url?: string;
      originalFilename?: string;
    };
  };
};

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await safeSanityFetch<{ slug: string }[]>(
    allProductSlugsQuery,
    {},
    [],
  );
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await safeSanityFetch<ProductDetailResult | null>(
    getProductBySlug,
    { slug },
    null,
  );

  if (!product) {
    return notFound();
  }

  const whatsappHref = getWhatsAppInquiryUrl(
    `Hi, I'm interested in the product "${product.title}".`,
  );

  const brochureUrl = product.brochurePdf?.asset?.url;
  const brochureName =
    product.brochurePdf?.asset?.originalFilename || "Product brochure";

  const mainImage =
    product.images && product.images.length > 0 ? product.images[0] : undefined;
  const mainImageUrl = mainImage ? urlFor(mainImage).width(1200).height(900).url() : null;

  return (
    <section className="product-page-section bg-[#f3efe6] pb-12 pt-12 sm:py-24">
      <div className="mx-auto min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0 space-y-4">
            <div className="safari-clip-rounded relative aspect-[4/3] min-h-0 overflow-hidden rounded-2xl bg-neutral-100">
              {mainImageUrl ? (
                <Image
                  src={mainImageUrl}
                  alt={mainImage?.alt || product.title}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                  Product image coming soon
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {product.category ? (
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                {product.category.name}
              </p>
            ) : null}
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {product.title}
            </h1>
            {product.description ? (
              <p className="text-sm leading-relaxed text-neutral-600">
                {product.description}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              {brochureUrl ? (
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Download ${brochureName}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#0f3d2e] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0f3d2e] transition hover:bg-[#0f3d2e] hover:text-white sm:w-auto"
                >
                  Download Brochure
                </a>
              ) : null}
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f3d2e] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-[#134e3a] sm:w-auto"
                >
                  <WhatsAppGlyph className="h-4 w-4 shrink-0" />
                  Inquire through WhatsApp
                </a>
              ) : null}
            </div>

            {product.category?.description ? (
              <div className="mt-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-xs text-neutral-600 sm:px-5">
                <p className="font-semibold uppercase tracking-widest text-neutral-400">
                  About this category
                </p>
                <p className="mt-2 leading-relaxed">{product.category.description}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

