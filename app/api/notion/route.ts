import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { PHASES } from "@/lib/phase-data";

export async function POST(request: Request) {
  const body = await request.json();
  const phase: number | undefined = body?.phase;
  const phaseData = phase !== undefined ? PHASES.find((p) => p.id === phase) : undefined;

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        Email: {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body?.fullName ?? body?.name ?? "",
              },
            },
          ],
        },
        ...(body?.companyName && {
          Company: {
            type: "rich_text",
            rich_text: [{ type: "text", text: { content: body.companyName } }],
          },
        }),
        ...(body?.companyUrl && {
          Website: {
            type: "url",
            url: body.companyUrl,
          },
        }),
        ...(body?.phone && {
          Phone: {
            type: "phone_number",
            phone_number: body.phone,
          },
        }),
        ...(phase !== undefined && phaseData && {
          Phase: {
            select: {
              name: `${phaseData.label} — ${phaseData.name}`,
            },
          },
        }),
      },
    });

    if (!response) {
      throw new Error("Failed to add email to Notion");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
