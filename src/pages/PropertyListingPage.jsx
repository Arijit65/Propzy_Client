import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../Context/AppContext';
import PropertyFilterSidebar from '../components/PropertyFilterSidebar';
import PropertyCard from '../components/PropertyCard';
import Breadcrumb from '../components/Breadcrumb';

const PropertyListingPage = () => {
  const { location } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { propertyApi } = useApi();
  
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Handle filter changes from sidebar
  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    setAppliedFilters(filters);
    
    // Update URL search params
    const newParams = new URLSearchParams(searchParams);
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        newParams.set(key, filters[key]);
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams);
    setCurrentPage(1); // Reset to first page when filters change
    setShowFilters(false); // Close mobile filter on apply
  };

  // Fetch properties based on location
  const fetchProperties = useCallback(async () => {
    console.log('🔍 Fetching properties...');
    console.log('Location param:', location);
    console.log('Search params:', Object.fromEntries(searchParams));
    
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = {
        page: currentPage,
        limit: 20,
        purpose: searchParams.get('purpose'),
        propertyType: searchParams.get('propertyType'),
        bedrooms: searchParams.get('bedrooms'),
        minPrice: searchParams.get('minPrice'),
        maxPrice: searchParams.get('maxPrice'),
        locality: searchParams.get('locality'),
        postedBy: searchParams.get('postedBy'),
        furnishing: searchParams.get('furnishing'),
      };

      // Remove undefined/null values
      Object.keys(params).forEach(key => 
        params[key] === undefined || params[key] === null || params[key] === '' ? delete params[key] : {}
      );

      console.log('Query params:', params);

      let result;
      if (location) {
        // Fetch location-specific properties
        console.log('Calling getPropertiesByLocation with:', location, params);
        result = await propertyApi.getPropertiesByLocation(location, params);
      } else {
        // Fetch all properties
        console.log('Calling getAllLocationsProperties with:', params);
        result = await propertyApi.getAllLocationsProperties(params);
      }

      console.log('API Result:', result);

      if (result.success) {
        console.log('Properties received:', result.data.properties?.length || 0);
        setProperties(result.data.properties || []);
        setTotalProperties(result.data.total || 0);
        setTotalPages(result.data.totalPages || 1);
      } else {
        console.error('API returned error:', result.error);
        setError(result.error || 'Failed to fetch properties');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [location, currentPage, searchParams, propertyApi]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format location name for display
  const formatLocationName = (loc) => {
    if (!loc) return 'All Locations';
    return loc.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Build breadcrumb items dynamically
  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Properties', href: '/properties' }
    ];

    if (location) {
      items.push({
        label: formatLocationName(location),
        href: null // Last item, no href
      });
    }

    const purpose = searchParams.get('purpose');
    if (purpose) {
      const purposeLabel = purpose.charAt(0).toUpperCase() + purpose.slice(1);
      items.splice(1, 0, {
        label: `For ${purposeLabel}`,
        href: `/properties?purpose=${purpose}`
      });
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={getBreadcrumbItems()} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Properties for Sale in {formatLocationName(location)}
              </h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="font-medium">{totalProperties} Properties</span>
                {location && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{formatLocationName(location)}</span>
                  </>
                )}
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <PropertyFilterSidebar 
              onFilterChange={handleFilterChange}
              initialFilters={{
                purpose: searchParams.get('purpose'),
                propertyType: searchParams.get('propertyType'),
                bedrooms: searchParams.get('bedrooms'),
                minPrice: searchParams.get('minPrice'),
                maxPrice: searchParams.get('maxPrice'),
              }}
            />
          </div>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <PropertyFilterSidebar 
                  onFilterChange={handleFilterChange}
                  initialFilters={{
                    purpose: searchParams.get('purpose'),
                    propertyType: searchParams.get('propertyType'),
                    bedrooms: searchParams.get('bedrooms'),
                    minPrice: searchParams.get('minPrice'),
                    maxPrice: searchParams.get('maxPrice'),
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Property Listings */}
          <div className="lg:col-span-3">
            {/* Sort & View Options */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="area-low">Area: Low to High</option>
                      <option value="area-high">Area: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded font-medium text-sm">
                    List
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded font-medium text-sm hover:bg-gray-200">
                    Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Property Cards */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-800 font-medium mb-2">Error loading properties</p>
                  <p className="text-red-600 text-sm">{error}</p>
                  <button
                    onClick={fetchProperties}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Try Again
                  </button>
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search in a different location</p>
                </div>
              ) : (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && !error && properties.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-500">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;
