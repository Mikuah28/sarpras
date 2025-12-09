export default async function ItemDetail({ params }) {
  const res = await fetch(`/api/admin/items/${params.id}`, {
    cache: "no-store",
  });

  const item = await res.json();


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="text-gray-600">{item.description}</p>
      <p className="mt-2">Kategori: {item.category?.name}</p>

      <img
        src={item.image}
        className="w-64 h-64 object-cover mt-4 rounded"
      />
    </div>
  );
}
