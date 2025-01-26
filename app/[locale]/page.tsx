"use client"

import { Hero } from "@/app/_components/ui/hero"
import { Features } from "@/app/_components/ui/features"
import { MouseTrail } from "@/app/_components/effects/mouse-trail"

export default function LocalePage() {
  return (
    <>
      <MouseTrail />
      <Hero />
      <Features />
    </>
  );
}
