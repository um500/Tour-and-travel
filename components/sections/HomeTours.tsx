import { sanityClient } from "@/lib/sanity.client";
import { homeToursQuery } from "@/lib/queries";
import TourCard from "@/components/cards/TourCard";

interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  duration: string;
  shortDescription: string;
  mainImage: any;
}

export default async function HomeTours() {
  const data = await sanityClient.fetch(homeToursQuery);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Explore Our Curated Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked premium travel experiences crafted for unforgettable memories.
          </p>
        </div>

        {/* Trending Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold mb-8">🔥 Trending Tours</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {data.trending.map((tour: Tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>

        {/* Popular Section */}
        <div>
          <h3 className="text-3xl font-semibold mb-8">⭐ Popular Tours</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {data.popular.map((tour: Tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
