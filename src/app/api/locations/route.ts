import { NextResponse } from "next/server";

// Basic in-memory cache keyed by a simple string
const cache = new Map<string, { data: any; fetchedAt: number }>();
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function fetchWithCache(key: string, fetcher: () => Promise<any>) {
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && now - cached.fetchedAt < ONE_DAY_MS) {
    return cached.data;
  }
  const data = await fetcher();
  cache.set(key, { data, fetchedAt: now });
  return data;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const level = (url.searchParams.get("level") || "countries").toLowerCase();
    const country = url.searchParams.get("country");
    const state = url.searchParams.get("state");

    if (level === "countries") {
      const data = await fetchWithCache("countries", async () => {
        const resp = await fetch("https://countriesnow.space/api/v0.1/countries/positions", { cache: "no-store" });
        if (!resp.ok) throw new Error(`Failed to fetch countries: ${resp.status}`);
        const json = await resp.json();
        const list = Array.isArray(json?.data)
          ? json.data
            .map((c: any) => (typeof c?.name === "string" ? c.name.trim() : ""))
            .filter((n: string) => n.length > 0)
            .sort((a: string, b: string) => a.localeCompare(b))
          : [];
        return list;
      });
      return NextResponse.json({ countries: data });
    }

    if (level === "states") {
      if (!country) return NextResponse.json({ error: "country is required" }, { status: 400 });
      const key = `states:${country}`;
      const data = await fetchWithCache(key, async () => {
        const resp = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
          cache: "no-store",
        });
        if (!resp.ok) throw new Error(`Failed to fetch states: ${resp.status}`);
        const json = await resp.json();
        const states = Array.isArray(json?.data?.states)
          ? json.data.states
            .map((s: any) => (typeof s?.name === "string" ? s.name.trim() : ""))
            .filter((n: string) => n.length > 0)
            .sort((a: string, b: string) => a.localeCompare(b))
          : [];
        return states;
      });
      return NextResponse.json({ country, states: data });
    }

    if (level === "cities") {
      if (!country) return NextResponse.json({ error: "country is required" }, { status: 400 });
      if (!state) return NextResponse.json({ error: "state is required" }, { status: 400 });
      const key = `cities:${country}:${state}`;
      const data = await fetchWithCache(key, async () => {
        const resp = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, state }),
          cache: "no-store",
        });
        if (!resp.ok) throw new Error(`Failed to fetch cities: ${resp.status}`);
        const json = await resp.json();
        const cities = Array.isArray(json?.data)
          ? json.data
            .map((c: any) => (typeof c === "string" ? c.trim() : ""))
            .filter((n: string) => n.length > 0)
            .sort((a: string, b: string) => a.localeCompare(b))
          : [];
        return cities;
      });
      return NextResponse.json({ country, state, cities: data });
    }

    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Unable to fetch locations" },
      { status: 500 }
    );
  }
}


