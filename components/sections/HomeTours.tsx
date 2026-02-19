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
    <section className="py-24 bg-gray-50">

      {/* ================= MAIN HEADING ================= */}
      <div className="text-center mb-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Explore Our Curated Journeys
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Handpicked premium travel experiences crafted for unforgettable memories.
        </p>
      </div>

      {/* ================= TRENDING SECTION ================= */}
      {data?.trending?.length > 0 && (
        <div className="mb-24">

          <div className="flex items-center gap-3 mb-10 px-6">
            <span className="text-3xl">🔥</span>
            <h3 className="text-3xl font-semibold">
              Trending Tours
            </h3>
          </div>

          <div className="overflow-x-auto px-6">
            <div className="flex gap-8 w-max">

              {data.trending.map((tour: Tour) => (
                <div
                  key={tour._id}
                  className="flex-shrink-0 
                             w-[240px] 
                             md:w-[260px] 
                             lg:w-[280px] 
                             xl:w-[300px]"
                >
                  <TourCard tour={tour} />
                </div>
              ))}

            </div>
          </div>

        </div>
      )}

      {/* ================= POPULAR SECTION ================= */}
      {data?.popular?.length > 0 && (
        <div>

          <div className="flex items-center gap-3 mb-10 px-6">
            <span className="text-3xl">⭐</span>
            <h3 className="text-3xl font-semibold">
              Popular Tours
            </h3>
          </div>

          <div className="overflow-x-auto px-6">
            <div className="flex gap-8 w-max">

              {data.popular.map((tour: Tour) => (
                <div
                  key={tour._id}
                  className="flex-shrink-0 
                             w-[240px] 
                             md:w-[260px] 
                             lg:w-[280px] 
                             xl:w-[300px]"
                >
                  <TourCard tour={tour} />
                </div>
              ))}

            </div>
          </div>

        </div>
      )}

    </section>
  );
}
