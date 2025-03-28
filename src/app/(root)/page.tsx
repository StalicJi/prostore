export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import ProductList from "@/components/shared/product/product-list";
// import sampleData from "../../../db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const latestProductsRaw = await getLatestProducts();
  const latestProducts = latestProductsRaw.map((prod) => ({
    ...prod,
    price: prod.price.toString(),
    rating: prod.rating.toString(),
  }));

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" limit={4} />
    </>
  );
}
