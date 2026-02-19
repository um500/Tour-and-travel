import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  duration: string;
  shortDescription: string;
  mainImage: any;
}

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="group bg-white rounded-3xl 
                    shadow-md hover:shadow-2xl 
                    transition-all duration-500 
                    hover:-translate-y-2 
                    flex flex-col 
                    w-full 
                    h-[500px]">

      {/* ===== IMAGE SECTION ===== */}
      <div className="relative h-[250px] w-full overflow-hidden rounded-t-3xl">
        <Image
          src={urlFor(tour.mainImage).url()}
          alt={tour.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="absolute top-4 right-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {tour.duration}
        </div>

        <div className="absolute bottom-4 left-4 bg-[#F0B100] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          ₹{tour.price.toLocaleString()}
        </div>
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="flex-1 px-5 pt-5 flex flex-col">

        {/* Fixed height title area */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[52px]">
          {tour.title}
        </h3>

        {/* Fixed height description area */}
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
          {tour.shortDescription}
        </p>

      </div>

      {/* ===== BUTTON SECTION ===== */}
      <div className="px-5 pb-5 mt-auto">
        <Link
          href={`/packages/${tour.slug.current}`}
          className="w-full flex items-center justify-center gap-2 
                     bg-[#F0B100] text-white 
                     py-3 rounded-full 
                     font-semibold text-sm 
                     transition-all duration-300 
                     hover:bg-[#d89f00] 
                     hover:gap-3 
                     shadow-md hover:shadow-lg"
        >
          View Details →
        </Link>
      </div>

    </div>
  );
}
