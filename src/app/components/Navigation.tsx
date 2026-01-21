import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/app/components/ui/utils';

const Navigation: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'Overview' },
    { path: '/referrer', label: 'Referrer' },
    { path: '/patient', label: 'Patient' },
    { path: '/receiver', label: 'Receiver' },
    { path: '/tracking', label: 'Tracking' }
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏥</span>
            <span className="text-sm">Referral Flow Prototype</span>
          </div>
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  'px-4 py-2 text-sm rounded-md transition-colors',
                  location.pathname === tab.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end space-x-4 py-2 text-xs text-gray-600 border-t border-gray-100">
          <span>Need help? Call us: (0x) xxxx xxxx</span>
          <span>Hours: Mon–Fri, 9am–5pm</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
