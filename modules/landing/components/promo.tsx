export default function PromoSection() {
  return (
    <div className="container flex flex-col px-4 md:px-8 lg:px-12 py-8 md:py-12 gap-8 md:gap-16">
      <div className="feature-card items-center gap-1 px-4 md:px-8 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Ready to start your journey?</h2>
        <p className="font-thin opacity-60 text-center text-sm md:text-base">
          Leave the hassle of splitting expenses to us, focus on your travel
          memories
        </p>

        <button className="btn-primary mt-6 md:mt-8 rounded-full! py-2.5! md:py-3! px-6! md:px-10!">
          <p className="text-background font-bold text-sm md:text-base">Sign Up Now</p>
        </button>
      </div>
    </div>
  );
}
