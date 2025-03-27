import ProductList from "@/components/shared/product/product-list";
// import sampleData from "../../../db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.action";

export default async function HomePage() {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" />
    </>
  );
}
