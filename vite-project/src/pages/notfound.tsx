import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-900">
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-neutral-300 mb-8">Page not found</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}