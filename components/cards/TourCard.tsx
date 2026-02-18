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
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={urlFor(tour.mainImage).url()}
          alt={tour.title}
          width={600}
          height={400}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-sm font-semibold px-4 py-1 rounded-full shadow">
          {tour.duration}
        </div>

        {/* Price Floating Badge */}
        <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          ₹{tour.price.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {tour.shortDescription}
        </p>

        <Link href={`/packages/${tour.slug.current}`}
          className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 gap-1 transition-all"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
