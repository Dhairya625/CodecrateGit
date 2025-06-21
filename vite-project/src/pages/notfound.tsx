import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-screen w-screen flex-col items-center justify-center
                 bg-gradient-to-br from-[#0F0F1B] via-[#1A1A2C] to-[#0A0A10]
                 text-white font-mono overflow-hidden"
    >
      {/* Subtle radial gradients/blobs for background glow - simulating the image's background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob-slow animation-delay-3000"></div>
      </div>

      {/* Main Content Container - the slightly translucent box */}
      <div className="relative z-10 p-8 md:p-12 rounded-xl backdrop-blur-sm bg-white/5 border border-gray-700/50 shadow-2xl animate-fade-in
                      flex flex-col items-center max-w-xl w-[90%] md:w-auto"> {/* Added max-width and responsive width */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4 drop-shadow-lg animate-pulse-slow">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2 tracking-wide uppercase"> {/* Uppercase for "ACCESS DENIED" feel */}
          ACCESS DENIED: PAGE NOT FOUND
        </h2>
        <p className="text-base md:text-lg text-gray-300 mb-6 max-w-md leading-relaxed">
          The requested resource could not be located on this server. Initiating
          system rollback to known stable state.
        </p>
        <Link
          to="/"
          className="relative inline-flex items-center justify-center px-6 md:px-8 py-3 text-base md:text-lg font-semibold text-white rounded-full
                     bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg
                     hover:from-blue-700 hover:to-indigo-900 transition-all duration-300 ease-in-out
                     transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          <span className="relative z-10">RECONNECT TO HOMEPAGE</span>
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
                }}></span>
        </Link>
      </div>
    </div>
  );
}