"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Mail, X } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-4 text-sm text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 sm:h-14 sm:px-5 sm:text-[1.05rem]";
const textareaClass =
  "w-full resize-y rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-4 py-3 text-sm text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 sm:px-5 sm:py-4 sm:text-[1.05rem]";

function defaultMessage(productTitle: string) {
  return `Hi, I am interested in ${productTitle}. Please share more details.`;
}

export type InquiryModalProps = {
  productTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InquiryModal({
  productTitle,
  open,
  onOpenChange,
}: InquiryModalProps) {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const phoneId = `${uid}-phone`;
  const messageId = `${uid}-message`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName("");
    setEmail("");
    setPhone("");
    setMessage(defaultMessage(productTitle));
    setSuccess(false);
    setError(null);
    setLoading(false);
  }, [open, productTitle]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          product: productTitle,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/45 p-4 sm:p-6"
      role="presentation"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="my-auto max-h-[min(92vh,720px)] w-full max-w-lg shrink-0 overflow-y-auto rounded-3xl border border-[#0f3d2e]/10 bg-white p-5 shadow-[0_14px_40px_rgba(15,61,46,0.18)] sm:p-8"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0f3d2e]/50">
              Product inquiry
            </p>
            <h2
              id={`${uid}-title`}
              className="mt-1 font-serif text-xl font-semibold text-[#0f3d2e] sm:text-2xl"
            >
              {productTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-[#0f3d2e]/60 transition hover:bg-[#0f3d2e]/5 hover:text-[#0f3d2e]"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {success ? (
          <div className="mt-8 space-y-5 text-center">
            <p className="text-base leading-relaxed text-[#0f3d2e]/85">
              Thank you. We received your inquiry and will get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#0f3d2e] px-6 text-sm font-semibold text-white transition hover:bg-[#124736] sm:h-14 sm:text-base"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label htmlFor={nameId} className="text-sm font-medium text-[#0f3d2e]/90">
                Name *
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={emailId} className="text-sm font-medium text-[#0f3d2e]/90">
                Email *
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={phoneId} className="text-sm font-medium text-[#0f3d2e]/90">
                Phone <span className="font-normal text-[#0f3d2e]/55">(optional)</span>
              </label>
              <input
                id={phoneId}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={messageId} className="text-sm font-medium text-[#0f3d2e]/90">
                Message *
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={4}
                required
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                className={textareaClass}
              />
            </div>

            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#0f3d2e] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#124736] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-base"
            >
              {loading ? "Sending…" : "Send inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

export function InquireNowButton({ productTitle }: { productTitle: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Inquire Now"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0f3d2e] bg-[#e8efe9] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0f3d2e] shadow-sm transition hover:border-[#134e3a] hover:bg-[#d4e4da] hover:text-[#0a2a20] sm:w-auto"
      >
        <Mail className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        Inquire Now
      </button>
      <InquiryModal
        productTitle={productTitle}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
