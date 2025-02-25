// import Filters from "@/components/Filters";
// import TourPackage from "@/components/TourPackage";
// import { fetchPackages, getAllPrices, getAllTagsForSitemap } from "@/data/tourpackage";
// import React, { Suspense } from "react";

// export const revalidate = 86400; // refrsh cached pages only after 24 hours

// export async function generateStaticParams() {
//   const allPrices = await getAllPrices();
//   const allTags = await getAllTagsForSitemap();

//   const staticParams = allPrices.flatMap(price =>
//     allTags.map(tag => ({ tag, price }))
//   );

//   console.log("Generated Static Params:", staticParams);  // Debugging line

//   return staticParams;
// }
// export async function generateMetadata({ params }) {
//   const { destination, minPrice, maxPrice } = params;

//   return {
//     title: `Explore ${decodeURIComponent(
//       destination
//     )} Tour Packages – Prices from $${minPrice} to $${maxPrice} | Travoxis Technology Sdn Bhd`,
//     description: `Find the best ${decodeURIComponent(
//       destination
//     )} tour packages under $${maxPrice}. Book your perfect travel experience today!`,
//   };
// }

// async function Page({ params }) {
//   const { destination, minPrice, maxPrice } = params;

//   const searchParams = {
//     destination: decodeURIComponent(destination),
//     minPrice,
//     maxPrice,
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Travel Packages</h1>

//           <Filters
//             destination={decodeURIComponent(destination)}
//             minPrice={minPrice}
//             maxPrice={maxPrice}
//           />

//         <TourPackage searchParams={searchParams} />
//       </div>
//     </div>
//   );
// }

// export default Page;

import Filters from "@/components/Filters";
import TourPackage from "@/components/TourPackage";
import {
  fetchPackages,
  getAllPrices,
  getAllTagsForSitemap,
} from "@/data/tourpackage";
import { Suspense } from "react";

export const revalidate = 86400; // refresh cached pages only after 24 hours

export async function generateStaticParams() {
  const allPrices = await getAllPrices();
  const allTags = await getAllTagsForSitemap();

  const staticParams = allTags.flatMap((tag) =>
    allPrices.map((price) => ({
      destination: decodeURIComponent(tag),
      maxPrice: price.toString(),
    }))
  );

  console.log("Generated Static Params:", staticParams); // Debugging line

  return staticParams;
}

export async function generateMetadata({ params }) {
  const { destination, maxPrice } = await params;

  return {
    title: `Explore ${decodeURIComponent(
      destination
    )} Tour Packages – Prices up to $${maxPrice} | Travoxis Technology Sdn Bhd`,
    description: `Find the best ${decodeURIComponent(
      destination
    )} tour packages under $${maxPrice}. Book your perfect travel experience today!`,
  };
}

async function Page({ params }) {
  const { destination, maxPrice } = await params;

  // Decode and normalize destination
  const decodedDestination = destination
    ? decodeURIComponent(destination).trim().toLowerCase()
    : "";
  const words = decodedDestination.split(/\s+/); // Handle multi-word destinations

  const searchParams = { destination: decodedDestination, maxPrice };

  // Fetch all packages
  const allPackages = await fetchPackages();
  let filteredPackages = allPackages;

  // Filter by destination
  if (decodedDestination) {
    if (words.length > 1) {
      // If destination has multiple words, match exactly in tags
      filteredPackages = allPackages.filter((pkg) =>
        pkg.tags.some((tag) => tag.toLowerCase() === decodedDestination)
      );
    } else {
      // If single word, perform partial match in `destination`
      filteredPackages = allPackages.filter((pkg) =>
        pkg.destination.toLowerCase().includes(decodedDestination)
      );
    }
  }

  // Filter by maxPrice
  if (maxPrice) {
    const maxPriceAmount = Number(maxPrice);
    filteredPackages = filteredPackages.filter(
      (pkg) => pkg.price <= maxPriceAmount
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Travel Packages</h1>
        <TourPackage
          packages={filteredPackages}
          searchParams={searchParams}
          showFilterValue={true}
        />
      </div>
    </div>
  );
}

export default Page;
