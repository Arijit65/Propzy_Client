import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const PropertyFilterSidebar = ({ onFilterChange, initialFilters = {} }) => {
  const [expandedSections, setExpandedSections] = useState({
    budget: true,
    propertyType: true,
    bhk: true,
    postedBy: true,
    furnishing: true,
    availability: true,
    amenities: false
  });

  // Convert price from number to readable format
  const formatPriceDisplay = (price) => {
    if (!price) return '';
    const num = parseInt(price);
    if (num >= 10000000) return `${(num / 10000000).toFixed(0)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(0)} L`;
    return price;
  };

  // Format bedrooms to BHK display
  const formatBedroomsDisplay = (bedrooms) => {
    if (!bedrooms) return '';
    if (bedrooms === '1' && initialFilters.propertyType?.includes('rk')) return '1 RK';
    return `${bedrooms} BHK`;
  };

  const [selectedFilters, setSelectedFilters] = useState({
    budget: { 
      min: formatPriceDisplay(initialFilters.minPrice) || '', 
      max: formatPriceDisplay(initialFilters.maxPrice) || '' 
    },
    propertyTypes: initialFilters.propertyType ? [initialFilters.propertyType] : [],
    bhk: initialFilters.bedrooms ? [formatBedroomsDisplay(initialFilters.bedrooms)] : [],
    postedBy: [],
    furnishing: initialFilters.furnishing ? [initialFilters.furnishing] : [],
    availability: '',
    amenities: initialFilters.amenities ? initialFilters.amenities.split(',').filter(Boolean) : []
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      budget: { min: '', max: '' },
      propertyTypes: [],
      bhk: [],
      postedBy: [],
      furnishing: [],
      availability: '',
      amenities: []
    };
    setSelectedFilters(clearedFilters);
    if (onFilterChange) {
      onFilterChange({
        minPrice: '',
        maxPrice: '',
        propertyType: '',
        bedrooms: '',
        postedBy: '',
        furnishing: '',
        availability: '',
        amenities: []
      });
    }
  };

  const applyFilters = () => {
    if (onFilterChange) {
      // Convert price strings to numbers (e.g., "10 L" -> 1000000)
      const convertPrice = (priceStr) => {
        if (!priceStr) return '';
        const cleaned = priceStr.trim().toUpperCase();
        if (cleaned.includes('CR')) {
          return (parseFloat(cleaned) * 10000000).toString();
        } else if (cleaned.includes('L')) {
          return (parseFloat(cleaned) * 100000).toString();
        }
        return cleaned.replace(/[^\d]/g, '');
      };

      // Extract bedroom number from format like "3 BHK" or "1 RK"
      const extractBedrooms = (bhkStr) => {
        if (!bhkStr) return '';
        const match = bhkStr.match(/^(\d+)/);
        return match ? match[1] : '';
      };

      onFilterChange({
        minPrice: convertPrice(selectedFilters.budget.min),
        maxPrice: convertPrice(selectedFilters.budget.max),
        propertyType: selectedFilters.propertyTypes[0] || '',
        bedrooms: extractBedrooms(selectedFilters.bhk[0]) || '',
        postedBy: selectedFilters.postedBy[0] || '',
        furnishing: selectedFilters.furnishing[0] || '',
        availability: selectedFilters.availability,
        amenities: selectedFilters.amenities.join(',')
      });
    }
  };

  // Quick price button handler
  const handleQuickPrice = (priceLabel) => {
    const priceValue = priceLabel.replace(' ', '');
    setSelectedFilters(prev => ({
      ...prev,
      budget: { ...prev.budget, max: priceValue }
    }));
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.budget.min || selectedFilters.budget.max) count++;
    if (selectedFilters.propertyTypes.length > 0) count++;
    if (selectedFilters.bhk.length > 0) count++;
    if (selectedFilters.postedBy.length > 0) count++;
    if (selectedFilters.furnishing.length > 0) count++;
    if (selectedFilters.availability) count++;
    if (selectedFilters.amenities.length > 0) count++;
    return count;
  };

  const FilterSection = ({ title, sectionKey, children }) => {
    // Count active filters in this section
    const getSectionActiveCount = () => {
      switch(sectionKey) {
        case 'budget':
          return (selectedFilters.budget.min || selectedFilters.budget.max) ? 1 : 0;
        case 'propertyType':
          return selectedFilters.propertyTypes.length;
        case 'bhk':
          return selectedFilters.bhk.length;
        case 'postedBy':
          return selectedFilters.postedBy.length;
        case 'furnishing':
          return selectedFilters.furnishing.length;
        case 'availability':
          return selectedFilters.availability ? 1 : 0;
        case 'amenities':
          return selectedFilters.amenities.length;
        default:
          return 0;
      }
    };

    const activeCount = getSectionActiveCount();

    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {activeCount > 0 && (
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {activeCount}
              </span>
            )}
          </div>
          {expandedSections[sectionKey] ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {expandedSections[sectionKey] && (
          <div className="mt-3">{children}</div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-gray-900">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="p-4">
          {/* Budget */}
          <FilterSection title="Budget" sectionKey="budget">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
                  <input
                    type="text"
                    placeholder="₹ Min"
                    value={selectedFilters.budget.min}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, min: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
                  <input
                    type="text"
                    placeholder="₹ Max"
                    value={selectedFilters.budget.max}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, max: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['10 L', '20 L', '30 L', '40 L', '50 L', '60 L', '70 L', '80 L', '90 L', '1 Cr'].map((price) => (
                  <button
                    key={price}
                    onClick={() => handleQuickPrice(price)}
                    className={`px-3 py-1 text-xs border rounded-full transition ${
                      selectedFilters.budget.max === price.replace(' ', '')
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : 'border-gray-300 hover:border-purple-600 hover:text-purple-600'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Property Type" sectionKey="propertyType">
            <div className="space-y-2">
              {[
                { label: 'Flat/Apartment', value: 'apartment' },
                { label: 'Independent House/Villa', value: 'house' },
                { label: 'Independent/Builder Floor', value: 'floor' },
                { label: 'Residential Plot', value: 'plot' }
              ].map((type) => (
                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="propertyType"
                    checked={selectedFilters.propertyTypes.includes(type.value)}
                    onChange={() => {
                      setSelectedFilters(prev => ({
                        ...prev,
                        propertyTypes: [type.value]
                      }));
                    }}
                    className="w-4 h-4 text-purple-600 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* BHK Type */}
          <FilterSection title="BHK Type" sectionKey="bhk">
            <div className="grid grid-cols-3 gap-2">
              {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK'].map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => {
                    setSelectedFilters(prev => ({
                      ...prev,
                      bhk: prev.bhk.includes(bhk) ? [] : [bhk]
                    }));
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition ${
                    selectedFilters.bhk.includes(bhk)
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Posted By */}
          <FilterSection title="Posted By" sectionKey="postedBy">
            <div className="space-y-2">
              {['Owner', 'Dealer', 'Builder'].map((poster) => (
                <label key={poster} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.postedBy.includes(poster)}
                    onChange={() => toggleFilter('postedBy', poster)}
                    className="w-4 h-4 text-purple-600 rounded accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{poster}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Furnishing */}
          <FilterSection title="Furnishing" sectionKey="furnishing">
            <div className="space-y-2">
              {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((furnish) => (
                <label key={furnish} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.furnishing.includes(furnish)}
                    onChange={() => toggleFilter('furnishing', furnish)}
                    className="w-4 h-4 text-purple-600 rounded accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{furnish}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability" sectionKey="availability">
            <div className="space-y-2">
              {['Immediately', 'Within 15 Days', 'Within 30 Days', 'After 30 Days'].map((avail) => (
                <label key={avail} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    checked={selectedFilters.availability === avail}
                    onChange={() => setSelectedFilters(prev => ({ ...prev, availability: avail }))}
                    className="w-4 h-4 text-purple-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{avail}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Amenities */}
          <FilterSection title="Amenities" sectionKey="amenities">
            <div className="space-y-2">
              {['Parking', 'Gym', 'Swimming Pool', 'Lift', 'Power Backup', 'Security', 'Park', 'Water Supply'].map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.includes(amenity)}
                    onChange={() => toggleFilter('amenities', amenity)}
                    className="w-4 h-4 text-purple-600 rounded accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={applyFilters}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;
