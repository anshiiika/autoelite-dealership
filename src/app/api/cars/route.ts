import { NextResponse } from "next/server";
import carsData from "@/../public/data/cars.json";

export async function GET() {
  return NextResponse.json({ cars: carsData });
}
