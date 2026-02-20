import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import { notFound } from "next/navigation";
import TourCard from "@/components/cards/TourCard";

/* ================= UNIVERSAL GROQ QUERY ================= */
const query = `
{
  "country": *[_type == "country" && slug.current == $slug][0]{
    _id,
    name,
    mainImage,
    shortDescription,
    description,
    gallery[]
  },

  "state": *[_type == "state" && slug.current == $slug][0]{
    _id,
    name,
    mainImage,
    shortDescription,
    description,
    gallery[],
    country->{
      name
    }
  },

  "tours": *[
    _type == "tour" &&
    (
      state->slug.current == $slug ||
      state->country->slug.current == $slug
    )
  ]{
    _id,
    title,
    slug,
    mainImage,
    shortDescription,
    price,
    duration,
    category   // ✅ IMPORTANT
  }
}
`;

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  // ✅ IMPORTANT FIX FOR NEXT 16
  const { slug } = await params;

  if (!slug) return notFound();

  const data = await sanityClient.fetch(query, { slug });

  if (!data) return notFound();

  const pageData = data.state ?? data.country;
  if (!pageData) return notFound();

  const tours = data.tours ?? [];

  return (
    <div className="bg-white pt-32">

      {/* HERO */}
      <section className="relative h-[70vh]">
        {pageData.mainImage && (
          <Image
            src={urlFor(pageData.mainImage).url()}
            alt={pageData.name}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Explore {pageData.name}
            </h1>

            {pageData.shortDescription && (
              <p className="text-white max-w-2xl mx-auto text-lg opacity-90">
                {pageData.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Available Tours in {pageData.name}
        </h2>

        {tours.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No tours available yet.
          </p>
        ) : (
          <div className="grid 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3 
                          gap-12">

            {tours.map((tour: any) => (
              <TourCard key={tour._id} tour={tour} />
            ))}

          </div>
        )}
      </section>

    </div>
  );
}