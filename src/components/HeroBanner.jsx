import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Mic } from 'lucide-react';

const HeroBanner = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('All Residential');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects', 'Post Property'];

  return (
    <div className="relative -mt-16 pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[450px] bg-cover bg-center overflow-hidden"
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
            className="hidden lg:block absolute right-8 top-20"
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

      {/* Floating Search Box */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-20 -mt-24 mb-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-gray-200 px-6 pt-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'New Launch' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  {tab === 'Post Property' && (
                    <span className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      FREE
                    </span>
                  )}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="p-6">
              <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                {/* Property Type Dropdown */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option>All Residential</option>
                    <option>Flat/Apartment</option>
                    <option>Independent House</option>
                    <option>Villa</option>
                    <option>Builder Floor</option>
                    <option>Plot/Land</option>
                    <option>PG</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative min-w-[300px]">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search "Flats for rent in sector 77 Noida"'
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center gap-2">
                  {/* Location Button */}
                  <button
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    aria-label="Use current location"
                  >
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </button>

                  {/* Voice Search Button */}
                  <button
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    aria-label="Voice search"
                  >
                    <Mic className="w-5 h-5 text-purple-600" />
                  </button>

                  {/* Search Button */}
                  <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
