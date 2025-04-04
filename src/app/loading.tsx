import React from "react";
import Image from "next/image";
import loader from "@/assets/loader.gif";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} height={100} width={100} alt="loading..." />
    </div>
  );
}
