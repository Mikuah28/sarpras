// "use client";

// import { useEffect, useState } from "react";

// export default function CategoryList() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch("/api/category");
//       const data = await res.json();
//       setCategories(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>

//       <ul className="space-y-2">
//         {categories.map((c) => (
//           <li
//             key={c.id}
//             className="border p-3 rounded bg-white shadow-sm"
//           >
//             {c.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
