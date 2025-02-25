// "use client"

// import { useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function Filters({destination,maxPrice,minPrice}) {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const [destinations, setDestination] = useState(searchParams.get("destination") || "")
//     const [minPrices, setMinPrice] = useState(searchParams.get("minPrice") || "")
//     const [maxPrices, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

//     const handleFilter = () => {
//         const params = new URLSearchParams()
//         router.push(`/packages/${destinations}/${maxPrices}`)
//     }

//     return (
//         <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Filter Packages</h2>
//             <div className="flex flex-wrap gap-4">
//                 <input
//                     type="text"
//                     placeholder="Destination"
//                     value={destination || destinations}
//                     onChange={(e) => setDestination(e.target.value)}
//                     className="p-2 border rounded"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Min Price"
//                     value={minPrice || minPrices}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                     className="p-2 border rounded"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max Price"
//                     value={maxPrice || maxPrices}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                     className="p-2 border rounded"
//                 />
//                 <button onClick={handleFilter} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                     Apply Filters
//                 </button>
//             </div>
//         </div>
//     )
// }






"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Filters({ destination="", maxPrice=""}) {
    const router = useRouter()
  
    const [destinations, setDestination] = useState("")
    const [minPrices, setMinPrice] = useState("")
    const [maxPrices, setMaxPrice] = useState("")

    const handleFilter = () => {
        const params = new URLSearchParams()
        router.push(`/packages/${destinations}/${maxPrices}`)
    }

    return (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Filter Packages</h2>
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Destination"
                    value={destinations || destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrices || maxPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrices}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="p-2 border rounded"
                />
                <button onClick={handleFilter} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Apply Filters
                </button>
            </div>
        </div>
    )
}















