import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { MapPin } from "lucide-react";

function RecentlyAddedproperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recently added properties from API
  useEffect(() => {
    const fetchRecentlyAddedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/features/recently-added?limit=6');
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch recently added properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyAddedProperties();
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    
    // Convert string price to number for formatting
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(1)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(1)} L`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };

  // Get property display info
  const getPropertyInfo = (property) => ({
    title: `${property.bedrooms}BHK ${property.propertySubType}`,
    builder: property.owner?.userName || 'Private Owner',
    types: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    price: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null
  });

  const projects = properties.map(getPropertyInfo);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="ml-3 text-gray-600">Loading recently added properties...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (properties.length === 0) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>No recently added properties available.</p>
          </div>
        </div>
      </div>
    );
  }

  // Mobile settings (1 card) - DOTS REMOVED
  const mobileSettings = {
    dots: false, // Changed from true to false
    infinite: true,
    speed: 800,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Tablet settings (2 cards) - DOTS REMOVED
  const tabletSettings = {
    dots: false, // Changed from true to false
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Desktop settings (4 cards) - DOTS REMOVED
  const desktopSettings = {
    dots: false, // Changed from true to false
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-6 sm:py-8 lg:py-10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Recently Added Properties
          </h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm sm:text-base font-semibold transition-colors duration-200 hover:underline">
            View All
          </button>
        </div>
      </div>

      {/* Mobile Slider - Only visible on mobile */}
      <div className="block sm:hidden">
        <div className="px-4">
          <Slider {...mobileSettings}>
            {projects.map((project, index) => (
              <div key={index} className="pr-3">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-purple-100">
                    <div className="relative">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600 shadow-lg">
                      {project.price}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-purple-600 font-medium">by {project.builder}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{project.types}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <span className="mr-1">📍</span>
                      {project.location}
                    </p>
                    <div className="pt-3">
                      <button className="w-full bg-linear-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white text-xs font-semibold py-2 rounded-full transition-all duration-200 transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Tablet Slider - Visible on tablet only */}
      <div className="hidden sm:block lg:hidden">
        <div className="px-4 sm:px-6">
          <Slider {...tabletSettings}>
            {projects.map((project, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100 hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-purple-600 shadow-lg">
                      {project.price}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-base leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold">by {project.builder}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.types}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="mr-2">📍</span>
                      {project.location}
                    </p>
                    <div className="pt-4">
                      <button className="w-full bg-linear-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white text-sm font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Desktop Slider - Shows 4 cards per screen on large desktop */}
      <div className="hidden lg:block">
        <div className="px-6 lg:px-8">
          <Slider {...desktopSettings}>
            {projects.map((project, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100 hover:-translate-y-3 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-purple-600 shadow-xl">
                      {project.price}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold">by {project.builder}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.types}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="mr-2">📍</span>
                      {project.location}
                    </p>
                    <div className="pt-4">
                      <button className="w-full bg-linear-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white text-sm font-bold py-2.5 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Call to Action Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-16">
        <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-purple-200/50 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Looking for More Properties?
          </h3>
          <p className="text-gray-600 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our complete collection of premium properties or get personalized recommendations from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-linear-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-bold px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Browse All Properties
            </button>
            <button className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-bold px-8 py-3 sm:py-4 rounded-full transition-all duration-200">
              Get Expert Help
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}



export default RecentlyAddedproperty