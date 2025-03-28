"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";
import { Product } from "../../../types";

export default function HomePage() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getLatestProducts();
        setLatestProducts(products);
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" />
    </>
  );
}
