"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define a type for car objects
type Car = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  brand: string;
  model: string;
  year: string;
  fuelType: string;
  transmission: string;
  engine: string;
  mileage: string;
};

export default function Comparison() {
  const [cars, setCars] = useState<Car[]>([]);
  const [car1, setCar1] = useState<Car | null>(null);
  const [car2, setCar2] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch car data from the API
  useEffect(() => {
    setLoading(true);
    fetch("/data/cars.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);

        // Handle different API response structures
        let carsArray: Car[] = [];
        if (data.cars && Array.isArray(data.cars.cars)) {
          carsArray = data.cars.cars;
        } else if (data.cars && Array.isArray(data.cars)) {
          carsArray = data.cars;
        } else if (Array.isArray(data)) {
          carsArray = data;
        } else {
          throw new Error("Unexpected API response structure");
        }

        // Filter out cars with undefined IDs and ensure IDs are unique
        // If no ID exists, create one based on index + brand + model
        const processedCars = carsArray.map((car, index) => {
          if (!car.id) {
            return {
              ...car,
              id: `car-${index}-${car.brand}-${car.model}`
                .replace(/\s+/g, "-")
                .toLowerCase(),
            };
          }
          return car;
        });

        if (processedCars.length === 0) {
          setError("No cars available for comparison");
        } else {
          setCars(processedCars);
          setCar1(processedCars[0] || null);
          setCar2(
            processedCars.length > 1 ? processedCars[1] : processedCars[0]
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching car data:", err);
        setError(`Failed to load car data: ${err.message}`);
        setCars([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compare attributes of two cars
  const compareAttributes = (
    attr1: string | undefined,
    attr2: string | undefined
  ) => {
    if (!attr1 || !attr2 || attr1 === attr2) return "text-gray-400";
    return attr1 > attr2
      ? "text-green-400 font-semibold"
      : "text-red-400 font-semibold";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-lg text-gray-300">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl text-center">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl text-center">
          <svg
            className="w-16 h-16 text-yellow-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">
            No Cars Available
          </h2>
          <p className="text-gray-300">
            There are no cars available for comparison at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Car Comparison
          </h1>
          <p className="text-lg text-gray-300">
            Compare features and specifications of different cars
          </p>
        </div>

        {/* Car selection area */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Select Cars to Compare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="car1"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                First Car
              </label>
              <select
                id="car1"
                onChange={(e) =>
                  setCar1(cars.find((car) => car.id === e.target.value) || null)
                }
                className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                value={car1 ? car1.id : ""}
              >
                {cars.map((car, index) => (
                  <option
                    key={`car1-option-${index}-${car.id}`}
                    value={car.id}
                    className="bg-gray-900 text-white"
                  >
                    {car.brand} {car.model} {car.year ? `(${car.year})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="car2"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Second Car
              </label>
              <select
                id="car2"
                onChange={(e) =>
                  setCar2(cars.find((car) => car.id === e.target.value) || null)
                }
                className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                value={car2 ? car2.id : ""}
              >
                {cars.map((car, index) => (
                  <option
                    key={`car2-option-${index}-${car.id}`}
                    value={car.id}
                    className="bg-gray-900 text-white"
                  >
                    {car.brand} {car.model} {car.year ? `(${car.year})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Car comparison section */}
        {car1 && car2 && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Car images and names */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
              <div className="p-6 border-r border-white/10">
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={car1.image || "/placeholder-car.jpg"}
                    alt={`${car1.brand} ${car1.model}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-car.jpg";
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {car1.brand} {car1.model}
                </h2>
                <p className="text-xl font-semibold text-blue-400 mt-1">
                  {car1.price || "Price not available"}
                </p>
              </div>
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={car2.image || "/placeholder-car.jpg"}
                    alt={`${car2.brand} ${car2.model}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-car.jpg";
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {car2.brand} {car2.model}
                </h2>
                <p className="text-xl font-semibold text-blue-400 mt-1">
                  {car2.price || "Price not available"}
                </p>
              </div>
            </div>

            {/* Specification comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Specifications
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Year</span>
                    <span className={compareAttributes(car1.year, car2.year)}>
                      {car1.year || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Engine</span>
                    <span
                      className={compareAttributes(car1.engine, car2.engine)}
                    >
                      {car1.engine || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Fuel Type</span>
                    <span
                      className={compareAttributes(
                        car1.fuelType,
                        car2.fuelType
                      )}
                    >
                      {car1.fuelType || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Transmission</span>
                    <span
                      className={compareAttributes(
                        car1.transmission,
                        car2.transmission
                      )}
                    >
                      {car1.transmission || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Mileage</span>
                    <span
                      className={compareAttributes(car1.mileage, car2.mileage)}
                    >
                      {car1.mileage || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Specifications
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Year</span>
                    <span className={compareAttributes(car2.year, car1.year)}>
                      {car2.year || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Engine</span>
                    <span
                      className={compareAttributes(car2.engine, car1.engine)}
                    >
                      {car2.engine || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Fuel Type</span>
                    <span
                      className={compareAttributes(
                        car2.fuelType,
                        car1.fuelType
                      )}
                    >
                      {car2.fuelType || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Transmission</span>
                    <span
                      className={compareAttributes(
                        car2.transmission,
                        car1.transmission
                      )}
                    >
                      {car2.transmission || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Mileage</span>
                    <span
                      className={compareAttributes(car2.mileage, car1.mileage)}
                    >
                      {car2.mileage || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
              <div className="p-6 border-r border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-300">
                  {car1.description || "No description available."}
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-300">
                  {car2.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer section with legend */}
      <div className="max-w-7xl mx-auto mt-8 p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-300">Better value</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-300">Lower value</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-300">Equal value</span>
          </div>
        </div>
      </div>
    </div>
  );
}
