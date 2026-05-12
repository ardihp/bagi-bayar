import React from "react";

export default function FeaturesSection() {
  return (
    <div id="features" className="flex flex-col px-12 py-8 gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="text-sm font-thin opacity-60 max-w-md">
          Designed for discerning finance teams who demand both elegance and
          absolute precision.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 group">
        <div className="feature-card col-span-2">
          <h3 className="text-lg font-semibold">Feature 1</h3>
          <p className="text-sm font-thin opacity-60">
            Description of feature 1.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="text-lg font-semibold">Feature 2</h3>
          <p className="text-sm font-thin opacity-60">
            Description of feature 2.
          </p>
        </div>

        <div className="feature-card col-span-3">
          <h3 className="text-lg font-semibold">Feature 3</h3>
          <p className="text-sm font-thin opacity-60">
            Description of feature 3.
          </p>
        </div>
      </div>
    </div>
  );
}
