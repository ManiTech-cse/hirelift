import React from 'react';
import { FileText, Linkedin, MessageSquare, Info, Github, Twitter, Mail, Heart } from 'lucide-react';

// Footer Component - v2.0
interface FooterProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const Footer = ({ currentPage, onNavigate }: FooterProps) => {
    const productLinks = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'resume', label: 'Resume Builder', icon: FileText },
        { id: 'linkedin', label: 'LinkedIn Optimizer', icon: Linkedin },
        { id: 'interaction', label: 'AI Career Advisor', icon: MessageSquare },
    ];

    return (
        <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Mobile View - Product Links Only with Icons */}
            <div className="block lg:hidden border-t border-slate-700">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">Quick Access</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {productLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = currentPage === link.id;
                            return (
                                <button
                                    key={link.id}
                                    onClick={() => onNavigate(link.id)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-8 h-8" />
                                    <span className="text-sm font-semibold text-center">{link.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Copyright */}
                <div className="border-t border-slate-700 py-4">
                    <p className="text-center text-sm text-slate-400">
                        © 2025 HireLift. All rights reserved.
                    </p>
                    <p className="text-center text-xs text-slate-500 mt-1">
                        Made with <Heart className="w-3 h-3 inline text-red-500 fill-current" /> for job seekers
                    </p>
                </div>
            </div>

            {/* Desktop/Laptop View - Full Footer */}
            <div className="hidden lg:block border-t border-slate-700">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Company Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">HireLift</h2>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">
                                AI-powered career platform helping you land your dream job with personalized guidance.
                            </p>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-blue-600 transition-all flex items-center justify-center hover:scale-110">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-blue-600 transition-all flex items-center justify-center hover:scale-110">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-blue-600 transition-all flex items-center justify-center hover:scale-110">
                                    <Github className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-blue-600 transition-all flex items-center justify-center hover:scale-110">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Product</h3>
                            <ul className="space-y-3">
                                {productLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = currentPage === link.id;
                                    return (
                                        <li key={link.id}>
                                            <button
                                                onClick={() => onNavigate(link.id)}
                                                className={`flex items-center gap-2 transition-all ${isActive
                                                    ? 'text-blue-400 font-semibold'
                                                    : 'text-slate-300 hover:text-white hover:translate-x-1'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {link.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Career Tips
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Interview Prep
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Salary Guide
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Desktop */}
                <div className="border-t border-slate-700 py-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-slate-400">
                                © 2025 HireLift. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm text-slate-400">
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                            </div>
                            <p className="text-sm text-slate-400">
                                Made with <Heart className="w-3 h-3 inline text-red-500 fill-current" /> for job seekers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
