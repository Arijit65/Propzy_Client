import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Share2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function InvestmentProperty() {
  const scrollRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch investment properties from API
  useEffect(() => {
    const fetchInvestmentProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/investment?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch investment properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentProperties();
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
    developer: `by ${property.owner?.userName || 'Private Owner'}`,
    type: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    priceRange: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null
  }));

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="ml-3 text-gray-600">Loading investment properties...</p>
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
            <p>No investment properties available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white-50 py-3 px-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="flex justify-center text-3xl font-bold text-violet-500 mb-2">
            High-demand projects to invest now
          </h2>
          <p className="flex justify-center text-violet-600">Leading projects in high demand</p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          >
            {projects.map((project) => (
              <Link to={`/property/${project.id}`} key={project.id} className="block">
              <div
                className="shrink-0 bg-white rounded-lg border border-violet-100 shadow-md hover:shadow-violet-200 transition-shadow duration-300 overflow-hidden min-w-[350px]"
              >
                <div className="flex">
                  {/* Project Image */}
                  <div className="w-32 h-32 shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-tl-lg rounded-bl-lg flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-violet-500 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-violet-500 mb-1">
                          {project.developer}
                        </p>
                      </div>
                      <button className="text-violet-400 hover:text-violet-500 transition-colors p-1">
                        <Share2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-1 mb-3">
                      <p className="text-sm font-medium text-violet-500">
                        {project.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {project.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-violet-500">
                        {project.priceRange}
                      </div>
                      <button className="bg-linear-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-sm p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronLeft size={20} className="text-violet-600" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-sm  p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronRight size={20} className="text-violet-600" />
          </button>
        </div>
      </div>

      {/* Inline scrollbar hide for all browsers */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
