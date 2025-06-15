"use client";

import React from "react";
import { TourAndTravel } from "@/types";

interface Props {
  packageData: TourAndTravel;
}

export default function Section1({ packageData }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{packageData.name_package}</h1>
    </div>
  );
}
