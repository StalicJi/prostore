"use client";

import React from "react";
import { CartItem } from "../../../../types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.action";

interface CartProps {
  item: CartItem;
}

export default function AddToCart({ item }: CartProps) {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    console.log(res);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Go To Cart",
        onClick: () => {
          router.push("/cart");
        },
      },
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
}
