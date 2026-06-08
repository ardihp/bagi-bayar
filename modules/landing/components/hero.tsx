"use client";

import { SubmitEvent, useState } from "react";
import { CircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
// import Image from "next/image";

export default function HeroSection() {
  const [email, setEmail] = useState<string>("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="container relative flex flex-col items-center justify-center gap-6 md:gap-10 px-4 md:px-6 py-16 md:py-24 lg:py-30">
      <div className="absolute top-16 md:top-30 size-60 md:size-100 rounded-full bg-secondary/2 blur-lg shadow-[0_0_25px] shadow-secondary/3" />

      <div className="flex items-center gap-2 py-1 px-2.5 rounded-full border border-secondary/30 bg-secondary/10">
        <div className="relative flex items-center justify-center">
          <HugeiconsIcon
            icon={CircleIcon}
            className="size-1.5 fill-secondary stroke-secondary"
          />

          <div className="size-2 rounded-full bg-secondary/50 absolute animate-ping" />
        </div>

        <p className="text-xs opacity-80 font-thin">Beta Release</p>
      </div>

      <div className="flex flex-col gap-3 md:gap-5">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center leading-[1.1em]">
          Wonderful Journey, <br />
          <span className="text-primary">Perfect Spending Record.</span>
        </h1>

        <p className="text-center max-w-2xl text-sm md:text-lg px-2">
          Record every destination and split the cost with friends without the
          drama. A premium solution for the modern traveler.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex border border-secondary/30 bg-secondary/5 rounded-full pl-3 pr-1.5 md:pl-4 md:pr-2 w-full max-w-[calc(100%-1rem)] sm:max-w-sm"
      >
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className="text-xs md:text-sm font-semibold focus-within:outline-none w-full min-w-0 text-foreground"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="pt-0.5 pb-3">
          <button className="btn-primary rounded-full!">
            <p className="text-xs md:text-sm whitespace-nowrap text-background font-bold">
              Get Started
            </p>
          </button>
        </div>
      </form>

      {/* <div className="relative w-full h-130 mt-20 shadow-[0_0_50px] shadow-secondary/20 rounded-2xl overflow-hidden">
        <Image
          src="/images/hero.jpg"
          fill
          sizes="1240px"
          alt="Hero Image"
          className="object-cover object-center"
          loading="lazy"
          quality={75}
        />
      </div> */}
    </div>
  );
}
