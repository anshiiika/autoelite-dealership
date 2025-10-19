"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPinIcon, CarIcon } from "lucide-react";

export default function Schedule() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    country: "India",
    state: "",
    location: "",
    date: "",
    time: "",
  });

  const [models, setModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "success"; bookingId: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  useEffect(() => {
    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        // Prefer local API to avoid external API key
        const res = await fetch("/api/cars");
        if (!res.ok) throw new Error("Failed to load models");
        const data = await res.json();
        const cars = Array.isArray(data?.cars?.cars)
          ? data.cars.cars
          : data?.cars;
        const names: string[] = Array.isArray(cars)
          ? Array.from(
              new Set(
                cars
                  .map((c: any) =>
                    c?.brand && c?.model ? `${c.brand} ${c.model}` : null
                  )
                  .filter((v: string | null): v is string => Boolean(v))
              )
            )
          : [];
        setModels(names);
      } catch (err) {
        setModels([]);
      } finally {
        setLoadingModels(false);
      }
    };
    fetchModels();
  }, []);

  // Load countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch("/api/locations?level=countries", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load countries");
        const data = await res.json();
        const list: string[] = Array.isArray(data?.countries)
          ? data.countries
          : [];
        setCountries(list);
      } catch (err) {
        setCountries(["India"]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) return;
      setLoadingStates(true);
      setStates([]);
      setCities([]);
      setFormData((prev) => ({ ...prev, state: "", location: "" }));
      try {
        const res = await fetch(
          `/api/locations?level=states&country=${encodeURIComponent(
            formData.country
          )}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load states");
        const data = await res.json();
        const list: string[] = Array.isArray(data?.states) ? data.states : [];
        setStates(list);
      } catch (err) {
        if (formData.country === "India") {
          setStates([
            "Maharashtra",
            "Delhi",
            "Karnataka",
            "Telangana",
            "Gujarat",
            "Tamil Nadu",
            "West Bengal",
            "Rajasthan",
          ]);
        } else {
          setStates([]);
        }
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.country || !formData.state) return;
      setLoadingCities(true);
      setCities([]);
      setFormData((prev) => ({ ...prev, location: "" }));
      try {
        const res = await fetch(
          `/api/locations?level=cities&country=${encodeURIComponent(
            formData.country
          )}&state=${encodeURIComponent(formData.state)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load cities");
        const data = await res.json();
        const list: string[] = Array.isArray(data?.cities) ? data.cities : [];
        setCities(list);
      } catch (err) {
        if (formData.country === "India") {
          // Safe defaults
          setCities([
            "Mumbai",
            "Pune",
            "Nagpur",
            "Bengaluru",
            "Hyderabad",
            "Chennai",
            "Kolkata",
            "Jaipur",
            "Ahmedabad",
            "Surat",
          ]);
        } else {
          setCities([]);
        }
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [formData.country, formData.state]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): string | null => {
    const { name, email, phone, model, country, state, location, date, time } =
      formData;
    if (
      !name ||
      !email ||
      !phone ||
      !model ||
      !country ||
      !state ||
      !location ||
      !date ||
      !time
    ) {
      return "Please fill all fields.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email.";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) return "Please enter a valid phone number.";
    const selectedDateTime = new Date(`${date}T${time}`);
    if (isNaN(selectedDateTime.getTime()))
      return "Please choose a valid date/time.";
    if (selectedDateTime.getTime() < Date.now())
      return "Selected time is in the past.";
    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setSubmitState({ status: "error", message: validationError });
      return;
    }
    try {
      setSubmitState({ status: "submitting" });
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          model: formData.model,
          location: `${formData.location ? formData.location + ", " : ""}${
            formData.state ? formData.state + ", " : ""
          }${formData.country}`,
          date: formData.date,
          time: formData.time,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to book test drive");
      }
      setSubmitState({ status: "success", bookingId: data.booking?.id || "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        model: "",
        country: "India",
        state: "",
        location: "",
        date: "",
        time: "",
      });
    } catch (err: any) {
      setSubmitState({
        status: "error",
        message: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex items-center justify-center px-4 py-10">
      <div className="relative max-w-3xl w-full">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-blue-600/40 via-indigo-500/30 to-purple-600/40 rounded-3xl" />
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-center mb-2">
            Book a Premium Test Drive
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Choose your model and preferred dealership location. We'll confirm
            instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                  placeholder="e.g., Anshika Shukla"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                  placeholder="e.g., +91 98765 43210"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-200 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-200 font-medium mb-1 flex items-center gap-2">
                <CarIcon size={18} />
                Select Car Model
              </label>
              <select
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
              >
                <option value="" className="bg-gray-900 text-white">
                  {loadingModels ? "Loading models..." : "Choose Model"}
                </option>
                {!loadingModels &&
                  models.map((m) => (
                    <option
                      key={m}
                      value={m}
                      className="bg-gray-900 text-white"
                    >
                      {m}
                    </option>
                  ))}
              </select>
            </div>

            {/* Country / State / City */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-200 font-medium mb-1 flex items-center gap-2">
                  <MapPinIcon size={18} /> Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                >
                  <option value="" className="bg-gray-900 text-white">
                    {loadingCountries ? "Loading..." : "Select Country"}
                  </option>
                  {!loadingCountries &&
                    countries.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className="bg-gray-900 text-white"
                      >
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!formData.country || loadingStates}
                  className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none disabled:opacity-50"
                >
                  <option value="" className="bg-gray-900 text-white">
                    {loadingStates ? "Loading..." : "Select State"}
                  </option>
                  {!loadingStates &&
                    states.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-gray-900 text-white"
                      >
                        {s}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  City
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!formData.state || loadingCities}
                  className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none disabled:opacity-50"
                >
                  <option value="" className="bg-gray-900 text-white">
                    {loadingCities ? "Loading..." : "Select City"}
                  </option>
                  {!loadingCities &&
                    cities.map((ct) => (
                      <option
                        key={ct}
                        value={ct}
                        className="bg-gray-900 text-white"
                      >
                        {ct}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-64 border border-white/10 rounded-2xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  formData.location ||
                    formData.state ||
                    formData.country ||
                    "India"
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 font-medium mb-1 flex items-center gap-2">
                  <CalendarIcon size={18} /> Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1">
                  Select Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/60 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitState.status === "submitting"}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-900/20"
            >
              {submitState.status === "submitting"
                ? "Booking..."
                : "✅ Confirm Test Drive"}
            </button>

            {submitState.status === "error" && (
              <p className="text-red-300 text-sm">{submitState.message}</p>
            )}
            {submitState.status === "success" && (
              <div className="text-green-300 bg-green-900/20 border border-green-500/30 rounded p-3 text-sm">
                Booking confirmed. Reference:{" "}
                <span className="font-semibold">{submitState.bookingId}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
