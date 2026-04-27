export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Bagi Bayar
          </h1>
          <p className="text-primary-100 text-sm sm:text-base mt-1">
            Pencatat Destinasi & Pembagi Pengeluaran
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Hero Section */}
          <section className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Selamat Datang di Bagi Bayar
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Catat destinasi perjalanan Anda, kelola peserta, dan bagi pengeluaran dengan mudah dan adil.
            </p>
          </section>

          {/* Feature Cards - Responsive Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Card 1: Destinasi */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary-600 dark:text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Catat Destinasi
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Simpan semua destinasi perjalanan Anda dalam satu tempat yang mudah diakses.
              </p>
            </div>

            {/* Card 2: Peserta */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent-600 dark:text-accent-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Kelola Peserta
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Tambahkan peserta perjalanan dan atur siapa saja yang terlibat dalam setiap pengeluaran.
              </p>
            </div>

            {/* Card 3: Pengeluaran */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-success-50 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-success-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Bagi Pengeluaran
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Hitung dan bagi pengeluaran secara adil di antara semua peserta yang terlibat.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 sm:mt-16 text-center">
            <p className="text-zinc-500 dark:text-zinc-500 text-sm">
              Fitur lengkap akan segera hadir. Tetap pantau!
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} Bagi Bayar. Dibuat dengan ❤️ untuk perjalanan yang menyenangkan.
          </p>
        </div>
      </footer>
    </div>
  );
}
