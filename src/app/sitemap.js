import { getAllPrices, getAllTagsForSitemap } from "@/data/tourpackage";

export default async function sitemap() {


  const allTags = await getAllTagsForSitemap();
  const allPrices = await getAllPrices();

  const searchLandingPages = allPrices
    .map((price) =>
      allTags.map((tag) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/packages/${tag}/${price}`,
        lastModified: "2024-12-31",
        changeFrequency: "weekly",
        priority: 1,
      }))
    )
    .flat();

  return [
    // insert other pages here

    {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: "2024-12-31",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // Our pSEO pages:
    ...searchLandingPages,
  ];
}


