import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Sparkles, 
  Users, 
  Landmark, 
  Calendar, 
  Newspaper, 
  Image as ImageIcon, 
  Mail, 
  Phone,
  BookOpen
} from 'lucide-react';
import { TreeLogo } from './TreeLogo';
import { useLanguage } from '../context/LanguageContext';
import { PageId, PAGE_ROUTES } from '../types';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onDonateClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activePage, 
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, isBengali } = useLanguage();

  const navItems: { id: PageId; labelEn: string; labelBn: string; icon: React.ReactNode }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'মূল পাতা', icon: <Landmark className="w-4 h-4" /> },
    { id: 'about', labelEn: 'About Us', labelBn: 'আমাদের কথা', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'heritage', labelEn: 'Cultural Heritage', labelBn: 'সাংস্কৃতিক ঐতিহ্য', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'membership', labelEn: 'Membership', labelBn: 'সদস্যপদ', icon: <Users className="w-4 h-4" /> },
    { id: 'events', labelEn: 'Events & Activities', labelBn: 'কর্মসূচি', icon: <Calendar className="w-4 h-4" /> },
    { id: 'news', labelEn: 'News & Updates', labelBn: 'সংবাদ ও বিজ্ঞপ্তি', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'gallery', labelEn: 'Gallery', labelBn: 'চিত্রশালা', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'donate', labelEn: 'Donate / Support', labelBn: 'অনুদান ও সহায়তা', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'contact', labelEn: 'Contact Us', labelBn: 'যোগাযোগ', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleLinkClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full shadow-md bg-white">
      {/* 1. TOP UTILITY RIBBON (Blue & Saffron) */}
      <div className="bg-blue-950 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-orange-300 font-semibold text-xs tracking-wide">
              {isBengali 
                ? 'পশ্চিমবঙ্গের তপশিলি জাতি শুঁড়ি সম্প্রদায়ের সামাজিক সংগঠন' 
                : 'Social Organization of the Scheduled Caste Sunri Community of West Bengal'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-2 text-blue-200 text-xs">
              <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="font-mono">033-22271599 / 9433041597 (M)</span>
            </div>

            {/* Language Switcher */}
            <div 
              className="flex items-center bg-blue-900/80 rounded-lg p-0.5 border border-blue-700/60" 
              role="group" 
              aria-label="Language selection"
            >
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${
                  lang === 'en' 
                    ? 'bg-orange-600 text-white font-bold shadow-xs' 
                    : 'text-blue-200 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-md transition-all ${
                  lang === 'bn' 
                    ? 'bg-orange-600 text-white font-bold shadow-xs' 
                    : 'text-blue-200 hover:text-white'
                }`}
                title="বাংলা"
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL BRANDING HEADER (Spacious, No Overlaps) */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo + Full Titles */}
          <a 
            href={PAGE_ROUTES.home}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-3.5 sm:gap-4 text-left group focus:outline-none flex-1 min-w-0"
            aria-label="Bangiya Saha Samity Home"
          >
            <div className="relative shrink-0">
              <TreeLogo className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl shadow-sm border border-amber-300 ring-2 ring-orange-500/20 group-hover:scale-105 transition-transform" />
            </div>

            <div className="flex flex-col justify-center min-w-0 py-1">
              <h1 className="font-serif-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-blue-950 leading-snug">
                {isBengali ? 'বঙ্গীয় সাহা সমিতি (শুঁড়ি সমাজ)' : 'Bangiya Saha Samity (Sunri Samaj)'}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs sm:text-sm font-semibold text-orange-600">
                <span>
                  {isBengali 
                    ? "পশ্চিমবঙ্গ 'শুঁড়ি' সমাজ • তপশিলি জাতি সামাজিক প্রতিষ্ঠান" 
                    : "West Bengal 'Sunri' Samaj • Scheduled Caste Social Organisation"}
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200 font-mono text-[11px] font-bold">
                  {isBengali ? 'স্থাপিত ১৯৩৬-৩৭' : 'Est. 1936–37'}
                </span>
              </div>
            </div>
          </a>

          {/* Header Right: Hamburger Menu Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-blue-950 hover:text-blue-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 transition-all font-semibold text-xs sm:text-sm cursor-pointer shadow-xs active:scale-95"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-slate-800">{isBengali ? 'মেনু বন্ধ' : 'Close'}</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-blue-900" />
                  <span className="font-bold text-slate-800">{isBengali ? 'মেনু' : 'Menu'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* NAVIGATION DRAWER MENU (Toggled via header hamburger button) */}
      {mobileMenuOpen && (
        <nav 
          id="main-navigation-drawer"
          aria-label="Site Navigation"
          className="bg-white text-slate-900 border-b border-slate-200 px-4 sm:px-6 lg:px-8 pt-4 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between px-2 pb-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {isBengali ? 'ওয়েবসাইট সূচিপত্র (৯টি বিভাগ)' : 'Website Navigation (9 Sections)'}
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={PAGE_ROUTES[item.id]}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activePage === item.id
                      ? 'bg-blue-900 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                  }`}
                >
                  <span className={activePage === item.id ? 'text-orange-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{isBengali ? item.labelBn : item.labelEn}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
