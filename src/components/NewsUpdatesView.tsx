import React, { useState } from 'react';
import { 
  Newspaper, 
  Tag, 
  Clock, 
  User, 
  Download, 
  ArrowRight, 
  Search, 
  Filter, 
  FileText, 
  BookOpen,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LATEST_NEWS_UPDATES, NEWSLETTER_ARCHIVE } from '../data/ngoData';
import { NewsItem, PageId } from '../types';
import { IndianPatternDivider } from './IndianPatternDivider';

interface NewsUpdatesViewProps {
  onNavigate: (page: PageId) => void;
}

export const NewsUpdatesView: React.FC<NewsUpdatesViewProps> = ({ onNavigate }) => {
  const { lang, isBengali } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const categories = ['All', 'Announcement', 'Community News', 'Press Release', 'Newsletter'];

  const filteredNews = LATEST_NEWS_UPDATES.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
            <Newspaper className="w-3.5 h-3.5" />
            <span>{isBengali ? 'বিজ্ঞপ্তি ও সংবাদ বুলেটিন' : 'News & Press Releases'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white tracking-tight">
            {isBengali 
              ? 'বঙ্গীয় সাহা সমিতির সর্বশেষ সংবাদ ও বিজ্ঞপ্তি' 
              : 'News, Announcements & Official Releases'}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isBengali
              ? 'প্রাতিষ্ঠানিক বিজ্ঞপ্তি, ছাত্রাবাস ভর্তি, আইনি স্মারকলিপি এবং ত্রৈমাসিক বুলেটিন সংকলন।'
              : 'Stay informed on municipal tax updates, student hostel admissions, legal representations before the National Commission, and research journals.'}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' && (isBengali ? 'সকল সংবাদ' : 'All Updates')}
                {cat === 'Announcement' && (isBengali ? 'ঘোষণাবলী' : 'Announcements')}
                {cat === 'Community News' && (isBengali ? 'সমাজ সংবাদ' : 'Community News')}
                {cat === 'Press Release' && (isBengali ? 'প্রেস রিলিজ' : 'Press Releases')}
                {cat === 'Newsletter' && (isBengali ? 'বুলেটিন ও পত্রিকা' : 'Newsletters')}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            {isBengali ? `মোট ${filteredNews.length}টি প্রকাশনা` : `Showing ${filteredNews.length} updates`}
          </div>
        </div>
      </section>

      {/* News Grid (Requested: Organization Announcements, Community News, Press Releases) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div 
              key={news.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-900 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-1 rounded-full font-bold ${
                    news.category === 'Press Release' ? 'bg-red-50 text-red-700' :
                    news.category === 'Announcement' ? 'bg-orange-50 text-orange-700' :
                    'bg-blue-50 text-blue-900'
                  }`}>
                    {isBengali ? (news.bengaliCategory || news.category) : news.category}
                  </span>
                  <span className="text-slate-400 font-medium">{isBengali ? (news.bengaliReadTime || news.readTime) : news.readTime}</span>
                </div>

                <h3 className="text-lg font-serif-heading font-bold text-blue-950 leading-snug">
                  {isBengali ? news.bengaliTitle : news.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {isBengali ? news.bengaliSummary : news.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{isBengali ? (news.bengaliAuthor || news.author) : news.author}</span>
                <button
                  onClick={() => setActiveArticle(news)}
                  className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>{isBengali ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Reading Full Article */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                {(isBengali ? (activeArticle.bengaliCategory || activeArticle.category) : activeArticle.category)} • {(isBengali ? (activeArticle.bengaliDate || activeArticle.date) : activeArticle.date)}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif-heading font-bold text-blue-950">
                {isBengali ? activeArticle.bengaliTitle : activeArticle.title}
              </h2>
              <div className="text-xs text-slate-500 flex items-center gap-4">
                <span>{isBengali ? `লেখক: ${activeArticle.bengaliAuthor || activeArticle.author}` : `By: ${activeArticle.author}`}</span>
                <span>•</span>
                <span>{isBengali ? (activeArticle.bengaliReadTime || activeArticle.readTime) : activeArticle.readTime}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isBengali ? activeArticle.bengaliContent : activeArticle.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800"
              >
                {isBengali ? 'বন্ধ করুন' : 'Close Window'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Divider */}
      <IndianPatternDivider variant="simple" />

      {/* 4. NEWSLETTER ARCHIVE (Blog / news card layout as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'সাময়িকী ও গবেষণা পত্রিকা' : 'Publications Archive'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'বঙ্গীয় সাহা সমিতি বুলেটিন ও সাময়িকী সংগ্রহ' : 'Newsletter & Journal Archive'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWSLETTER_ARCHIVE.map((issue) => (
              <div 
                key={issue.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-600">{isBengali ? (issue.bengaliIssue || issue.issue) : issue.issue}</span>
                    <span className="text-slate-400 font-medium">{isBengali ? (issue.bengaliPublishDate || issue.publishDate) : issue.publishDate}</span>
                  </div>

                  <h3 className="text-base font-serif-heading font-bold text-blue-950">
                    {isBengali ? issue.bengaliTitle : issue.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBengali ? issue.bengaliDescription : issue.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{isBengali ? (issue.bengaliPages || issue.pages) : issue.pages}</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(isBengali 
                        ? `বুলেটিন ${isBengali ? (issue.bengaliIssue || issue.issue) : issue.issue} ডিজিটাল কপি শীঘ্রই উন্মুক্ত হবে। কেন্দ্রীয় কার্যালয়ের পাঠাগার থেকে সংগৃহীত কপি সংগ্রহ করতে পারেন।`
                        : `Digital copy of ${issue.issue} is available at the Central Office library, 52B Indian Mirror Street.`);
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-blue-900 hover:text-orange-600"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isBengali ? 'পিডিএফ সংগ্রহ' : 'Download PDF'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
