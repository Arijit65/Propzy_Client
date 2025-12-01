import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[280px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=400&fit=crop')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* Ad Banner Card - Left Side */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md"
          >
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-amber-200">
              <div className="mb-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg">
                    <span className="text-white font-bold text-lg">M&M</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-700 font-semibold">J&C</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  INSPIRED BY THE IMPOSSIBLE BESPOKE RESIDENCES
                </h1>
                <p className="text-gray-800 text-sm font-semibold">
                  Location: Sector 97, Noida
                </p>
              </div>

              <div className="mt-4">
                <button className="border-2 border-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-white/50 transition text-sm">
                  Explore Now →
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                MahaRERA Registration No.: P51700052867
              </p>
            </div>
          </motion.div>

          {/* Right side QR code image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block absolute right-8 top-8"
          >
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://example.com"
                alt="QR Code"
                className="w-24 h-24"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
