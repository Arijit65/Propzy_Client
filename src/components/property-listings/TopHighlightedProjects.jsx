import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const TopHighlightedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Responsive cards per slide - MOVED HERE BEFORE ANY CONDITIONAL RETURNS
  const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop: 3 cards
      if (window.innerWidth >= 768) return 2;  // Tablet: 2 cards
      return 1; // Mobile: 1 card
    }
    return 3; // Default for SSR
  };

  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());

  // Fetch highlighted properties from API
  useEffect(() => {
    const fetchHighlightedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/highlighted?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch highlighted properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProperties();
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(getCardsPerSlide());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(1)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(1)} L`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };

  // Transform property data for display
  const projects = properties.map((property) => ({
    id: property.id,
    name: `${property.bedrooms}BHK ${property.propertySubType}`,
    developer: property.owner?.userName || 'Private Owner',
    type: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    priceRange: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null,
    category: property.propertySubType
  }));

  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="ml-3 text-gray-600">Loading highlighted projects...</p>
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

  if (properties.length === 0) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>No highlighted projects available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalSlides = Math.ceil(projects.length / cardsPerSlide);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h4 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Top Highlighted Projects
          </h4>
          <p className="mt-2 text-violet-600/80 max-w-2xl mx-auto">
            Discover our premium selection of properties with exceptional value and lifestyle
          </p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:block">
            <button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white hover:bg-violet-50 w-12 h-12"
            >
              <ChevronLeft className="h-5 w-5 text-violet-600" />
            </button>
            
            <button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white hover:bg-violet-50 w-12 h-12"
            >
              <ChevronRight className="h-5 w-5 text-violet-600" />
            </button>
          </div>

          {/* Mobile: Horizontal Scrollable */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide px-2 pb-4"
                 style={{ scrollSnapType: 'x mandatory' }}>
              {projects.map((project) => (
                <Link to={`/property/${project.id}`} key={project.id} className="block">
                <div
                  className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 min-w-[270px] max-w-[270px] h-64 shrink-0 rounded-lg"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="relative h-full overflow-hidden rounded-lg">
                    {/* Background Image */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-violet-900/80 via-violet-800/20 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p className="text-violet-100 text-xs font-medium">
                          Mktd. by {project.developer}
                        </p>
                        <div className="space-y-0.5 pt-1">
                          <p className="text-violet-100 font-medium text-xs">
                            {project.type}
                          </p>
                          <p className="text-violet-100/80 text-xs">
                            {project.location}
                          </p>
                        </div>
                        <div className="pt-3">
                          <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs font-semibold py-2 rounded-full transition-all duration-200 border border-white/50">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-violet-600/95 backdrop-blur-sm rounded-lg px-2 py-1">
                        <p className="text-white font-bold text-xs">
                          {project.priceRange}
                        </p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <p className="text-violet-600 text-xs font-medium">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet: Grid with Slider */}
          <div className="hidden lg:block">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((project) => (
                        <Link to={`/property/${project.id}`} key={project.id} className="block">
                        <div
                          className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 h-72 rounded-lg"
                        >
                          <div className="relative h-full overflow-hidden rounded-lg">
                            {/* Background Image */}
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-violet-900/80 via-violet-800/20 to-transparent"></div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <div className="space-y-1">
                                <h3 className="text-lg font-bold">{project.name}</h3>
                                <p className="text-violet-100 text-xs font-medium">
                                  Mktd. by {project.developer}
                                </p>
                                <div className="space-y-0.5 pt-1">
                                  <p className="text-violet-100 font-medium text-xs">
                                    {project.type}
                                  </p>
                                  <p className="text-violet-100/80 text-xs">
                                    {project.location}
                                  </p>
                                </div>
                                <div className="pt-3">
                                  <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs font-semibold py-2 rounded-full transition-all duration-200 border border-white/50">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Price Badge */}
                            <div className="absolute top-2 right-2">
                              <div className="bg-violet-600/95 backdrop-blur-sm rounded-lg px-2 py-1">
                                <p className="text-white font-bold text-xs">
                                  {project.priceRange}
                                </p>
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-2 left-2">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                                <p className="text-violet-600 text-xs font-medium">
                                  {project.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators - Desktop */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-violet-600 scale-125' 
                      : 'bg-violet-200 hover:bg-violet-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-12">
          <button 
            variant="default" 
            size="lg" 
            className="px-8 bg-violet-600 hover:bg-violet-700 transition-all"
          >
            View All Highlighted Projects
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TopHighlightedProjects;
