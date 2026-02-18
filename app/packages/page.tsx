import { sanityClient } from "@/lib/sanity.client";
import PackagesClient from "./PackagesClient";

const query = `
{
  "tours": *[_type == "tour"]{
    _id,
    title,
    slug,
    shortDescription,
    duration,
    price,
    mainImage,
    state->{
      _id,
      name,
      slug
    },
    country->{
      _id,
      name,
      slug
    }
  },
  "countries": *[_type == "country"]{
    _id,
    name
  },
  "states": *[_type == "state"]{
    _id,
    name,
    country->{
      name
    }
  }
}
`;

export default async function PackagesPage() {
  const data = await sanityClient.fetch(query);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] pt-44 pb-36 text-white">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-6 whitespace-nowrap">
  Discover Your Perfect Journey
</h1>


          <p className="text-lg md:text-xl opacity-90">
            Explore curated India and International tours crafted for unforgettable experiences.
          </p>

        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        <PackagesClient data={data} />
      </div>

    </div>
  );
}
