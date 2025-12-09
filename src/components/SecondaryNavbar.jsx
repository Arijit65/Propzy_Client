import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, Bell, Menu, X } from 'lucide-react';
import PostPropertyComingPopup from './PostPropertyComingPopup';

const SecondaryNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPostPropertyPopupOpen, setIsPostPropertyPopupOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const dropdownMenus = {
    buyers: {
      title: 'For Buyers',
      sections: [
        {
          title: 'BUY A HOME',
          links: [
            { label: 'Land/Plot', path: '/properties?type=land' },
            { label: 'COMMERCIAL', path: '/properties?type=commercial' },
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: 'TOP CITIES',
          links: [
            { label: 'Property in Delhi / NCR', path: '/properties/delhi' },
            { label: 'Property in Mumbai', path: '/properties/mumbai' },
            { label: 'Property in Bangalore', path: '/properties/bangalore' },
            { label: 'Property in Hyderabad Metropolitan Region', path: '/properties/hyderabad' },
            { label: 'Property in Pune', path: '/properties/pune' },
            { label: 'Property in Kolkata', path: '/properties/kolkata' },
            { label: 'Property in Chennai', path: '/properties/chennai' },
            { label: 'Property in Ahmedabad', path: '/properties/ahmedabad' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-600 p-2.5 rounded shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-purple-600 font-medium text-xs uppercase">INTRODUCING</h4>
                      <h3 className="font-bold text-gray-900 text-lg">Insights</h3>
                    </div>
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Understand localities</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Read Resident Reviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check Price Trends</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tools, Utilities & more</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    tenants: {
      title: 'For Tenants',
      sections: [
        {
          title: 'RENT A HOME',
          links: [
            { label: 'PG/CO-LIVING', path: '/properties?type=pg' },
            { label: 'COMMERCIAL', path: '/properties?type=commercial' },
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: 'TOP CITIES',
          links: [
            { label: 'Property for rent in Delhi / NCR', path: '/properties/delhi?purpose=rent' },
            { label: 'Property for rent in Mumbai', path: '/properties/mumbai?purpose=rent' },
            { label: 'Property for rent in Bangalore', path: '/properties/bangalore?purpose=rent' },
            { label: 'Property for rent in Hyderabad Metropolitan Region', path: '/properties/hyderabad?purpose=rent' },
            { label: 'Property for rent in Pune', path: '/properties/pune?purpose=rent' },
            { label: 'Property for rent in Kolkata', path: '/properties/kolkata?purpose=rent' },
            { label: 'Property for rent in Chennai', path: '/properties/chennai?purpose=rent' },
            { label: 'Property for rent in Ahmedabad', path: '/properties/ahmedabad?purpose=rent' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-600 p-2.5 rounded shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-purple-600 font-medium text-xs uppercase">INTRODUCING</h4>
                      <h3 className="font-bold text-gray-900 text-lg">Insights</h3>
                    </div>
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Understand localities</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Read Resident Reviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check Price Trends</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tools, Utilities & more</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    owners: {
      title: 'For Owners',
      sections: [
        {
          title: 'OWNER OFFERINGS',
          links: [
            { label: 'Post Property', badge: 'FREE', path: '/post-property' },
            { label: 'Owner Services', path: '/owner-services' },
            { label: 'MyPropszy', path: '/mypropszy' },
            { label: 'View Responses', path: '/responses' }
          ]
        },
        {
          title: 'INSIGHTS',
          links: [
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-linear-to-br from-green-50 to-blue-50 p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                Sell or rent faster at<br />the right price!
              </h4>
              <p className="text-xs text-gray-700 mb-4">
                List your property now for FREE
              </p>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPostPropertyPopupOpen(true);
                }}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition text-sm w-full shadow-md"
              >
                Post Property
              </button>
            </div>
          )
        }
      ]
    },
    dealers: {
      title: 'For Dealers / Builders',
      sections: [
        {
          title: 'DEALER OFFERINGS',
          links: [
            { label: 'Post Property', path: '/post-property' },
            { label: 'Dealer Services', path: '/dealer-services' },
            { label: 'MyPropszy', path: '/mypropszy' },
            { label: 'View Responses', path: '/responses' }
          ]
        },
        {
          title: 'PROPERTY SERVICES',
          links: [
            { label: 'RESEARCH AND ADVICE', path: '/research' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-linear-to-br from-green-50 to-blue-50 p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                Sell or rent faster at<br />the right price!
              </h4>
              <p className="text-xs text-gray-700 mb-4">
                List your property now for FREE
              </p>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPostPropertyPopupOpen(true);
                }}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition text-sm w-full shadow-md"
              >
                Post Property
              </button>
              <p className="text-xs text-gray-600 mt-3 text-center">
                Are you a builder?{' '}
                <a href="/builder" className="text-purple-600 font-semibold hover:underline">
                  click here
                </a>
              </p>
            </div>
          )
        }
      ]
    }
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl font-bold bg-linear-to-r from-purple-700 via-purple-400 to-purple-600 bg-clip-text text-transparent">
              Propszy
            </span>
          </Link>

          {/* Location Dropdown */}
          <div 
            className="hidden md:block relative"
            onMouseEnter={() => setIsLocationDropdownOpen(true)}
            onMouseLeave={() => setIsLocationDropdownOpen(false)}
          >
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded transition">
              <span className="font-medium text-xs text-gray-700">
                All India
              </span>
              <ChevronDown className="w-3 h-3 text-gray-700" />
            </div>

            {/* Location Dropdown Menu */}
            {isLocationDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 w-64" style={{ zIndex: 100 }}>
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">TOP CITIES</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/properties/delhi"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Delhi / NCR
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/mumbai"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Mumbai
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/bangalore"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Bangalore
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/hyderabad"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Hyderabad
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/pune"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Pune
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/chennai"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Chennai
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/kolkata"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-700 hover:text-purple-600 transition block"
                        >
                          Kolkata
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links with Dropdowns */}
          <div className="hidden lg:flex items-center space-x-1">
            {Object.entries(dropdownMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-gray-700 hover:text-purple-600 transition font-medium px-3 py-2 flex items-center space-x-1 text-xs">
                  <span>{menu.title}</span>
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === key && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 w-[900px]"
                    style={{ zIndex: 100 }}
                  >
                      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-3 gap-6 p-6">
                          {menu.sections.map((section, idx) => (
                            <div key={idx}>
                              {section.title && (
                                <h3 className="font-bold text-gray-900 mb-3 text-sm">
                                  {section.title}
                                </h3>
                              )}
                              {section.links && (
                                <ul className="space-y-2.5">
                                  {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                      <Link
                                        to={link.path}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`text-sm hover:text-purple-600 transition flex items-center space-x-2 ${
                                          link.highlight ? 'text-purple-600 font-semibold' : 'text-gray-700'
                                        }`}
                                      >
                                        <span>{link.label}</span>
                                        {link.badge && (
                                          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded font-bold">
                                            {link.badge}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {section.content && section.content}
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-600">
                          <span className="text-gray-500">contact us toll free on</span>{' '}
                          <span className="font-semibold text-gray-900">1800 41 99099</span>{' '}
                          <span className="text-gray-500">(9AM-11PM IST)</span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}

            <Link
              to="/insights"
              className="relative text-gray-700 hover:text-purple-600 transition font-medium px-3 py-2 text-xs"
            >
              Insights
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPostPropertyPopupOpen(true)}
              className="hidden md:flex items-center px-4 py-1.5 rounded-lg transition font-bold shadow-sm text-xs bg-purple-600 text-white hover:bg-purple-700"
            >
              <span>Post property</span>
              <span className="ml-2 bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">FREE</span>
            </button>
            <button className="p-1.5 rounded-full transition hover:bg-gray-100">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-1.5 rounded-full transition relative hover:bg-gray-100">
              <Bell className="w-4 h-4 text-gray-700" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-1 px-2 py-1.5 rounded transition hover:bg-gray-100">
              <div className="w-6 h-6 bg-linear-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-3 h-3 text-gray-700" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded transition hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95">
            <div className="flex flex-col space-y-2">
              {Object.entries(dropdownMenus).map(([key, menu]) => (
                <a key={key} href="#" className="text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition py-2 px-3 rounded font-medium text-sm">
                  {menu.title}
                </a>
              ))}
              <Link to="/insights" className="text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition py-2 px-3 rounded font-medium text-sm">
                Insights
              </Link>
              <button
                onClick={() => setIsPostPropertyPopupOpen(true)}
                className="px-4 py-2.5 rounded-lg transition font-bold text-left mt-2 bg-purple-600 text-white hover:bg-purple-700"
              >
                Post property FREE
              </button>
            </div>
          </div>
        )}
        </div>
        
        {/* Post Property Coming Soon Popup */}
        <PostPropertyComingPopup 
          isOpen={isPostPropertyPopupOpen} 
          onClose={() => setIsPostPropertyPopupOpen(false)} 
        />
      </nav>
      
      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default SecondaryNavbar;
