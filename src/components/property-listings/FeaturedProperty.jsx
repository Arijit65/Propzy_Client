import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { MapPin } from "lucide-react";

function FeaturedProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch featured properties from API
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/featured?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch featured properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
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

  // Transform API data for display
  const featuredProjects = properties.map((property) => ({
    id: property.id,
    name: `${property.bedrooms}BHK ${property.propertySubType}`,
    developer: `by ${property.owner?.userName || 'Private Owner'}`,
    types: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    priceRange: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null
  }));

  // Desktop settings (3 cards)
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Tablet settings (2 cards)
  const tabletSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Mobile settings (1 card)
  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="ml-3 text-gray-600">Loading featured properties...</p>
          </div>
        </div>
      </div>
    );
  }

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

  if (featuredProjects.length === 0) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>No featured properties available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Featured Properties
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties with the best value
          </p>
        </div>

        {/* Mobile View (< 768px) */}
        <div className="block md:hidden mb-8">
          <Slider {...mobileSettings}>
            {featuredProjects.map((project) => (
              <div className="px-1" key={project.id}>
                <Link to={`/property/${project.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-64">
                    <div className="relative h-1/2">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-gray-900 mb-1 truncate">{project.name}</h3>
                      <p className="text-xs text-gray-600 truncate">{project.developer}</p>
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
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Tablet View (768px - 1024px) */}
        <div className="hidden md:block lg:hidden mb-8">
          <Slider {...tabletSettings}>
            {featuredProjects.map((project) => (
              <div className="px-2" key={project.id}>
                <Link to={`/property/${project.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-80">
                    <div className="relative h-1/2">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-2 truncate">{project.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{project.developer}</p>
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
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:block mb-8">
          <Slider {...desktopSettings}>
            {featuredProjects.map((project) => (
              <div className="px-3" key={project.id}>
                <Link to={`/property/${project.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-96">
                    <div className="relative h-1/2">
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <MapPin className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.developer}</p>
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
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Call to Action */}
        <div className="bg-linear-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-purple-200/50 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">
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
      </div>
      </div>

  );
}


export default FeaturedProperty;