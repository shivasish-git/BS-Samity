import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  MapPin, 
  Calendar, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_ITEMS } from '../data/ngoData';
import { GalleryItem, PageId } from '../types';
import { IndianPatternDivider } from './IndianPatternDivider';

interface GalleryViewProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  const { lang, isBengali } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Photos' | 'Videos' | 'Community Activities' | 'Cultural Programs'>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { key: 'All', label: isBengali ? 'সকল অ্যালবাম' : 'All Media' },
    { key: 'Photos', label: isBengali ? 'আলোকচিত্র' : 'Photos' },
    { key: 'Videos', label: isBengali ? 'ভিডিও ও তথ্যচিত্র' : 'Videos' },
    { key: 'Community Activities', label: isBengali ? 'সমাজ কর্মকাণ্ড' : 'Community Activities' },
    { key: 'Cultural Programs', label: isBengali ? 'সাংস্কৃতিক অনুষ্ঠান' : 'Cultural Programs' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isBengali ? 'চিত্রশালা ও ভিডিও সংকলন' : 'Media Gallery'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white tracking-tight">
            {isBengali 
              ? 'বঙ্গীয় সাহা সমিতির আলোকচিত্র ও ঐতিহাসিক সংগ্রহ' 
              : 'Community Photo & Video Gallery'}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isBengali
              ? '৭৭ মানিকতলা স্ট্রিটের জন্মস্থান, ৫২বি ভবনের চারতলা ছাত্রাবাস, বিবেকানন্দ হল সম্মেলন ও সাংস্কৃতিক মুহূর্তের স্মৃতিমালা।'
              : 'Visual moments of community gatherings, our 50-student hostel at 52B Indian Mirror Street, foundational Maa Jagathanani temple, and academic ceremonies.'}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setSelectedFilter(tab.key as any);
                  setActiveLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedFilter === tab.key 
                    ? 'bg-blue-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            {isBengali ? `${filteredItems.length}টি প্রদর্শিত হচ্ছে` : `${filteredItems.length} items`}
          </div>
        </div>
      </section>

      {/* Gallery Grid (Modern Responsive Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="p-3 rounded-full bg-white/90 text-blue-900 shadow-lg">
                      {item.category === 'Videos' ? <Video className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif-heading font-bold text-base text-blue-950 group-hover:text-orange-600 transition-colors leading-snug">
                    {isBengali ? item.bengaliTitle : item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {isBengali ? item.bengaliDescription : item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[180px]">📍 {item.location}</span>
                <span className="font-semibold text-blue-900">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-blue-950 text-white">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-orange-500 font-bold">{activeItem.category}</span>
                <span>•</span>
                <span>{activeItem.date}</span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Media Area with Prev/Next Controls */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] max-h-[58vh]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[58vh] max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-white space-y-2 overflow-y-auto">
              <h3 className="text-xl font-serif-heading font-bold text-blue-950">
                {isBengali ? activeItem.bengaliTitle : activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isBengali ? activeItem.bengaliDescription : activeItem.description}
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>{activeItem.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
