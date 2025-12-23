import React from 'react';
import { Briefcase, Home, FileText, Linkedin, Users } from 'lucide-react';

interface NavBarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const NavBar = ({ currentPage = 'home', onNavigate }: NavBarProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Briefcase },
    { id: 'resume', label: 'Resume Build', icon: FileText },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { id: 'interaction', label: 'Personal Interaction', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
          <Briefcase size={24} className="text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">HireLift</span>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
              title={item.label}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
