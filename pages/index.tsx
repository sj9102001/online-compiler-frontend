import HeroSection from "@/components/HeroSection";
import { Inter } from "next/font/google";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="flex  flex-col items-center pt-12 justify-between bg-dark-main">
      <HeroSection />
    </main>
  );
}
