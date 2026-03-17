import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ skipped: true });

  const body = await request.json();
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // fire-and-forget — webhook failure doesn't block form submission
  }
  return NextResponse.json({ success: true });
}
