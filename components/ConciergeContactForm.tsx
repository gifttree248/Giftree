"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Send } from "lucide-react";

const OPTIONAL_MESSAGE_PREFILL =
  "Hi, I am looking for custom gifting solutions for my team. Please share more details.";

type ConciergeContactFormProps = {
  categoryOptions: string[];
};

export function ConciergeContactForm({ categoryOptions }: ConciergeContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(OPTIONAL_MESSAGE_PREFILL);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lines: string[] = [];
    if (company.trim()) lines.push(`Company: ${company.trim()}`);
    if (category.trim()) lines.push(`Category interest: ${category.trim()}`);
    if (lines.length) lines.push("");
    lines.push(message.trim());
    const composedMessage = lines.join("\n");

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "general",
          name,
          email,
          company,
          phone,
          category,
          message: composedMessage,
          product: "general",
        }),
      });

      if (res.ok) {
        alert("Inquiry sent successfully!");
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setCategory("");
        setMessage("");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#0f3d2e]/6 bg-white p-5 shadow-[0_14px_40px_rgba(15,61,46,0.12)] sm:p-9">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
          <div className="space-y-2.5">
            <label htmlFor="name" className="text-sm font-medium text-[#0f3d2e]/90">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              className="h-14 w-full rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 text-[1.05rem] text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
            />
          </div>
          <div className="space-y-2.5">
            <label htmlFor="email" className="text-sm font-medium text-[#0f3d2e]/90">
              Work Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="h-14 w-full rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 text-[1.05rem] text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
          <div className="space-y-2.5">
            <label htmlFor="company" className="text-sm font-medium text-[#0f3d2e]/90">
              Company Name *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={submitting}
              className="h-14 w-full rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 text-[1.05rem] text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
            />
          </div>
          <div className="space-y-2.5">
            <label htmlFor="phone" className="text-sm font-medium text-[#0f3d2e]/90">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
              className="h-14 w-full rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 text-[1.05rem] text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <label htmlFor="inquiry" className="text-sm font-medium text-[#0f3d2e]/90">
            Category Interest
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={submitting}
            className="h-14 w-full appearance-none rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 text-[1.05rem] text-[#0f3d2e] outline-none transition focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
          >
            <option value="">Select an option...</option>
            {categoryOptions.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2.5">
          <label htmlFor="message" className="text-sm font-medium text-[#0f3d2e]/90">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
            placeholder="Tell us about your gifting needs, quantity, timeline, etc."
            className="w-full resize-y rounded-2xl border border-[#0f3d2e]/10 bg-[#f7f8f9] px-5 py-4 text-[1.05rem] text-[#0f3d2e] outline-none transition placeholder:text-[#0f3d2e]/35 focus:border-[#0f3d2e]/25 focus:ring-2 focus:ring-[#0f3d2e]/10 disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-1 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#0f3d2e] px-8 text-xl font-semibold text-white shadow-md transition hover:bg-[#124736] disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Request Quote"}
          <Send className="h-4 w-4" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
