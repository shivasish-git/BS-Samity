import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  History, 
  Download,
  Share2,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UPCOMING_EVENTS, PAST_EVENTS } from '../data/ngoData';
import { IndianPatternDivider } from './IndianPatternDivider';
import { PageId, PAGE_ROUTES } from '../types';

interface EventsActivitiesViewProps {
  onNavigate: (page: PageId) => void;
  onDonateClick: () => void;
}

export const EventsActivitiesView: React.FC<EventsActivitiesViewProps> = ({ 
  onNavigate, 
  onDonateClick 
}) => {
  const { lang, isBengali } = useLanguage();
  const [rsvpEvent, setRsvpEvent] = useState<string | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeePhone) return;
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setRsvpEvent(null);
      setAttendeeName('');
      setAttendeePhone('');
    }, 2500);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isBengali ? 'কার্যসূচি ও অনুষ্ঠানমালা' : 'Conventions & Calendar'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white tracking-tight">
            {isBengali 
              ? 'বঙ্গীয় সাহা সমিতির অনুষ্ঠান ও কার্যক্রম' 
              : 'Events & Community Activities'}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isBengali
              ? 'বার্ষিক রাজ্য সম্মেলন, ড. আম্বেদকর স্মারক বক্তৃতা, ছাত্রবৃত্তি প্রদান অনুষ্ঠান এবং ঐতিহাসিক মহাসমাবেশের সমন্বিত কার্যসূচি।'
              : 'Participate in upcoming community conventions, student felicitation ceremonies, legal seminars, and explore archives of our historic assemblies.'}
          </p>
        </div>
      </section>

      {/* 1. UPCOMING EVENTS (Event Card Format as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-l-4 border-blue-900 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'আসন্ন অনুষ্ঠান' : 'Scheduled Programs'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'আসন্ন কর্মসূচি ও সম্মেলন ২০২৬' : 'Upcoming Events'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:border-orange-500 transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      {isBengali ? event.bengaliDate : event.date}
                    </span>
                    {event.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-900 text-white">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-serif-heading font-bold text-blue-950 leading-snug">
                    {isBengali ? event.bengaliTitle : event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{isBengali ? event.bengaliVenue : event.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {isBengali ? event.bengaliDescription : event.description}
                  </p>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{event.attendees || 'Open to All'}</span>
                  <button
                    onClick={() => setRsvpEvent(event.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    {isBengali ? 'উপস্থিতি নিশ্চিত করুন' : 'RSVP / Attend'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-blue-900">
              {isBengali ? 'অনুষ্ঠানে উপস্থিতির নিবন্ধন' : 'Event Attendance RSVP'}
            </h3>
            {rsvpSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>{isBengali ? 'আপনার উপস্থিতি নথিভুক্ত হয়েছে! ধন্যবাদ।' : 'Your attendance has been confirmed! Thank you.'}</span>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isBengali ? 'আপনার নাম' : 'Your Name'}</label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isBengali ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    value={attendeePhone}
                    onChange={(e) => setAttendeePhone(e.target.value)}
                    placeholder="+91 98300 00000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-900"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-500"
                  >
                    {isBengali ? 'নিবন্ধন সম্পন্ন করুন' : 'Confirm Registration'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpEvent(null)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                  >
                    {isBengali ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Cultural Divider */}
      <IndianPatternDivider variant="simple" />

      {/* 2. PAST EVENTS (Event Archive as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'ঐতিহাসিক সম্মেলন' : 'Historic Archive'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'অতীতের স্মরণীয় সম্মেলন ও মাইলফলক' : 'Past Events & Milestones'}
            </h2>
          </div>

          <div className="space-y-4">
            {PAST_EVENTS.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-900 transition-colors flex flex-col md:flex-row justify-between gap-6 items-start md:items-center"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                      {isBengali ? event.bengaliDate : event.date}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">📍 {isBengali ? event.bengaliVenue : event.venue}</span>
                  </div>

                  <h3 className="text-lg font-serif-heading font-bold text-blue-950">
                    {isBengali ? event.bengaliTitle : event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBengali ? event.bengaliDescription : event.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Archived Landmark</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EVENT GALLERY (Image gallery layout as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="border-l-4 border-blue-900 pl-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {isBengali ? 'চিত্রসম্ভার' : 'Photo Gallery'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
                {isBengali ? 'অনুষ্ঠান ও সম্মেলনের আলোকচিত্র' : 'Event Gallery'}
              </h2>
            </div>
            <a
              href={PAGE_ROUTES.gallery}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gallery');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:text-orange-600 transition-colors"
            >
              <span>{isBengali ? 'সম্পূর্ণ চিত্রশালা দেখুন' : 'Explore All Albums'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 space-y-3 p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                  alt="Student Hostel Assembly"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-2 pb-2">
                <h4 className="font-bold text-sm text-blue-950">
                  {isBengali ? 'ছাত্রাবাস বার্ষিক সম্মেলন ও সংবর্ধনা' : 'Student Hostel Academic Assembly'}
                </h4>
                <p className="text-xs text-slate-500">52B Indian Mirror Street • Kolkata</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 space-y-3 p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
                  alt="State Convention Reunion"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-2 pb-2">
                <h4 className="font-bold text-sm text-blue-950">
                  {isBengali ? 'বিবেকানন্দ হলে শুঁড়ি সমাজের প্রতিনিধি সম্মেলন' : 'Vivekananda Society Hall Delegate Reunion'}
                </h4>
                <p className="text-xs text-slate-500">151 Vivekananda Road • Kolkata</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 space-y-3 p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Female Wing Opening"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-2 pb-2">
                <h4 className="font-bold text-sm text-blue-950">
                  {isBengali ? 'ছাত্রী শাখা উদ্বোধন ও বই বিতরণ' : 'Female Student Wing & Book Distribution'}
                </h4>
                <p className="text-xs text-slate-500">Hostel Annex • 2018 Inauguration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
