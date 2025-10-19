"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32">
        <Image
          src="/car-hero.jpg"
          alt="Luxury Car"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-50"
        />
        <h1 className="text-5xl sm:text-7xl font-bold relative z-10">
          Experience the Future of Driving
        </h1>
        <p className="text-lg sm:text-2xl mt-4 relative z-10">
          Innovation, Power, and Elegance in Every Model
        </p>
        <button
          onClick={() => router.push("/products/1")}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg relative z-10"
        >
          Explore Models
        </button>
      </section>
      <section className="px-6 py-16 sm:py-24 text-center">
        <h2 className="text-4xl font-semibold mb-8">Featured Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Image
              src="/car1.jpg"
              alt="Model X"
              width={500}
              height={200}
              className="rounded"
            />
            <h3 className="text-2xl mt-4">Kia EV9</h3>
            <p className="text-gray-400">
              An electric SUV with luxury and performance.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Image
              src="/car2.jpg"
              alt="Model S"
              width={500}
              height={200}
              className="rounded"
            />
            <h3 className="text-2xl mt-4">BMW 3 Series (F30)</h3>
            <p className="text-gray-400">
              A sleek sedan with cutting-edge technology.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Image
              src="/car3.jpg"
              alt="Model Z"
              width={500}
              height={200}
              className="rounded"
            />
            <h3 className="text-2xl mt-4">Mercedes-AMG GT</h3>
            <p className="text-gray-400">
              A futuristic sports car designed for speed.
            </p>
          </div>
        </div>
      </section>
      <section className="text-center px-6 py-16 bg-red-600 text-white">
        <h2 className="text-4xl font-semibold">Book a Test Drive Today</h2>
        <p className="text-lg mt-2">
          Experience the thrill of our latest models.
        </p>
        <button
          onClick={() => router.push("/schedule")}
          className="mt-6 px-6 py-3 bg-white text-red-600 text-lg font-medium rounded-lg hover:bg-gray-200"
        >
          Schedule Now
        </button>
      </section>
    </div>
  );
}
