import Image from "next/image"
import Link from "next/link"


export default function PackageList({ packages}) {



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
                <Link href={`/packageDetailsPage/${pkg.id}`} key={pkg.id} className="block">
                    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
                        <div className="relative w-full h-56 overflow-hidden group">
                            <Image
                                src={pkg.image}
                                alt={pkg.name}
                                layout="fill"
                                objectFit="cover"
                                className="group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                            <p className="text-gray-600 mb-2">{pkg.description}</p>
                            <p className="font-bold text-lg">${pkg.price}</p>
                            <p className="text-sm text-gray-500">
                                {pkg.duration} days in {pkg.destination}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

