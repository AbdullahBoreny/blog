import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0-6h.01M5.071 19.243a10 10 0 1114.142 0M5.071 19.243l.707-.707M19.142 19.243l-.707-.707M12 3v1m0 16v1m9-9h-1M4 12H3" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Please Sign Up
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            The resource you are looking for might require an active account or could not be located.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-sm"
          >
            Create Account
          </Link>
          
          <Link
            href="/"
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm border border-gray-200 transition"
          >
            Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}