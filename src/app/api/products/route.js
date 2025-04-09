import { client } from "@/sanity/client";

const PRODUCTS_QUERY = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  slug,
  price,
  image
}`;

const options = { next: { revalidate: 30 } };

export async function GET() {
  try {
    const products = await client.fetch(PRODUCTS_QUERY, {}, options);
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
