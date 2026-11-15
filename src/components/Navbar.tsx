import React, { useState, useEffect, useRef } from 'react';
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
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [ribbonHeight, setRibbonHeight] = useState<number>(34);

  // Dynamically measure ribbon height so only the branding header (div:nth-of-type(2)) sticks at top-0
  useEffect(() => {
    const updateHeight = () => {
      if (ribbonRef.current) {
        setRibbonHeight(ribbonRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [lang, isBengali]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: { id: PageId; labelEn: string; labelBn: string; icon: React.ReactNode }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'প্রথম পাতা', icon: <Landmark className="w-4 h-4" /> },
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
    <header 
      className="sticky z-50 w-full bg-white transition-all"
      style={{ top: `-${ribbonHeight}px` }}
    >
      {/* 1. TOP UTILITY RIBBON (Blue & Saffron) - UN-STICKY (scrolls normally with page) */}
      <div 
        ref={ribbonRef}
        className="bg-blue-950 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b-2 border-orange-500"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 items-center gap-2 sm:gap-4">
          {/* Left 50% */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <span className="text-orange-300 font-semibold text-[10px] sm:text-xs tracking-tight sm:tracking-wide leading-tight sm:leading-normal">
              {isBengali 
                ? 'পশ্চিমবঙ্গের তপশিলি জাতি শুঁড়ি সম্প্রদায়ের সামাজিক সংগঠন' 
                : 'Social Organization of the Scheduled Caste Sunri Community of West Bengal'}
            </span>
          </div>

          {/* Right 50% */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-blue-200 text-[10px] sm:text-xs min-w-0 text-right">
            <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="font-mono flex flex-col items-end leading-tight">
              <span>{isBengali ? '০৩৩-২২২৭১৫৯৯' : '033-22271599'}</span>
              <span>{isBengali ? '৯৪৩৩০৪১৫৯৭' : '9433041597 (M)'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL BRANDING HEADER (STICKY AT TOP-0) */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-md py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo + Full Institutional Titles */}
          <a 
            href={PAGE_ROUTES.home}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2.5 sm:gap-4 text-left group focus:outline-none flex-1 min-w-0"
            aria-label={isBengali ? 'বঙ্গীয় সাহা সমিতি প্রথম পাতা' : 'Bangiya Saha Samity Home'}
          >
            {/* Logo */}
            <div className="relative shrink-0">
              <TreeLogo className="w-11 h-11 sm:w-15 sm:h-15 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl shadow-xs border border-amber-300 ring-2 ring-orange-500/15 group-hover:scale-105 transition-transform" />
            </div>

            {/* Typography & Subtitle Hierarchy */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <h1 className="font-serif-heading text-[13px] min-[360px]:text-[14px] min-[400px]:text-[15px] sm:text-2xl md:text-3xl font-extrabold tracking-tight text-blue-950 leading-tight">
                  {isBengali ? 'বঙ্গীয় সাহা সমিতি' : 'Bangiya Saha Samity'}
                </h1>
                <span className="text-[11px] min-[360px]:text-xs sm:text-base md:text-lg font-semibold text-orange-600 leading-tight">
                  {isBengali ? '(শুঁড়ি সমাজ)' : '(Sunri Samaj)'}
                </span>
              </div>

              {/* Subtitle / Institutional Tags in max 2 readable lines on mobile */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 sm:mt-1 text-slate-600">
                <span className="text-[9.5px] min-[360px]:text-[10px] sm:text-xs font-medium leading-tight">
                  {isBengali 
                    ? "পশ্চিমবঙ্গ 'শুঁড়ি' সমাজ" 
                    : "West Bengal 'Sunri' Samaj"}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200/90 font-mono text-[9px] sm:text-[10.5px] font-bold shrink-0">
                  {isBengali ? 'স্থাপিত ১৯৩৬-৩৭' : 'Est. 1936–37'}
                </span>
              </div>
            </div>
          </a>

          {/* Header Right: Menu Toggle + Language Translator directly below it */}
          <div className="flex flex-col items-end gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border transition-all font-semibold text-xs sm:text-sm cursor-pointer shadow-xs active:scale-95 ${
                mobileMenuOpen 
                  ? 'bg-orange-50 text-orange-800 border-orange-300 ring-2 ring-orange-500/20' 
                  : 'bg-slate-100 hover:bg-slate-200/90 text-blue-950 hover:text-blue-900 border-slate-200'
              }`}
              aria-label={isBengali ? 'মেনু প্রদর্শন পরিবর্তন' : 'Toggle navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span className="font-bold text-[11px] sm:text-sm text-slate-800">{isBengali ? 'বন্ধ' : 'Close'}</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                  <span className="font-bold text-[11px] sm:text-sm text-slate-800">{isBengali ? 'মেনু' : 'Menu'}</span>
                </>
              )}
            </button>

            {/* Language Translator Switcher directly below Menu button */}
            <div 
              className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 shadow-2xs" 
              role="group" 
              aria-label={isBengali ? 'ভাষা নির্বাচন' : 'Language selection'}
            >
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  lang === 'en' 
                    ? 'bg-orange-600 text-white font-bold shadow-xs' 
                    : 'text-slate-600 hover:text-blue-950'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  lang === 'bn' 
                    ? 'bg-orange-600 text-white font-bold shadow-xs' 
                    : 'text-slate-600 hover:text-blue-950'
                }`}
                title="বাংলা"
              >
                বাংলা
              </button>
            </div>
          </div>

        </div>

        {/* NAVIGATION DRAWER MENU OVERLAY (Anchored to sticky branding bar without layout shift) */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Absolute overlay dropdown menu */}
            <nav 
              id="main-navigation-drawer"
              aria-label={isBengali ? 'ওয়েবসাইট সূচিপত্র' : 'Site Navigation'}
              className="absolute top-full left-0 right-0 w-full z-50 bg-white text-slate-900 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 shadow-2xl max-h-[calc(100vh-140px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
          </>
        )}
      </div>
    </header>
  );
};
