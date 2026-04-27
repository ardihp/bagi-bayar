import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // Disable service worker in development for easier debugging
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Empty turbopack config to allow build with Turbopack
  // while using webpack-based serwist in production
  turbopack: {},
};

export default withSerwist(nextConfig);
