import ProductList from "@/components/shared/product/product-list";
import sampleData from "../../../db/sample-data";

export default function HomePage() {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrival"
        limit={4}
      />
    </>
  );
}
