"use client";

import { useState, useEffect } from "react";
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by name
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number(maxPrice));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-4xl p-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:underline">
            <span className="mr-2">←</span> Back to Posts
          </Link>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-blue-600 hover:underline">
          <span className="mr-2">←</span> Back to Posts
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow">
            {product.image && (
              <img src={urlFor(product.image)} alt={product.name} className="rounded mb-4" />
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

      {/* No Results Message */}
      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </main>
  );
}
