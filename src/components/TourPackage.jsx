// "use client";

// import { useState, useEffect } from "react";
// import PackageList from "@/components/PackageList";
// import PackageListSkeleton from "@/components/PackageListSkeleton";
// import { fetchPackages } from "@/data/tourpackage";
// import Filters from "@/components/Filters";

// export default function TourPackage({ searchParams }) {
//   const [packages, setPackages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [parsedSearchParams, setParsedSearchParams] = useState({});

//   console.log("searchParams", searchParams);
//   // Parse searchParams correctly
//   useEffect(() => {
//     async function parseSearchParams() {
//       if (
//         searchParams &&
//         typeof searchParams === "object" &&
//         searchParams.value
//       ) {
//         try {
//           const parsedParams = JSON.parse(searchParams.value); // Convert string to object
//           setParsedSearchParams(parsedParams);
//           console.log("Parsed SearchParams:", parsedParams); // Debugging
//         } catch (error) {
//           console.error("Error parsing searchParams:", error);
//         }
//       } else if (
//         (searchParams &&
//           typeof searchParams === "object" &&
//           searchParams?.destination) ||
//         searchParams?.maxPrice
//       ) {
//         console.log("searchParams heree", searchParams);
//         setParsedSearchParams({
//           destination: searchParams?.destination,

//           maxPrice: searchParams?.maxPrice,
//         });
//       }
//     }
//     parseSearchParams();
//   }, [searchParams]);

//   // Fetch packages and filter based on parsed search params
//   useEffect(() => {
//     const getPackages = async () => {
//       setIsLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulated delay
//       const data = await fetchPackages();
//       setPackages(data);
//       setIsLoading(false);
//     };

//     getPackages();
//   }, []);

//   let filteredPackages = packages;

//   if (parsedSearchParams?.destination) {
//     const normalizedDestination = parsedSearchParams.destination
//       .trim()
//       .toLowerCase();
//     const words = normalizedDestination.split(" ");

//     if (words.length > 1) {
//       // Case: If destination has 2 or more words, match it exactly in tags
//       const matchedPackage = packages.find((pkg) =>
//         pkg.tags.some((tag) => tag.toLowerCase() === normalizedDestination)
//       );
//       filteredPackages = matchedPackage ? [matchedPackage] : [];
//     } else {
//       // Case: Perform a partial match with package destination
//       filteredPackages = filteredPackages.filter((pkg) =>
//         pkg.destination.toLowerCase().includes(normalizedDestination)
//       );

//       console.log("filtering in pro mode", filteredPackages);
//     }
//   }

//   // Apply maxPrice filter
//   if (parsedSearchParams?.maxPrice) {
//     const maxPrice = Number(parsedSearchParams.maxPrice);
//     filteredPackages = filteredPackages.filter((pkg) => pkg.price <= maxPrice);
//   }

//   return (
//     <div>
//       {!searchParams?.destination && !searchParams?.maxPrice && <Filters />}
//       {isLoading ? (
//         <PackageListSkeleton />
//       ) : (
//         <>
//           {searchParams?.destination && searchParams?.maxPrice ? (
//             <h3 className="text-4xl font-bold mb-6">
//               Explore {searchParams?.destination} Tour Packages – under $
//               {searchParams?.maxPrice}
//             </h3>
//           ) : (
//             <h1 className="text-xl font-bold mb-6">
//               Please select your Tour Package
//             </h1>
//           )}
//           <PackageList packages={filteredPackages} />
//         </>
//       )}
//     </div>
//   );
// }



import PackageList from "@/components/PackageList"
import Filters from "./Filters"

export default async function TourPackage({ packages, searchParams, showFilterValue }) {

  const searchParamsData = await searchParams;

  console.log('searchparamdata', searchParamsData)


  return (
    <div>
      {searchParamsData?.destination && searchParamsData?.maxPrice ? (
        <h3 className="text-4xl font-bold mb-6">
          Explore {searchParamsData.destination} Tour Packages – under ${searchParamsData.maxPrice}
        </h3>
      ) : (
        <h1 className="text-xl font-bold mb-6">Please select your Tour Package</h1>
      )}
{
        showFilterValue ? <Filters destination={searchParams?.destination} maxPrice={searchParams?.maxPrice} /> : <Filters />
}
        
      <PackageList packages={packages} />
    </div>
  )
}

