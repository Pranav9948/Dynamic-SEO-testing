import { packages } from "@/data/tourpackage"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }) {
    const pkg = packages.find((p) => p.id === params.id)

    if (!pkg) {
        return {
            title: "Package Not Found",
        }
    }

    return {
        title: `${pkg.name} | Travoxis Technology Sdn Bhd`,
        description: pkg.description,
    }
}

export default function PackageDetails({ params }) {
    const pkg = packages.find((p) => p.id === params.id)

    if (!pkg) {
        return <div>Package not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Link */}
            <Link href="/packages" className="text-blue-500 hover:underline mb-4 inline-block">
                &larr; Back to Packages
            </Link>

            {/* Grid Layout for Image & Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left - Image */}
                <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                </div>

                {/* Right - Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{pkg.name}</h1>
                    <p className="text-lg text-gray-700">{pkg.description}</p>

                    <div className="flex items-center space-x-4">
                        <p className="text-2xl font-semibold text-green-600">${pkg.price}</p>
                        <p className="text-lg text-gray-600">{pkg.duration} days in {pkg.destination}</p>
                    </div>

                    {/* Book Now Button */}
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300 shadow-md">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

