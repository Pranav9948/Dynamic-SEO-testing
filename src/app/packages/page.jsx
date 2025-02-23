import {
  fetchPackages,
  getAllPrices,
  getAllTagsForSitemap,
} from "@/data/tourpackage";
import PackageList from "@/components/PackageList";
import Filters from "@/components/Filters";
import { Suspense } from "react";
import PackageListSkeleton from "@/components/PackageListSkeleton";
import TourPackage from "@/components/TourPackage";
import dotenv from "dotenv";

export const metadata = {
  title: "Travoxis Technology Sdn Bhd",
  description:
    "TRAVOXIS is not just a hospitality booking system. We offer a variety of customizable features designed to suit a wide range of hospitality clients from resorts, hotels, Bed & Breakfasts, and guest houses.",
};

export default async function PackagesPage({ searchParams }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Travel Packages</h1>

      <TourPackage searchParams={searchParams} />
    </div>
  );
}
