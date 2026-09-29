import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Send, 
  FileText, 
  AlertCircle, 
  Download,
  Building2,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WEST_BENGAL_DISTRICTS, NGO_DETAILS } from '../data/ngoData';
import { MembershipFormData, PageId } from '../types';
import { IndianPatternDivider } from './IndianPatternDivider';

interface MembershipViewProps {
  onNavigate: (page: PageId) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onNavigate }) => {
  const { lang, isBengali } = useLanguage();

  const [formData, setFormData] = useState<MembershipFormData>({
    fullName: '',
    fatherName: '',
    dateOfBirth: '',
    occupation: '',
    address: '',
    mobileNumber: '',
    email: '',
    district: '',
    membershipType: 'Life Member',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.fatherName || !formData.mobileNumber || !formData.district) {
      setErrorMsg(isBengali 
        ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য (নাম, পিতার নাম, মোবাইল এবং জেলা) পূরণ করুন।' 
        : 'Please fill in all mandatory fields (Full Name, Father\'s Name, Mobile Number, and District).');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const generatedId = `BSS-MEM-${Math.floor(100000 + Math.random() * 900000)}`;
      setAppId(generatedId);
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      fatherName: '',
      dateOfBirth: '',
      occupation: '',
      address: '',
      mobileNumber: '',
      email: '',
      district: '',
      membershipType: 'Life Member',
      notes: ''
    });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
            <Users className="w-3.5 h-3.5" />
            <span>{isBengali ? 'সদস্যপদ ও অন্তর্ভুক্তি' : 'Membership Enrolment'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-heading font-bold text-white tracking-tight">
            {isBengali 
              ? 'বঙ্গীয় সাহা সমিতির আজীবন সদস্যপদ গ্রহণ করুন' 
              : 'Join Bangiya Saha Samity (Sunri Samaj)'}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isBengali
              ? 'পশ্চিমবঙ্গের তপশিলি জাতি শুঁড়ি সমাজের শিক্ষা বিস্তার, ঐতিহ্য সংরক্ষণ, ছাত্রাবাস পরিচালনা ও অধিকার রক্ষার ঐতিহাসিক সংগ্রামে যুক্ত হোন। আমাদের সংবিধানে কোনো মাসিক চাঁদা নেই।'
              : 'Become part of our historic community organization representing the Scheduled Caste Sunri community across all 23 districts of West Bengal. Single Life Membership enrolment with zero monthly subscriptions.'}
          </p>
        </div>
      </section>

      {/* 1. MEMBERSHIP CRITERIA & 2. MEMBERSHIP BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Membership Criteria */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="border-l-4 border-blue-900 pl-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {isBengali ? 'যোগ্যতা ও নিয়মাবলী' : 'Eligibility & Rules'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-blue-900">
                {isBengali ? 'সদস্যপদের আবশ্যিক মানদণ্ড' : 'Membership Criteria'}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950">{isBengali ? 'সম্প্রদায়গত পরিচয়' : 'Community Belonging'}</div>
                  <p className="text-xs text-slate-600 pt-0.5">
                    {isBengali 
                      ? 'পশ্চিমবঙ্গের স্থায়ী বাসিন্দা এবং তপশিলি জাতি শুঁড়ি (Sunri) সম্প্রদায়ের অন্তর্ভুক্ত হতে হবে।' 
                      : 'Must belong to the Scheduled Caste Sunri community and be a resident or origin of West Bengal.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950">{isBengali ? 'বয়স ও নাগরিকত্ব' : 'Age & Character'}</div>
                  <p className="text-xs text-slate-600 pt-0.5">
                    {isBengali 
                      ? 'ন্যূনতম ১৮ বছর বয়সী ভারতীয় নাগরিক এবং সৎ চরিত্রসম্পন্ন ব্যক্তি।' 
                      : 'Minimum 18 years of age, Indian citizen of sound mind and committed to social development.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950">{isBengali ? 'মাসিক চাঁদা নেই (No Monthly Subscription)' : 'No Monthly Subscription'}</div>
                  <p className="text-xs text-slate-600 pt-0.5">
                    {isBengali 
                      ? 'সমিতির বিধিমতে কোনো মাসিক চাঁদা গ্রহণ করা হয় না—কেবল এককালীন আজীবন সদস্যপদ প্রদান করা হয়।' 
                      : 'Under Samity charter, zero recurring monthly fees are charged. Members enroll via a single lifetime contribution.'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950">{isBengali ? 'সংবিধানের প্রতি আনুগত্য' : 'Commitment to Objectives'}</div>
                  <p className="text-xs text-slate-600 pt-0.5">
                    {isBengali 
                      ? '১৯৩৪ সালের মূল সংবিধানের ৫টি মৌলিক উদ্দেশ্য, কুপ্রথা বিলোপ ও নারী শিক্ষা প্রসারে শ্রদ্ধাশীল।' 
                      : 'Pledge to actively uphold the 5 founding objectives of social reform, education, and mutual fellowship.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Benefits (Requested: Community participation, Networking opportunities, Cultural engagement, Social welfare support) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="border-l-4 border-orange-500 pl-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {isBengali ? 'সুবিধাসমূহ' : 'Exclusive Advantages'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-blue-900">
                {isBengali ? 'সদস্যপদের সুযোগ-সুবিধা' : 'Membership Benefits'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Benefit 1: Community Participation */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-900 transition-all space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-bold text-blue-950">
                  {isBengali ? '১. সামাজিক অংশগ্রহণ (Community Participation)' : 'Community Participation'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBengali
                    ? 'বার্ষিক সাধারণ সভা, প্রাতিষ্ঠানিক সম্মেলন ও গণতান্ত্রিক ভোটপ্রক্রিয়ায় সক্রিয় অংশগ্রহণ ও মতামত প্রকাশের অধিকার।'
                    : 'Direct voting and deliberative participation in General Meetings and democratic organizational elections.'}
                </p>
              </div>

              {/* Benefit 2: Networking Opportunities */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-900 transition-all space-y-2">
                <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-bold text-blue-950">
                  {isBengali ? '২. সামাজিক নেটওয়ার্ক (Networking Opportunities)' : 'Networking Opportunities'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBengali
                    ? 'পশ্চিমবঙ্গের ২৩টি জেলার বিশিষ্ট ব্যক্তিত্ব, উদ্যোক্তা, অধ্যাপক ও বুদ্ধিজীবীদের সাথে নিবিড় ভ্রাতৃত্বপূর্ণ যোগাযোগ।'
                    : 'Unrivaled professional and social connections with Sunri community professionals, scholars, and entrepreneurs across West Bengal.'}
                </p>
              </div>

              {/* Benefit 3: Cultural Engagement */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-900 transition-all space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-bold text-blue-950">
                  {isBengali ? '৩. সাংস্কৃতিক সক্রিয়তা (Cultural Engagement)' : 'Cultural Engagement'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBengali
                    ? 'মা জগজ্জননী পূজা, ড. আম্বেদকর জয়ন্তী, বিবেকানন্দ হল প্রীতি সম্মেলন ও ঐতিহ্যবাহী প্রকাশনায় নিয়মিত যোগদান।'
                    : 'Privileged invitations to annual reunions, heritage seminars, research journal launches, and festive celebrations.'}
                </p>
              </div>

              {/* Benefit 4: Social Welfare Support */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-900 transition-all space-y-2">
                <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-base font-bold text-blue-950">
                  {isBengali ? '৪. সমাজকল্যাণ সহায়তা (Social Welfare Support)' : 'Social Welfare Support'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBengali
                    ? 'কলকাতায় ৫০ আসনের ছাত্রাবাসে পরিবারের সন্তানদের অগ্রাধিকার, শিক্ষাবৃত্তি অনুদান এবং বিনামূল্যে এসসি শংসাপত্র ও আইনি সহায়তা।'
                    : 'Priority hostel accommodation in Kolkata, student scholarships, and free SC caste certificate guidance cell access.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Divider */}
      <IndianPatternDivider variant="simple" />

      {/* 3. MEMBERSHIP FORM (Full Name, Father's Name, Date of Birth, Occupation, Address, Mobile Number, Email, District, Membership Type, Submit Button) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-blue-900 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              {isBengali ? 'অনলাইন আবেদন ফরম' : 'Official Application'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-blue-900">
              {isBengali ? 'বঙ্গীয় সাহা সমিতি সদস্যপদ আবেদন ফরম' : 'Bangiya Saha Samity Membership Application Form'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isBengali
                ? 'অনুগ্রহ করে নির্ভুল তথ্য প্রদান করুন। আবেদন প্রাপ্তির পর কেন্দ্রীয় কার্যালয় থেকে শংসাপত্র ইস্যু করা হবে।'
                : 'Please complete all required fields. Upon submission, the Secretariat at 52B Indian Mirror Street will process your verified membership.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif-heading font-bold text-emerald-950">
                {isBengali ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Successfully Received!'}
              </h3>
              <p className="text-slate-700 text-sm max-w-md mx-auto">
                {isBengali
                  ? `আপনার সদস্যপদ আবেদন নং ${appId} সিস্টেমে নথিভুক্ত হয়েছে। ৫২বি ইন্ডিয়ান মিরর স্ট্রিটের প্রধান কার্যালয় থেকে আপনার সাথে যোগাযোগ করা হবে।`
                  : `Your membership application reference ID is ${appId}. Our Secretariat will contact you for membership card issuance.`}
              </p>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 text-left max-w-md mx-auto text-xs space-y-1.5">
                <div className="flex justify-between"><span className="text-slate-500">Applicant:</span> <span className="font-bold text-blue-950">{formData.fullName}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Father's Name:</span> <span className="font-medium text-slate-700">{formData.fatherName}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">District:</span> <span className="font-medium text-slate-700">{formData.district}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Category:</span> <span className="font-bold text-orange-600">{formData.membershipType}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Mobile:</span> <span className="font-medium text-slate-700">{formData.mobileNumber}</span></div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-900 text-white hover:bg-blue-800 shadow-sm"
                >
                  {isBengali ? 'নতুন আবেদন করুন' : 'Submit Another Application'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBengali ? 'রসিদ প্রিন্ট করুন' : 'Print Slip'}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>{isBengali ? 'পূর্ণ নাম' : 'Full Name'}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Subir Kumar Saha"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 2. Father's Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>{isBengali ? 'পিতার নাম' : 'Father\'s Name'}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Late Narayan Chandra Saha"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 3. Date of Birth */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isBengali ? 'জন্ম তারিখ' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 4. Occupation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isBengali ? 'পেশা / জীবিকা' : 'Occupation'}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Service / Business / Teacher / Student"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 5. Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>{isBengali ? 'মোবাইল নম্বর' : 'Mobile Number'}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 98300 00000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 6. Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isBengali ? 'ইমেল ঠিকানা' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="subir.saha@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                  />
                </div>

                {/* 7. District (Dropdown of West Bengal districts) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <span>{isBengali ? 'জেলা (পশ্চিমবঙ্গ)' : 'District (West Bengal)'}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all bg-white"
                  >
                    <option value="">{isBengali ? '-- জেলা নির্বাচন করুন --' : '-- Select District --'}</option>
                    {WEST_BENGAL_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Membership Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isBengali ? 'সদস্যপদের ধরন' : 'Membership Type'}
                  </label>
                  <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all bg-white"
                  >
                    <option value="Life Member">Life Member (আজীবন সদস্য - No Monthly Fee)</option>
                    <option value="Patron Member">Patron Member (পৃষ্ঠপোষক সদস্য)</option>
                    <option value="Student Associate">Student Associate (ছাত্র সহযোগী)</option>
                  </select>
                </div>
              </div>

              {/* 9. Residential Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span>{isBengali ? 'স্থায়ী / বর্তমান ঠিকানা' : 'Address (Residential)'}</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Village / Road, Post Office, Police Station, PIN Code"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                />
              </div>

              {/* Notes or community details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {isBengali ? 'অতিরিক্ত বিবরণ (ঐচ্ছিক)' : 'Additional Notes / SC Certificate No. (Optional)'}
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. SC Digital Certificate number or ancestral village"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm outline-none transition-all"
                />
              </div>

              {/* Statutory Declaration */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" required id="declaration" className="mt-0.5 rounded text-blue-900 focus:ring-blue-900" />
                <label htmlFor="declaration">
                  {isBengali
                    ? 'আমি ঘোষণা করছি যে আমি তপশিলি জাতি শুঁড়ি সমাজের একজন সদস্য এবং বঙ্গীয় সাহা সমিতির নীতি ও আদর্শের প্রতি অনুগত থাকব।'
                    : 'I solemnly affirm that I belong to the Scheduled Caste Sunri community and pledge to uphold the Constitution, fellowship, and objectives of Bangiya Saha Samity.'}
                </label>
              </div>

              {/* 10. Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-base text-white bg-orange-600 hover:bg-orange-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-orange-400 active:scale-[0.99] disabled:opacity-75"
              >
                {submitting ? (
                  <span>{isBengali ? 'আবেদন পাঠানো হচ্ছে...' : 'Processing Submission...'}</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{isBengali ? 'সদস্যপদের আবেদন জমা দিন' : 'Submit Membership Application'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
