// Receives quote requests from the "Get a free quote" form.
//
// ⚠️ PLACEHOLDER: leads are only validated and logged right now. Nobody gets
//    notified. Before launch, deliver them to Tyler, e.g. email via Resend or
//    Postmark, a text via Twilio, or a row in a Google Sheet. Add the API key
//    as an environment variable, never in code.

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on.
  if (clean(body.company)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    location: clean(body.location),
    service: clean(body.service, 80),
    bestTime: clean(body.bestTime, 40),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.location || !lead.service || lead.phone.replace(/\D/g, "").length < 10) {
    return Response.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  // TODO(launch): send `lead` to Tyler here.
  console.log("[quote request]", lead);

  return Response.json({ ok: true });
}
