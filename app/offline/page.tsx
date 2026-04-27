"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">📡</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Anda sedang offline
        </h1>
        <p className="mb-6 text-gray-600">
          Tidak ada koneksi internet. Silakan periksa koneksi Anda dan coba lagi.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition-colors hover:bg-sky-600"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
