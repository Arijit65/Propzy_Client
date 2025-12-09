import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center text-sm text-gray-600 flex-wrap gap-2" aria-label="Breadcrumb">
          <Link 
            to="/" 
            className="hover:text-purple-600 transition font-medium"
          >
            Home
          </Link>
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href && index !== items.length - 1 ? (
                <Link 
                  to={item.href} 
                  className="hover:text-purple-600 transition font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={index === items.length - 1 ? 'text-gray-900 font-semibold' : 'font-medium'}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
