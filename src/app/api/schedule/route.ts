import { NextResponse } from "next/server";

// Simple in-memory store for demo purposes only. Will reset on server restart.
const bookings: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  model: string;
  location: string;
  date: string;
  time: string;
  createdAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = [
      "name",
      "email",
      "phone",
      "model",
      "location",
      "date",
      "time",
    ];

    for (const field of requiredFields) {
      if (!body?.[field] || typeof body[field] !== "string" || body[field].trim() === "") {
        return NextResponse.json({ error: `Missing or invalid field: ${field}` }, { status: 400 });
      }
    }

    // Very basic email/phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = body.phone.replace(/\D/g, "");
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (phoneDigits.length < 7) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const booking = {
      id,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      model: body.model.trim(),
      location: body.location.trim(),
      date: body.date.trim(),
      time: body.time.trim(),
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}

export async function GET() {
  // Expose bookings for demo/debug
  return NextResponse.json({ bookings });
}


