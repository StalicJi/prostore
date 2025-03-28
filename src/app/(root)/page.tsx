import ProductList from "@/components/shared/product/product-list";
// import sampleData from "../../../db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const latestProducts = await getLatestProducts();
  console.log(latestProducts);

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" />
    </>
  );
}
