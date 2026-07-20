"use client";

export default function OfflinePage() {
  return (
    <div className="font-pixel flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">📡</div>
        <h1 className=" mb-2 text-2xl font-bold text-primary">
          Anda sedang offline
        </h1>
        <p className="mb-6 text-gray-600">
          Tidak ada koneksi internet. Silakan periksa koneksi Anda dan coba
          lagi.
        </p>
        <button
          className="btn-primary font-pixel font-semibold text-background"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
