import HeroSection from '@/components/HeroSection';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <HeroSection />
    </main>
  )
}
