import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const PRODUCTS_QUERY = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  slug,
  price,
  image
}`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const options = { next: { revalidate: 30 } };

export default async function ProductsPage() {
  const products = await client.fetch(PRODUCTS_QUERY, {}, options);

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow">
            {product.image && (
              <img
                src={urlFor(product.image).width(300).height(200).url()}
                alt={product.name}
                className="rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <Link
              href={`/products/${product.slug.current}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
