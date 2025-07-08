"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useGetPortfolios,
  useGetPortfoliosByFields,
} from "@/services/portfolios";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/all";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface ClientData {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Sample client data - replace with your actual data
const clientsData: ClientData[] = [
  { id: 1, name: "Company A", logo: "/logo.svg", alt: "Company A Logo" },
  { id: 2, name: "Company B", logo: "/logo.svg", alt: "Company B Logo" },
  { id: 3, name: "Company C", logo: "/logo.svg", alt: "Company C Logo" },
  { id: 4, name: "Company D", logo: "/logo.svg", alt: "Company D Logo" },
  { id: 5, name: "Company E", logo: "/logo.svg", alt: "Company E Logo" },
  { id: 6, name: "Company F", logo: "/logo.svg", alt: "Company F Logo" },
  { id: 7, name: "Company G", logo: "/logo.svg", alt: "Company G Logo" },
  { id: 8, name: "Company H", logo: "/logo.svg", alt: "Company H Logo" },
  { id: 9, name: "Company I", logo: "/logo.svg", alt: "Company I Logo" },
  { id: 10, name: "Company J", logo: "/logo.svg", alt: "Company J Logo" },
];

export const OurClients = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update carousel state
  const updateCarouselState = useCallback(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    updateCarouselState();

    api.on("select", updateCarouselState);

    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api, updateCarouselState]);

  const handlePrevious = useCallback(() => {
    if (api && canScrollPrev) {
      api.scrollPrev();
    }
  }, [api, canScrollPrev]);

  const handleNext = useCallback(() => {
    if (api && canScrollNext) {
      api.scrollNext();
    }
  }, [api, canScrollNext]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const { data: clients, isPending } = useGetPortfolios();

  useEffect(() => {
    if (clients?.payload) {
      setCount(clients?.payload?.length);
      if (clients) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 400);
      }
    }
  }, [clients]);
  return (
    <section
      className="our-clients w-full bg-white py-16 border"
      aria-label="Our Clients"
      id="our-clients"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Clients</h2>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              skipSnaps: false,
              dragFree: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isPending &&
                clientsData.map((client) => (
                  <CarouselItem
                    key={client.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 pl-4"
                  >
                    <div className="flex select-none items-center justify-center h-24 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
                      <div className="relative w-full h-full">
                        <Link href={"/"}>
                          <Image
                            src={client.logo}
                            alt={client.alt}
                            fill
                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          />
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              {!isPending &&
                clients?.payload?.map((client) => (
                  <CarouselItem
                    key={client._id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 pl-4"
                  >
                    <div className="flex select-none items-center justify-center h-24 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
                      <div className="relative w-full h-full">
                        <Link href={`/clients/${client?._id}`}>
                          <Image
                            src={client.logo}
                            alt={client.name}
                            fill
                            className="object-contain transition-all duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          />
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={!canScrollPrev}
              className={clsx(
                "p-3 rounded-full border border-gray-300 bg-white hover:bg-primary/20 transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
              aria-label="Previous clients"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 mx-4">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={clsx(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    current === index + 1
                      ? "bg-primary"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canScrollNext}
              className={clsx(
                "p-3 rounded-full border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
              aria-label="Next clients"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
