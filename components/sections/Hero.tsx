"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

export default function Hero() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "/hero1.png",
      subtitle: "life-changing",
      title: "travel, worldclass",
      description:
        "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
    },
    {
      image: "/hero2.png",
      subtitle: "extraordinary",
      title: "journeys, curated",
      description:
        "Handcrafted luxury itineraries through the soul of India — palaces, backwaters, mountains, and beyond.",
    },
    {
      image: "/hero3.png",
      subtitle: "adventurous",
      title: "explore, discover",
      description:
        "From the Himalayas to Kerala's backwaters, every journey is a masterpiece waiting to unfold.",
    },
  ];

  return (
    <section className="relative h-screen overflow-hidden">

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center animate-zoom"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative text-center px-6 max-w-5xl z-10">

                {/* Script Subtitle */}
                <p className="text-yellow-400 text-5xl md:text-6xl mb-4 italic font-light tracking-wide">
                  {slide.subtitle}
                </p>

                {/* Luxury Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight text-white">
                  {slide.title}
                </h1>


                {/* Description */}
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                  {slide.description}
                </p>


                {/* Buttons */}
                <div className="mt-10 flex gap-5 justify-center">
                  <button className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition rounded">
                    Explore Tours
                  </button>

                  <button className="px-10 py-3 border border-white hover:bg-white hover:text-black transition rounded">
                    Contact Us
                  </button>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition z-30"
      >
        <ChevronLeft size={50} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition z-30"
      >
        <ChevronRight size={50} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-3 h-3 rounded-full transition ${activeIndex === index
                ? "bg-yellow-400 scale-125"
                : "bg-white/50 hover:bg-yellow-300"
              }`}
          />
        ))}
      </div>

    </section>
  );
}
