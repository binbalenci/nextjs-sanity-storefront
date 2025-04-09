import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source) => {
  if (!source) return null;
  if (source._upload) {
    return source._upload.previewImage;
  }
  if (projectId && dataset) {
    const builder = imageUrlBuilder({ projectId, dataset });
    return builder.image(source).width(300).height(200).url();
  }
  return null;
};

const options = { next: { revalidate: 30 } };

export default async function ProductPage({ params }) {
  const product = await client.fetch(PRODUCT_QUERY, { slug: params.slug }, options);

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <Link href="/products" className="flex items-center text-blue-600 hover:underline">
          <span className="mr-2">←</span> Back to Products
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <img src={urlFor(product.image)} alt={product.name} className="rounded-lg w-full" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">${product.price}</p>
          <div className="prose">
            {product.description && <PortableText value={product.description} />}
          </div>
        </div>
      </div>
    </main>
  );
}
