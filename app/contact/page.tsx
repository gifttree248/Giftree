import { ConciergeContactForm } from "@/components/ConciergeContactForm";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { getAllCategories } from "@/lib/queries";
import { safeSanityFetch } from "@/lib/sanity";

const defaultContactEmail = "giftreecraftingideas@gmail.com";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || defaultContactEmail;
const contactPhones = ["9711086819", "9958874096"] as const;
const instagramHandle = "@giftree2023";
const instagramPath = "giftree2023";
const facebookLabel = "Giftree";
const facebookUrl = "https://www.facebook.com/share/1Baqw8nWU2/";

type ContactCategory = {
  _id: string;
  name: string;
};

export default async function ContactPage() {
  const categories = await safeSanityFetch<ContactCategory[]>(
    getAllCategories,
    {},
    [],
  );
  const categoryOptions = Array.from(
    new Set(
      categories
        .map((category) => category.name?.trim())
        .filter((name): name is string => Boolean(name)),
    ),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,#185c46_0%,#0f3d2e_46%,#0b2e23_100%)] pb-12 pt-24 sm:pb-22 sm:pt-32">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-[#d8b784]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#7cc2a7]/15 blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6d3ad] backdrop-blur-sm">
            Concierge Support
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-[1.75rem] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let&apos;s Build a Memorable
            <span className="block text-[#e6d3ad]">Gifting Experience</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            Tell us your goals, timeline, and budget. We&apos;ll curate premium gift
            options tailored for your team, clients, and events.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/75">
            <p>Response within 24 hours</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:inline-block" />
            <p>Custom branding available</p>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:inline-block" />
            <p>Pan-India fulfillment</p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact-form" className="bg-[#f3efe6] pb-12 pt-8 sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-9">
            {/* Left copy */}
            <div className="pt-1 lg:pr-3">
              <h2 className="max-w-md text-2xl font-bold leading-tight text-[#0f3d2e] sm:text-4xl">
                Let&apos;s Discuss Your Gifting Needs
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#0f3d2e]/70 sm:text-lg">
                Whether you&apos;re looking for custom branded merchandise, premium
                executive gifts, or scalable solutions for your entire team,
                we&apos;re here to make it happen seamlessly.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0f3d2e]/10 bg-white text-[#b8a37a] shadow-sm">
                    <Phone className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f3d2e]">Call Us</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-[#0f3d2e]/70">
                      {contactPhones.map((num) => (
                        <span key={num} className="block">
                          <a
                            href={`tel:+91${num}`}
                            className="underline decoration-[#0f3d2e]/25 underline-offset-2 transition hover:text-[#0f3d2e] hover:decoration-[#0f3d2e]/50"
                          >
                            {num}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0f3d2e]/10 bg-white text-[#b8a37a] shadow-sm">
                    <Mail className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f3d2e]">Email Us</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-[#0f3d2e]/70">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="underline decoration-[#0f3d2e]/25 underline-offset-2 transition hover:text-[#0f3d2e] hover:decoration-[#0f3d2e]/50"
                      >
                        {contactEmail}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0f3d2e]/10 bg-white text-[#b8a37a] shadow-sm">
                    <Instagram className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f3d2e]">Instagram</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-[#0f3d2e]/70">
                      <a
                        href={`https://www.instagram.com/${instagramPath}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#0f3d2e]/25 underline-offset-2 transition hover:text-[#0f3d2e] hover:decoration-[#0f3d2e]/50"
                      >
                        {instagramHandle}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0f3d2e]/10 bg-white text-[#b8a37a] shadow-sm">
                    <Facebook className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f3d2e]">Facebook</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-[#0f3d2e]/70">
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#0f3d2e]/25 underline-offset-2 transition hover:text-[#0f3d2e] hover:decoration-[#0f3d2e]/50"
                      >
                        {facebookLabel}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form card */}
            <ConciergeContactForm categoryOptions={categoryOptions} />
          </div>
        </div>
      </section>
    </>
  );
}
