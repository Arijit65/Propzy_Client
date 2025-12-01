import { Facebook, Instagram, Twitter, Linkedin, Youtube, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function MainFooter() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = {
    'real-estate': {
      title: 'Find Properties for Sale',
      links: [
        "Flats in Mumbai",
        "Flats in Bengaluru", 
        "Flats in Hyderabad",
        "Flats in Pune",
        "Flats in Chennai"
      ]
    },
    'rentals': {
      title: 'Rental Properties',
      links: [
        "Flats in Delhi",
        "Flats in Gurgaon",
        "Flats in Noida",
        "Flats in Kolkata",
        "Flats in Ahmedabad"
      ]
    },
    'projects': {
      title: 'New Projects',
      links: [
        "Flats in Thane",
        "Flats in Navi Mumbai",
        "Flats in Faridabad",
        "Flats in Ghaziabad",
        "Flats in Coimbatore"
      ]
    },
    'city-data': {
      title: 'City Data',
      links: [
        "Properties in India",
        "Agricultural Lands in India",
        "Plots in India",
        "Flats in India"
      ]
    },
    'popular-searches': {
      title: 'Popular Searches',
      links: [
        "Properties in India",
        "Agricultural Lands in India",
        "Plots in India",
        "Flats in India"
      ]
    }
  };

  const companyLinks = [
    "Careers",
    "About Us",
    "For Partners",
    "Terms",
    "Annual Return",
    "Privacy Policy",
    "Contact Us",
    "Unsubscribe",
    "Merger Hearing Advertisement"
  ];

  const partnerSites = [
    "Proptiger",
    "realestate.com.au",
    "realtor.com",
    "99.co",
    "collinsdictionary.com"
  ];

  const exploreLinks = [
    "News",
    "Home Loans",
    "Sitemap",
    "International"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Links Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Navigation View */}
          {activeSection === null ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Real Estate Column */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-6 text-sm tracking-wide uppercase">
                  {/* REAL ESTATE */}
                </h3>
                <button 
                  onClick={() => setActiveSection('real-estate')}
                  className="group flex items-center justify-between w-full text-left text-white font-medium mb-4 hover:text-gray-300 transition-colors"
                >
                  Find Properties for Sale
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Rentals Column */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-6 text-sm tracking-wide uppercase">
                  {/* RENTALS */}
                </h3>
                <button 
                  onClick={() => setActiveSection('rentals')}
                  className="group flex items-center justify-between w-full text-left text-white font-medium hover:text-gray-300 transition-colors"
                >
                  Rental Properties
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Projects Column */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-6 text-sm tracking-wide uppercase">
                  {/* PROJECTS */}
                </h3>
                <button 
                  onClick={() => setActiveSection('projects')}
                  className="group flex items-center justify-between w-full text-left text-white font-medium hover:text-gray-300 transition-colors"
                >
                  New Projects
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* City Data Column */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-6 text-sm tracking-wide uppercase">
                  {/* CITY DATA */}
                </h3>
                <button 
                  onClick={() => setActiveSection('city-data')}
                  className="group flex items-center justify-between w-full text-left text-white font-medium hover:text-gray-300 transition-colors"
                >
                  City Data
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Popular Searches Column */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-6 text-sm tracking-wide uppercase">
                  {/* POPULAR SEARCHES */}
                </h3>
                <button 
                  onClick={() => setActiveSection('popular-searches')}
                  className="group flex items-center justify-between w-full text-left text-white font-medium hover:text-gray-300 transition-colors"
                >
                  Popular Searches
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            /* Detail View */
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <h3 className="text-white text-xl font-semibold">
                  {sections[activeSection].title}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {sections[activeSection].links.map((link, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm py-2 px-3 rounded hover:bg-gray-800"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Award Banner */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-lg p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Come home<br />to Greatness
                  </h2>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="bg-red-500 text-white px-3 py-2 rounded text-sm font-bold">
                      Great<br />Place<br />To<br />Work.<br />
                      <span className="text-xs">Certified</span><br />
                      <span className="text-xs">FEB 2024 - FEB 2025<br />INDIA</span>
                    </div>
                    <div className="text-white">
                      <div className="text-3xl font-bold">5</div>
                      <div className="text-sm">RANKED<br />Best Companies to Work For<br />2024 by Great Place to Work</div>
                    </div>
                    <div className="bg-teal-600 text-white px-3 py-2 rounded text-xs text-center">
                      Best<br />Workplaces<br />Asia<br />2024
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-4 translate-y-4"></div>
              </div>
            </div>

            {/* Right Side - Links and App Info */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Links */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-4 text-sm tracking-wide uppercase">
                  COMPANY
                </h3>
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partner Sites */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-4 text-sm tracking-wide uppercase">
                  PARTNER SITES
                </h3>
                <ul className="space-y-2">
                  {partnerSites.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explore */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-4 text-sm tracking-wide uppercase">
                  EXPLORE
                </h3>
                <ul className="space-y-2">
                  {exploreLinks.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile App Section */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-4 text-sm tracking-wide uppercase">
                  EXPERIENCE HOUSING APP ON MOBILE
                </h3>
                <div className="space-y-3 mb-6">
                  <a href="#" className="block">
                    <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2">
                      <div className="text-white text-xs">
                        Download on the<br />
                        <span className="text-lg font-semibold">App Store</span>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block">
                    <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2">
                      <div className="text-white text-xs">
                        GET IT ON<br />
                        <span className="text-lg font-semibold">Google Play</span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* QR Code */}
                <div className="mb-4">
                  <div className="w-16 h-16 bg-white rounded border-2 border-gray-600 flex items-center justify-center">
                    <div className="text-xs text-gray-800 text-center">QR</div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Open Camera &<br />
                    Scan the QR Code to<br />
                    Download the App
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-gray-400 font-semibold mb-3 text-sm tracking-wide uppercase">
                    FOLLOW
                  </h4>
                  <div className="flex gap-3">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            ©2012-25 Locon Solutions Pvt. Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}