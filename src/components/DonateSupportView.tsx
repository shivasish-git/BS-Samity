import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Building2, 
  Copy, 
  Check, 
  Sparkles, 
  Users, 
  GraduationCap, 
  BookOpen, 
  ArrowRight,
  HandHeart,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  SPONSORSHIP_PROGRAMS, 
  VOLUNTEER_ROLES, 
  BANK_DETAILS, 
  NGO_DETAILS 
} from '../data/ngoData';
import { PageId, PAGE_ROUTES } from '../types';
import { IndianPatternDivider } from './IndianPatternDivider';

interface DonateSupportViewProps {
  onNavigate: (page: PageId) => void;
  onDonateClick: (cause?: string) => void;
}

export const DonateSupportView: React.FC<DonateSupportViewProps> = ({ 
  onNavigate, 
  onDonateClick 
}) => {
  const { lang, isBengali } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [volunteerRole, setVolunteerRole] = useState<string | null>(null);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volDistrict, setVolDistrict] = useState('');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volPhone) return;
    setVolunteerSubmitted(true);
    setTimeout(() => {
      setVolunteerSubmitted(false);
      setVolunteerRole(null);
      setVolName('');
      setVolPhone('');
      setVolDistrict('');
    }, 2500);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isBengali ? 'সহায়তা ও সমাজসেবা তহবিল' : 'Philanthropy & Support'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white tracking-tight">
            {isBengali 
              ? 'গ্রামীণ ছাত্রাবাস ও শিক্ষাবৃত্তিতে সাহায্য করুন' 
              : 'Donate & Support Bangiya Saha Samity'}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isBengali
              ? 'আপনার প্রতিটি অনুদান ৫০ জন গ্রামীণ দরিদ্র ছাত্রের কলকাতায় আবাসন, কন্যাদের শিক্ষাবৃত্তি এবং অসহায় দুস্থদের সেবায় সরাসরি ব্যবহৃত হয়।'
              : 'Every rupee directly sustains our 50-student residential hostel at 52B Indian Mirror Street, collegiate scholarships for female students, and distress relief.'}
          </p>
        </div>
      </section>

      {/* 1. DONATION INFORMATION (Official Credentials & Bank Details) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Bank Account Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-blue-900 space-y-6">
            <div className="border-l-4 border-blue-900 pl-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {isBengali ? 'ব্যাংক স্থানান্তর বিবরণ' : 'Bank Transfer Credentials'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-blue-900">
                {isBengali ? 'সরাসরি ব্যাংক অ্যাকাউন্ট বিবরণী (NEFT / IMPS / RTGS)' : 'Official Bank Details for Donations'}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-blue-200/60 gap-1">
                <span className="text-slate-500">{isBengali ? 'ব্যাংকের নাম' : 'Bank Name'}</span>
                <span className="font-bold text-blue-950">{BANK_DETAILS.bankName}</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-blue-200/60 gap-1">
                <span className="text-slate-500">{isBengali ? 'অ্যাকাউন্টের নাম' : 'Account Name'}</span>
                <span className="font-bold text-blue-950">{BANK_DETAILS.accountName}</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-blue-200/60 gap-1">
                <span className="text-slate-500">{isBengali ? 'অ্যাকাউন্ট নম্বর' : 'Account Number'}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-950 text-base">{BANK_DETAILS.accountNumber}</span>
                  <button
                    onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'acc')}
                    className="p-1 rounded hover:bg-blue-200 text-blue-900"
                    title="Copy Account Number"
                  >
                    {copiedField === 'acc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-blue-200/60 gap-1">
                <span className="text-slate-500">{isBengali ? 'আইএফএসসি কোড' : 'IFSC Code'}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-orange-600 text-base">{BANK_DETAILS.ifscCode}</span>
                  <button
                    onClick={() => handleCopy(BANK_DETAILS.ifscCode, 'ifsc')}
                    className="p-1 rounded hover:bg-blue-200 text-blue-900"
                    title="Copy IFSC Code"
                  >
                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 gap-1">
                <span className="text-slate-500">{isBengali ? 'শাখা' : 'Branch Location'}</span>
                <span className="font-medium text-slate-700">{BANK_DETAILS.branch}</span>
              </div>
            </div>

            {/* Quick Instant Donation Modal Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onDonateClick()}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white bg-orange-600 hover:bg-orange-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-orange-400"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{isBengali ? 'অনলাইনে অনুদান দিন' : 'Donate Online Instantly'}</span>
              </button>

              <a
                href={PAGE_ROUTES.contact}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-blue-900 bg-blue-50 hover:bg-blue-100 transition-colors inline-flex items-center justify-center"
              >
                {isBengali ? 'চেক / ডিডি জমা দেওয়ার ঠিকানা' : 'Office Cheque Desk'}
              </a>
            </div>
          </div>

          {/* Official Receipts & Transparency */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="border-l-4 border-orange-500 pl-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {isBengali ? 'স্বচ্ছতা ও নির্ভরযোগ্যতা' : 'Governance & Receipts'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-blue-900">
                {isBengali ? 'অফিসিয়াল অনুদান রসিদ ও স্বীকৃতি' : 'Official Donation Receipts'}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isBengali ? 'নিবন্ধিত সামাজিক প্রতিষ্ঠান (স্থাপিত ১৯৩৬-৩৭)' : 'Registered Social Organisation (Est. 1936-37)'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isBengali
                    ? 'বঙ্গীয় সাহা সমিতি (শুঁড়ি সমাজ)-কে প্রদত্ত সকল অনুদানের স্বচ্ছ হিসাব ও বিধিবদ্ধ অডিট নিশ্চিত করা হয়।'
                    : 'All donations made to Bangiya Saha Samity are managed with complete transparency, regular audits, and official non-profit governance.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-blue-950">{isBengali ? 'রসিদ প্রাপ্তির নিয়মাবলী' : 'Receipt & Acknowledgment Process:'}</div>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li>• {isBengali ? 'অনলাইন ট্রান্সফারের পর স্ক্রিনশট বা ইউটিআর (UTR) নম্বর প্রদান করুন।' : 'Provide transaction reference (UTR) after completing transfer.'}</li>
                  <li>• {isBengali ? 'অফিসিয়াল রসিদের জন্য দাতার পূর্ণ নাম, মোবাইল ও ঠিকানা উল্লেখ করুন।' : 'Full donor name, mobile, and address required for official recordkeeping.'}</li>
                  <li>• {isBengali ? '৪৮ ঘণ্টার মধ্যে ডিজিটাল অনুদান রসিদ আপনার ইমেলে পাঠানো হবে।' : 'Digitally acknowledged donation receipt issued within 48 hours to your email.'}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-slate-600">
                <span className="font-bold text-blue-900">{isBengali ? 'নিবন্ধন তথ্য: ' : 'Registration: '}</span>
                <span>Regd. No. 4522 of 1936–37 • Head Office: 52B Indian Mirror Street, Kolkata – 700013.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Divider */}
      <IndianPatternDivider variant="simple" />

      {/* 2. SPONSORSHIP OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-l-4 border-blue-900 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'দীর্ঘমেয়াদী পৃষ্ঠপোষকতা' : 'Dedicated Sponsorships'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'বিশেষ স্পনসরশিপ ও সমাজকল্যাণ তহবিল' : 'Sponsorship Opportunities'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isBengali
                ? 'একটি সম্পূর্ণ শিক্ষাবর্ষের জন্য গ্রামীণ ছাত্র বা মেধাবী কন্যাদের শিক্ষায় পৃষ্ঠপোষকতা করুন।'
                : 'Directly adopt a student resident or fund specific educational endowments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPONSORSHIP_PROGRAMS.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:border-orange-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-serif-heading text-blue-900">
                      ₹{prog.amount.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-orange-100 text-orange-700">
                      {isBengali ? prog.bengaliFrequency : prog.frequency}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif-heading font-bold text-blue-950">
                    {isBengali ? prog.bengaliTitle : prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBengali ? prog.bengaliDescription : prog.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onDonateClick(prog.title)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>{isBengali ? 'এই তহবিলে পৃষ্ঠপোষকতা করুন' : 'Sponsor This Program'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VOLUNTEER PROGRAMS (Student Academic Tutor, Legal Aid Cell, Social Welfare Relief) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'সেবামূলক অংশগ্রহণ' : 'Get Involved'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer Programs'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isBengali
                ? 'আপনার মেধা, সময় ও পরামর্শ দিয়ে সমাজকল্যাণ ও ছাত্রাবাসের শিক্ষার্থীদের সহায়তা করুন।'
                : 'Offer your academic skills, legal expertise, or community time to uplift our youth and families.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOLUNTEER_ROLES.map((role) => (
              <div 
                key={role.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:border-blue-900 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-orange-600 font-bold">
                      {isBengali ? role.bengaliCommitment : role.commitment}
                    </span>
                    <span className="p-2 bg-blue-50 text-blue-900 rounded-xl">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-lg font-serif-heading font-bold text-blue-950">
                    {isBengali ? role.bengaliTitle : role.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBengali ? role.bengaliDescription : role.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => setVolunteerRole(role.title)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-blue-900 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    {isBengali ? 'স্বেচ্ছাসেবী হিসেবে আবেদন করুন' : 'Apply to Volunteer'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Application Modal */}
      {volunteerRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-blue-950">
              {isBengali ? 'স্বেচ্ছাসেবী আবেদন পত্র' : 'Volunteer Registration'}
            </h3>
            <p className="text-xs text-slate-500">
              Role: <span className="font-bold text-orange-600">{volunteerRole}</span>
            </p>

            {volunteerSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                {isBengali ? 'আপনার আবেদন গৃহীত হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।' : 'Thank you! Our volunteer coordinator will contact you shortly.'}
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isBengali ? 'আপনার নাম' : 'Full Name'}</label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isBengali ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    value={volPhone}
                    onChange={(e) => setVolPhone(e.target.value)}
                    placeholder="+91 98300 00000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{isBengali ? 'জেলা / শহর' : 'District / City'}</label>
                  <input
                    type="text"
                    value={volDistrict}
                    onChange={(e) => setVolDistrict(e.target.value)}
                    placeholder="e.g. Kolkata / Howrah / Murshidabad"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-900"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-500 shadow-xs"
                  >
                    {isBengali ? 'আবেদন জমা দিন' : 'Submit Volunteer Form'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVolunteerRole(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    {isBengali ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
