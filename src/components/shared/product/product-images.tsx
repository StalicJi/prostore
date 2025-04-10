"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ImagesProps) {
  // console.log(images);
  const [current, setCurrent] = useState<number>(0);

  return (
    <div className="space-x-4">
      <Image
        src={images[current]}
        height={1000}
        width={1000}
        alt="Product Image"
        className="min-h-[300]px object-cover object-center"
      />
      <div className="flex">
        {images.map((img, idx) => (
          <div
            key={img}
            onClick={() => setCurrent(idx)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === idx && "border-orange-500"
            )}
          >
            <Image src={img} width={100} height={100} alt="image" />
          </div>
        ))}
      </div>
    </div>
  );
}
