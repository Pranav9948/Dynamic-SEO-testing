import Filters from "@/components/Filters";
import TourPackage from "@/components/TourPackage";
import { fetchPackages, getAllPrices, getAllTagsForSitemap } from "@/data/tourpackage";
import React, { Suspense } from "react";

export const revalidate = 86400; // refrsh cached pages only after 24 hours

export async function generateStaticParams() {
  const allPrices = await getAllPrices();
  const allTags = await getAllTagsForSitemap();

  const staticParams = allPrices.flatMap(price =>
    allTags.map(tag => ({ tag, price }))
  );

  console.log("Generated Static Params:", staticParams);  // Debugging line

  return staticParams;
}
export async function generateMetadata({ params }) {
  const { destination, minPrice, maxPrice } = params;

  return {
    title: `Explore ${decodeURIComponent(
      destination
    )} Tour Packages – Prices from $${minPrice} to $${maxPrice} | Travoxis Technology Sdn Bhd`,
    description: `Find the best ${decodeURIComponent(
      destination
    )} tour packages starting from $${minPrice} up to $${maxPrice}. Book your perfect travel experience today!`,
  };
}

async function Page({ params }) {
  const { destination, minPrice, maxPrice } = params;

  const searchParams = {
    destination: decodeURIComponent(destination),
    minPrice,
    maxPrice,
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Travel Packages</h1>
        <Suspense fallback={<div>Loading filters...</div>}>
        <Filters
          destination={decodeURIComponent(destination)}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        </Suspense>
        <TourPackage searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Page;
