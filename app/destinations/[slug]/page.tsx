import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourCard from "@/components/cards/TourCard";

/* ================= UNIVERSAL GROQ QUERY ================= */
const query = `
{
  "country": *[_type == "country" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    shortDescription,
    description,
    gallery[]
  },

  "state": *[_type == "state" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    shortDescription,
    description,
    gallery[],
    country->{
      name,
      slug
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
    duration
  }
}
`;

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  if (!slug) return notFound();

  let data;

  try {
    data = await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return notFound();
  }

  if (!data) return notFound();

  const pageData = data.state ?? data.country;
  if (!pageData) return notFound();

  const tours = data.tours ?? [];

  return (
    <div className="bg-white pt-32">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[75vh]">
        {pageData.mainImage && (
          <Image
            src={urlFor(pageData.mainImage).url()}
            alt={pageData.name}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore {pageData.name}
          </h1>

          {pageData.shortDescription && (
            <p className="text-white max-w-3xl text-lg opacity-90">
              {pageData.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}
      {pageData.description && (
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            About {pageData.name}
          </h2>

          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center text-lg">
            {pageData.description}
          </p>
        </section>
      )}

      {/* ================= GALLERY ================= */}
      {pageData.gallery?.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Destination Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pageData.gallery.map((img: any, index: number) => (
                <div
                  key={index}
                  className="relative h-56 rounded-2xl overflow-hidden shadow-md"
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
          </div>
        </section>
      )}

      {/* ================= TOURS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Available Tours in {pageData.name}
        </h2>

        {tours.length === 0 ? (
          <p className="text-center text-gray-500">
            No tours available yet.
          </p>
        ) : (
          <div className="grid 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3 
                          gap-10">

            {tours.map((tour: any) => (
              <TourCard key={tour._id} tour={tour} />
            ))}

          </div>
        )}
      </section>

    </div>
  );
}
