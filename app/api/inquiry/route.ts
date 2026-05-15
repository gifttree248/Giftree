import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const sanityToken = process.env.SANITY_API_TOKEN;
const resendKey = process.env.RESEND_API_KEY;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const sanity =
  projectId && dataset && sanityToken
    ? createClient({
        projectId,
        dataset,
        token: sanityToken,
        useCdn: false,
        apiVersion: "2025-01-01",
      })
    : null;

const resend = resendKey ? new Resend(resendKey) : null;

const notifyTo = "giftreecraftingideas@gmail.com";

export async function POST(req: Request) {
  try {
    if (!sanity) {
      return NextResponse.json(
        { error: "Inquiry storage is not configured" },
        { status: 500 },
      );
    }
    if (!resend) {
      return NextResponse.json(
        { error: "Email delivery is not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { name, email, phone, message, product } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      product?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const productLabel = typeof product === "string" ? product : "Product";

    await sanity.create({
      _type: "inquiry",
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      product: productLabel,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone?.trim() || "N/A");
    const safeProduct = escapeHtml(productLabel);
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: notifyTo,
      subject: "New Inquiry",
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Product:</b> ${safeProduct}</p>
        <p><b>Message:</b></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
