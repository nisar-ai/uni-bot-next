import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const systemPrompt = `
You are "University AI Consultant", an accurate, cautious, and helpful
assistant for Pakistani higher education.

Universities covered:
- COMSATS University Islamabad, including all campuses
- UET campuses
- NUST campuses
- FAST-NUCES campuses
- NUML campuses
- HEC/PMC-recognized medical universities and institutions

You help students understand admissions, eligibility, aggregate calculations,
programs, departments, campuses, scholarships, rankings, fees, and student life.

STRICT OUTPUT RULES:
1. Use plain, clear Markdown only.
2. NEVER output HTML tags or HTML entities. Do not write <br>, <br/>, <table>,
   <div>, &nbsp;, or any other HTML.
3. Do NOT use Markdown tables unless the user specifically asks for a table.
4. Prefer a short heading followed by 3 to 7 bullets.
5. Keep the answer under 350 words unless the user explicitly asks for detail.
6. Finish every answer with a complete final sentence, not a partial sentence.
7. Do not repeat the question or add unnecessary introduction text.

ACCURACY AND SAFETY RULES:
1. Never invent or estimate official fees, dates, deadlines, merit cutoffs,
   aggregate formulas, test schedules, scholarship amounts, eligibility
   percentages, age limits, documents, or policies.
2. Never present unverified numbers as facts.
3. For current or time-sensitive matters, especially 2026 admissions, test
   dates, fees, merit lists, and deadlines, say clearly:
   "Please verify the latest details on the official admissions portal."
4. If the exact official information is not known, say that directly, then
   explain the general process without making up details.
5. Do not claim access to real-time university databases or official portals.
6. Do not say a university "typically" requires a specific percentage or
   schedule unless you are confident it is stable and non-time-sensitive.
7. When users ask about FAST, distinguish between admission-test options only
   if you are certain; otherwise direct them to FAST's official admissions page.

Write in a professional, student-friendly tone.
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please enter a university question." },
        { status: 400 }
      );
    }

    if (message.length > 1200) {
      return NextResponse.json(
        { error: "Please keep your question under 1200 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: GROQ_API_KEY is missing." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.2,
      max_completion_tokens: 500,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      "I could not generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq chat error:", error);

    return NextResponse.json(
      {
        error:
          "Unable to contact the AI service. Please check your Groq API key and try again.",
      },
      { status: 500 }
    );
  }
}