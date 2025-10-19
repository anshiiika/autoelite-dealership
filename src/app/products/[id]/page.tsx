"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define a type for the car data
interface Car {
  brand: string;
  model: string;
  "car body": string;
  color: string;
  price: string;
  year: number;
  description: string;
  image?: string; // Optional image field
}

export default function Products() {
  const [cars, setCars] = useState<Car[]>([]); // Explicitly set type
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/data/cars.json");
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging

        // Ensure `cars` is extracted correctly
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars);
        } else if (data && Array.isArray(data)) {
          // If data is directly an array
          setCars(data);
        } else {
          setError("Unexpected data format");
          setCars([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Get unique brands for filter
  const brands = ["all", ...Array.from(new Set(cars.map((car) => car.brand)))];

  // Filter and sort cars
  const filteredCars = cars
    .filter((car) => brandFilter === "all" || car.brand === brandFilter)
    .sort((a, b) => {
      if (sortOrder === "price-asc") {
        return (
          parseInt(a.price.replace(/[^0-9]/g, "")) -
          parseInt(b.price.replace(/[^0-9]/g, ""))
        );
      } else if (sortOrder === "price-desc") {
        return (
          parseInt(b.price.replace(/[^0-9]/g, "")) -
          parseInt(a.price.replace(/[^0-9]/g, ""))
        );
      } else if (sortOrder === "year-desc") {
        return b.year - a.year;
      } else if (sortOrder === "year-asc") {
        return a.year - b.year;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black">
      {/* Hero Section */}
      <div className="relative py-16">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-blue-600/40 via-indigo-500/30 to-purple-600/40 rounded-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Explore Our Models
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Find the perfect car that matches your style and needs
            </p>
            <div className="mt-8">
              <button
                onClick={() => router.push("/comparison")}
                className="bg-white/10 backdrop-blur-xl border border-white/10 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition shadow-lg flex items-center mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Compare Models
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label
                  htmlFor="brand-filter"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Brand
                </label>
                <select
                  id="brand-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base bg-white/5 text-white border-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  {brands.map((brand) => (
                    <option
                      key={brand}
                      value={brand}
                      className="bg-gray-900 text-white"
                    >
                      {brand === "all" ? "All Brands" : brand}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="sort-order"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Sort By
                </label>
                <select
                  id="sort-order"
                  className="block w-full pl-3 pr-10 py-2 text-base bg-white/5 text-white border-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default" className="bg-gray-900 text-white">
                    Default
                  </option>
                  <option value="price-asc" className="bg-gray-900 text-white">
                    Price: Low to High
                  </option>
                  <option value="price-desc" className="bg-gray-900 text-white">
                    Price: High to Low
                  </option>
                  <option value="year-desc" className="bg-gray-900 text-white">
                    Newest First
                  </option>
                  <option value="year-asc" className="bg-gray-900 text-white">
                    Oldest First
                  </option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              Showing {filteredCars.length} of {cars.length} cars
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
              <p className="mt-4 text-lg text-gray-300">Loading cars...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-300 mb-2">
              Failed to load cars
            </h3>
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCars.map((car, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={car.image || "/placeholder.jpg"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg">
                    {car.year}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-white">
                      {car.brand} {car.model}
                    </h2>
                    <span className="text-lg font-extrabold text-blue-400">
                      {car.price}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 mb-3">
                    <span className="mr-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {car["car body"]}
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                      {car.color}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {car.description}
                  </p>
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300 shadow-lg shadow-blue-900/20"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">
              No cars found
            </h3>
            <p className="text-gray-300">Try changing your filter criteria</p>
            {brandFilter !== "all" && (
              <button
                onClick={() => setBrandFilter("all")}
                className="mt-4 inline-flex items-center px-4 py-2 border border-white/10 shadow-sm text-sm font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
      {selectedCar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">
              {selectedCar.brand} {selectedCar.model}
            </h2>
            <p className="text-blue-400 text-lg font-semibold mb-4">
              {selectedCar.price}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Body:</strong> {selectedCar["car body"]}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Color:</strong> {selectedCar.color}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Year:</strong> {selectedCar.year}
            </p>
            <p className="text-sm text-gray-300 mb-4">
              <strong>Description:</strong> {selectedCar.description}
            </p>
            <button
              onClick={() => setSelectedCar(null)}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-xl transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
