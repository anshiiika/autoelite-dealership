"use client";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black px-4 py-12">
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-blue-600/40 via-indigo-500/30 to-purple-600/40 rounded-3xl" />

        {/* Hero */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-center">
            About Our Dealership
          </h1>
          <p className="mt-4 text-center text-gray-300 max-w-3xl mx-auto">
            We blend precision engineering with premium experiences to deliver
            cars that feel as exceptional as they look.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-white">12 Cities</p>
              <p className="text-gray-400">Premium Showrooms</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-gray-400">Concierge Support</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Design Without Compromise",
              desc: "Every line, stitch, and surface is refined to perfection for a truly premium feel.",
            },
            {
              title: "Innovation That Matters",
              desc: "From electrification to assisted driving, we obsess over meaningful tech.",
            },
            {
              title: "Trust & Transparency",
              desc: "Clear pricing, honest timelines, and a service experience you can rely on.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-gray-200"
            >
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-gray-300">{card.desc}</p>
            </div>
          ))}
        </section>

        {/* Timeline */}
        <section className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Our Journey
          </h2>
          <div className="mt-6 space-y-6">
            {[
              {
                year: "2012",
                text: "Founded with a mission to elevate everyday driving.",
              },
              {
                year: "2016",
                text: "Expanded to major metros with premium service lounges.",
              },
              {
                year: "2020",
                text: "Introduced EV lineup and intelligent driver-assist features.",
              },
              {
                year: "2024",
                text: "Launched seamless at-home test drives across cities.",
              },
            ].map((item) => (
              <div key={item.year} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 text-blue-300 font-semibold">
                  {item.year}
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-gray-200">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
            <div className="text-left">
              <p className="text-white font-semibold">
                Ready for the experience?
              </p>
              <p className="text-gray-300 text-sm">
                Book a premium test drive in minutes.
              </p>
            </div>
            <button
              onClick={() => router.push("/schedule")}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-xl transition shadow-lg shadow-blue-900/20"
            >
              Schedule Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
