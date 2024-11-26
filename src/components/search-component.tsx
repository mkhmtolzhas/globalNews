// 'use client'

// import { useState } from 'react'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// // Mock data for demonstration
// const mockData = [
//   { id: 1, title: "First Item", description: "This is the first item" },
//   { id: 2, title: "Second Item", description: "This is the second item" },
//   { id: 3, title: "Third Item", description: "This is the third item" },
//   { id: 4, title: "Fourth Item", description: "This is the fourth item" },
//   { id: 5, title: "Fifth Item", description: "This is the fifth item" },
// ]

// export default function SearchComponent() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<typeof mockData>([])

//   const handleSearch = () => {
//     // Filter mock data based on search query
//     const results = mockData.filter(item =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     setSearchResults(results)
//   }

//   return (
//     <div>
//       <div className="flex gap-2 mb-4">
//         <Input
//           type="text"
//           placeholder="Enter your search query"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />
//         <Button onClick={handleSearch}>Search</Button>
//       </div>
      
//       {searchResults.length > 0 ? (
//         <ul className="space-y-2">
//           {searchResults.map(item => (
//             <li key={item.id} className="border p-4 rounded-md">
//               <h2 className="text-lg font-semibold">{item.title}</h2>
//               <p className="text-gray-600">{item.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No results found. Try a different search query.</p>
//       )}
//     </div>
//   )
// }

