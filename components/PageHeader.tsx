import React from 'react';
import { Briefcase, LogOut } from 'lucide-react';

interface PageHeaderProps {
  userName: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ userName, currentPage, onNavigate, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'interaction', label: 'Interview' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-lg">
            <Briefcase size={18} className="sm:w-5 sm:h-5" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">HireLift</span>
        </div>
        <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-medium text-slate-600 hidden md:block">Welcome, {userName}</span>
          <button
            onClick={onLogout}
            className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-lg hover:bg-slate-100"
            title="Logout"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
