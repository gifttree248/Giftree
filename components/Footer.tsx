import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

const COMPANY_EMAIL = "giftreecraftingideas@gmail.com";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Collection" },
  { href: "/contact", label: "Get in Touch" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f3d2e]">
      <div className="mx-auto min-w-0 max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:gap-16 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <p className="text-lg font-semibold uppercase tracking-widest text-white">
              Giftree
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Curating exceptional gift experiences for life&apos;s most
              meaningful moments.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/40">
              Explore
            </p>
            <nav className="flex flex-col space-y-3">
              {EXPLORE_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/40">
              Follow Us
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/giftree2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.facebook.com/share/1Baqw8nWU2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" strokeWidth={1.5} />
                </a>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-white/60 transition-colors hover:text-white"
                  aria-label={`Email ${COMPANY_EMAIL}`}
                >
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </a>
              </div>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="max-w-xs text-sm text-white/70 transition-colors hover:text-white"
              >
                {COMPANY_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-white/30 sm:mt-12">
          © {new Date().getFullYear()} Giftree. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
