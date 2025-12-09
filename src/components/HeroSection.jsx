import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, MapPin, Mic, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../Context/AppContext'
import im1 from "@/assets/bhi1.png"
import im2 from "@/assets/bhi2.png"
import im3 from "@/assets/bhi3.png"

const HeroSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Search component state
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('All Residential');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const { propertyApi } = useApi();
  const searchTimeoutRef = useRef(null);

  // Scroll to enquiry form
  const scrollToEnquiry = () => {
    const enquirySection = document.getElementById('enquiry-form');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Search with debouncing
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      const result = await propertyApi.searchProperties(searchQuery);
      if (result.success) {
        setSuggestions(result.properties || []);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
      setIsSearching(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, propertyApi]);

  // Handle search submit
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Build query params based on active tab and search
    const params = new URLSearchParams();
    
    if (activeTab === 'Rent') params.append('purpose', 'rent');
    else if (activeTab === 'Buy') params.append('purpose', 'buy');
    
    if (propertyType !== 'All Residential') {
      params.append('propertyType', propertyType.toLowerCase().replace('/', '-'));
    }
    
    // Navigate to property listing with search query as location
    const searchTerm = searchQuery.toLowerCase().trim();
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    // Try to extract city from search query
    const cities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad'];
    const foundCity = cities.find(city => searchTerm.includes(city));
    
    if (foundCity) {
      navigate(`/properties/${foundCity}${queryString}`);
    } else {
      navigate(`/properties${queryString}`);
    }
    
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (property) => {
    navigate(`/property/${property.id}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  // Handle tab click
  const handleTabClick = (tab) => {
    if (tab === 'Post Property') {
      navigate('/post-property');
    } else {
      setActiveTab(tab);
    }
  };

  const tabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects', 'Post Property'];

  const slides = [
    {
      image: im1,
      title: "Luxury Villas",
      subtitle: "Premium Properties in Prime Locations",
      description: "Discover exceptional villas with modern amenities"
    },
    {
      image: im2,
      title: "Modern Apartments",
      subtitle: "Contemporary Living Spaces",
      description: "Find your perfect apartment in the heart of the city"
    },
    {
      image: im3,
      title: "Commercial Properties",
      subtitle: "Business & Investment Opportunities",
      description: "Explore commercial spaces for your business needs"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative -mt-20 pt-16">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900"></h2>
        
        {/* Mobile Hero Slider - Only visible on mobile screens */}
        <div className="block sm:hidden">
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-3 scroll-smooth scrollbar-hide px-8"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {[im1, im2, im3].map((img, i) => (
                <div key={i} className="min-w-[270px] shrink-0" style={{ scrollSnapAlign: 'center' }}>
                  <img
                    src={img}
                    alt={`Property ${i + 1}`}
                    className="w-[270px] h-30 object-cover"
                    style={{ display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Banner Slider - Visible on tablet and desktop screens */}
        <div className="hidden sm:block">
          <div className="relative overflow-hidden">
            {/* Main Slider Container */}
            <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px]">
              {/* Slides */}
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full shrink-0 relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
                    
                    {/* Centered Content Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                        {/* Animated Badge/Tag */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="inline-block mb-3 sm:mb-4"
                        >
                          <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-md">
                            Featured
                          </span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-normal"
                          style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)' }}
                        >
                          {slide.title}
                        </motion.h1>

                        {/* Decorative Line */}
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: '60px', opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 mx-auto rounded-full mb-2 sm:mb-3"
                        ></motion.div>

                        {/* Subtitle */}
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium text-violet-200 mb-2 sm:mb-4 tracking-normal"
                          style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)' }}
                        >
                          {slide.subtitle}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.6 }}
                          className="text-sm sm:text-base lg:text-lg text-white/90 mb-5 sm:mb-7 max-w-2xl mx-auto leading-relaxed font-normal"
                          style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)' }}
                        >
                          {slide.description}
                        </motion.p>

                        {/* Call-to-Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                        >
                          <button className="group relative bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform w-full sm:w-auto">
                            <span className="relative z-10">View Properties</span>
                            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>
                          <button 
                            onClick={scrollToEnquiry}
                            className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/50 hover:border-white/70 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform w-full sm:w-auto"
                          >
                            Get In Touch
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play Indicator */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                    isAutoPlaying 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}
                  aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
                >
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    isAutoPlaying ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Box */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-20 -mt-16 mb-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-visible">
            {/* Tabs */}
            <div className="flex items-center border-b border-gray-200 px-6 pt-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
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
                  {activeTab === tab && tab !== 'Post Property' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="p-6 relative">
              <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                {/* Property Type Dropdown */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
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
                <div className="flex-1 relative min-w-[300px]" style={{ zIndex: 100 }}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                    placeholder='Search "Flats for rent in sector 77 Noida"'
                    className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent relative z-10 bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {isSearching && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    </div>
                  )}
                  
                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setShowSuggestions(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-40">
                        <div className="p-2">
                          <div className="text-xs text-gray-500 px-3 py-2 font-semibold">
                            {suggestions.length} Properties Found
                          </div>
                          {suggestions.slice(0, 8).map((property) => (
                            <button
                              key={property.id}
                              onClick={() => handleSuggestionClick(property)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition flex items-start gap-3"
                            >
                              {property.images && property.images.length > 0 && (
                                <img
                                  src={property.images[0]}
                                  alt={property.apartment || 'Property'}
                                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {property.apartment || property.propertyType || 'Property'}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                  {property.locality}, {property.city}
                                </p>
                                <p className="text-xs text-purple-600 font-semibold mt-1">
                                  ₹{property.expectedPrice ? Number(property.expectedPrice).toLocaleString('en-IN') : 'N/A'}
                                </p>
                              </div>
                              <div className="text-xs text-gray-500 flex-shrink-0">
                                {property.bedrooms}BHK
                              </div>
                            </button>
                          ))}
                          {suggestions.length > 8 && (
                            <button
                              onClick={handleSearch}
                              className="w-full text-center py-2 text-sm text-purple-600 hover:text-purple-700 font-semibold"
                            >
                              View all {suggestions.length} results →
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {showSuggestions && suggestions.length === 0 && searchQuery.length >= 2 && !isSearching && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setShowSuggestions(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl p-4 z-40">
                        <p className="text-sm text-gray-500 text-center">
                          No properties found for "{searchQuery}"
                        </p>
                      </div>
                    </>
                  )}
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
                  <button 
                    onClick={handleSearch}
                    className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection
