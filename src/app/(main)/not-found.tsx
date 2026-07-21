import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-xl font-semibold mb-2">Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Back to store
        </Link>
      </div>
    </div>
  );
}
