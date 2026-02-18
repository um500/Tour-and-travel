import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ================= GROQ QUERY ================= */
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

  "tours": *[
    _type == "tour" &&
    state->country->slug.current == $slug
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

  /* ✅ Next.js 16 requires await on params */
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  /* ✅ Pass slug correctly to Sanity */
  const data = await sanityClient.fetch(query, { slug });

  if (!data || !data.country) {
    return notFound();
  }

  const country = data.country;
  const tours = data.tours || [];

  return (
    <div className="bg-white pt-32">

      {/* ================= HERO ================= */}
      <section className="relative h-[75vh]">
        {country.mainImage && (
          <Image
            src={urlFor(country.mainImage).url()}
            alt={country.name}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore {country.name}
          </h1>

          {country.shortDescription && (
            <p className="text-white max-w-3xl text-lg opacity-90">
              {country.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* ================= DESCRIPTION ================= */}
      {country.description && (
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            About {country.name}
          </h2>

          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center text-lg">
            {country.description}
          </p>
        </section>
      )}

      {/* ================= GALLERY ================= */}
      {country.gallery?.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Destination Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {country.gallery.map((img: any, index: number) => (
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
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Available Tours in {country.name}
        </h2>

        {tours.length === 0 ? (
          <p className="text-center text-gray-500">
            No tours available yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {tours.map((tour: any) => (
              <Link
                key={tour._id}
                href={`/packages/${tour.slug?.current}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="relative h-56">
                  {tour.mainImage && (
                    <Image
                      src={urlFor(tour.mainImage).url()}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {tour.duration && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 text-sm font-semibold rounded-full shadow">
                      {tour.duration}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {tour.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tour.shortDescription}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 font-bold text-lg">
                      ₹{tour.price?.toLocaleString()}
                    </span>

                    <span className="text-blue-600 font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
