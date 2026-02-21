import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/ui/BookingForm";

const query = `
*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  galleryImages,
  overview,
  price,
  duration,
  highlights,
  itinerary[]{
    day,
    details
  },
  inclusions,
  exclusions
}
`;

interface Itinerary {
  day: string;
  details: string;
}

interface Tour {
  _id: string;
  title: string;
  mainImage?: any;
  galleryImages?: any[];
  overview?: string;
  price?: number;
  duration?: string;
  highlights?: string[];
  itinerary?: Itinerary[];
  inclusions?: string[];
  exclusions?: string[];
}

interface PageProps {
  params: { slug: string };
}

export default async function TourDetails({ params }: PageProps) {
  const { slug } = params;

  const tour: Tour = await sanityClient.fetch(query, { slug });

  if (!tour) return notFound();

  return (
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[75vh]">
        {tour.mainImage && (
          <Image
            src={urlFor(tour.mainImage).url()}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {tour.title}
          </h1>

          <div className="flex gap-4">
            {tour.duration && (
              <span className="bg-white/20 backdrop-blur px-5 py-2 rounded-full">
                {tour.duration}
              </span>
            )}

            {tour.price && (
              <span className="bg-yellow-500 px-5 py-2 rounded-full font-semibold text-black">
                ₹{tour.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-3 gap-14">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-24">

          {/* -------- GALLERY -------- */}
          {tour.galleryImages && tour.galleryImages.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Gallery</h2>

              <div className="grid grid-cols-2 gap-4">
                {tour.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-52 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt="Gallery"
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- OVERVIEW -------- */}
          {tour.overview && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tour.overview}
              </p>
            </section>
          )}

          {/* -------- HIGHLIGHTS -------- */}
          {tour.highlights && tour.highlights.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Highlights</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {tour.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- ITINERARY -------- */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <section className="bg-gray-50 p-10 rounded-3xl">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Tour Itinerary
              </h2>

              <div className="space-y-6">
                {tour.itinerary.map((day, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">
                        {day.day}
                      </h3>

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Day {i + 1}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {day.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- INCLUSIONS & EXCLUSIONS -------- */}
          <section className="grid md:grid-cols-2 gap-10">

            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-green-700">
                  ✓ Inclusions
                </h2>

                <ul className="space-y-3">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-red-700">
                  ✕ Exclusions
                </h2>

                <ul className="space-y-3">
                  {tour.exclusions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-red-600 font-bold">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </section>

        </div>

        {/* RIGHT SIDE BOOKING CARD */}
        <BookingForm price={tour.price} />

      </section>
    </div>
  );
}