import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  CheckCircle2, 
  FileCheck, 
  Copy, 
  Check, 
  Building2, 
  Sparkles,
  Download
} from 'lucide-react';
import { BANK_DETAILS, NGO_DETAILS } from '../data/ngoData';
import { useLanguage } from '../context/LanguageContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCause?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({ 
  isOpen, 
  onClose, 
  initialCause 
}) => {
  const { lang, isBengali } = useLanguage();

  const [cause, setCause] = useState(initialCause || 'Student Hostel, Guest Room & Social Help for Educational Purpose (Only for Our Community)');
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [paymentType, setPaymentType] = useState<'UPI' | 'BankTransfer' | 'Card'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successRecord, setSuccessRecord] = useState<{ receiptNo: string; date: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const presetAmounts = [500, 1000, 2500, 5000, 18000];
  const activeAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const getLocalizedCause = (c: string) => {
    if (!isBengali) return c;
    const causeMap: Record<string, string> = {
      'Student Hostel, Guest Room & Social Help for Educational Purpose (Only for Our Community)': 'ছাত্রাবাস, অতিথি কক্ষ ও শিক্ষার উদ্দেশ্যে সামাজিক সহায়তা (শুধুমাত্র আমাদের সম্প্রদায়ের জন্য)',
      'Sponsor a Rural Student Bed (₹18,000/yr)': '১ জন ছাত্রের বার্ষিক আবাসন ব্যবস্থা (₹১৮,০০০)',
      'Social Help for Educational Purpose (Only for Our Community) — Female Higher Education': 'শিক্ষার উদ্দেশ্যে সামাজিক সহায়তা (শুধুমাত্র আমাদের সম্প্রদায়ের জন্য) — নারী উচ্চশিক্ষা',
      'Community Library & Publications': 'পাঠাগার ও প্রকাশনা',
      'General Social Welfare & Health Relief': 'সাধারণ সমাজকল্যাণ ও স্বাস্থ্য ত্রাণ',
      'Legal Aid & SC Rights Protection': 'আইনি সহায়তা ও তপশিলি অধিকার সংরক্ষণ'
    };
    return causeMap[c] || c;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || activeAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessRecord({
        receiptNo: `BSS-DON-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(isBengali ? 'bn-IN' : 'en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
    }, 800);
  };

  const handleReset = () => {
    setSuccessRecord(null);
    setDonorName('');
    setPhone('');
    setEmail('');
    setPan('');
    setCustomAmount('');
    setSelectedAmount(1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-blue-900 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-6 py-4 flex items-center justify-between border-b-2 border-orange-500">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-orange-400" />
            <div>
              <h3 className="text-base sm:text-lg font-serif-heading font-bold">
                {isBengali ? 'বঙ্গীয় সাহা সমিতি অনুদান ডেস্ক' : 'Online Donation & Support'}
              </h3>
              <p className="text-[11px] text-blue-200">
                {isBengali ? '৫০ আসনের গ্রামীণ ছাত্রাবাস, অতিথি কক্ষ ও শিক্ষার উদ্দেশ্যে সামাজিক সহায়তা (শুধুমাত্র আমাদের সম্প্রদায়ের জন্য)' : 'Student Hostel, Guest Room & Social Help for Educational Purpose (Only for Our Community)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label={isBengali ? 'মডাল বন্ধ করুন' : 'Close modal'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto text-xs sm:text-sm">
          {successRecord ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-serif-heading font-bold text-blue-950">
                  {isBengali ? 'অনুদান সফলভাবে নথিভুক্ত হয়েছে!' : 'Donation Successfully Acknowledged!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {isBengali ? 'আপনার বদান্যতা গ্রামীণ ছাত্রছাত্রীদের শিক্ষা অর্জনে সহায়ক হবে।' : 'Thank you for your gracious support to the Sunri student community.'}
                </p>
              </div>

              {/* Receipt slip */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isBengali ? 'রসিদ রেফারেন্স নং:' : 'Receipt Ref:'}</span>
                  <span className="font-mono font-bold text-orange-600">
                    {isBengali ? successRecord.receiptNo.replace('BSS-DON-', 'বিএসএস-রসিদ-') : successRecord.receiptNo}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isBengali ? 'দাতার নাম:' : 'Donor Name:'}</span>
                  <span className="font-bold text-blue-950">{donorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isBengali ? 'অনুদানের পরিমাণ:' : 'Amount Contributed:'}</span>
                  <span className="font-bold text-emerald-700 text-sm">₹{isBengali ? activeAmount.toLocaleString('bn-IN') : activeAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isBengali ? 'অনুদানের খাত:' : 'Cause:'}</span>
                  <span className="font-medium text-slate-700">{getLocalizedCause(cause)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isBengali ? 'সংগঠন:' : 'Organization:'}</span>
                  <span className="font-bold text-blue-900">{isBengali ? 'বঙ্গীয় সাহা সমিতি (রেজি. ৪৫২২)' : 'Bangiya Saha Samity (Regd. 4522)'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">{isBengali ? 'তারিখ:' : 'Date:'}</span>
                  <span className="text-slate-700">{successRecord.date}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl font-bold text-xs hover:bg-blue-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBengali ? 'রসিদ প্রিন্ট করুন' : 'Print Donation Receipt'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs hover:bg-slate-200"
                >
                  {isBengali ? 'আরেকটি অনুদান' : 'New Contribution'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Cause */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {isBengali ? 'অনুদানের খাত নির্বাচন করুন' : 'Select Cause'}
                </label>
                <select
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-900 text-xs sm:text-sm bg-white outline-none"
                >
                  <option value="Student Hostel, Guest Room & Social Help for Educational Purpose (Only for Our Community)">{isBengali ? 'ছাত্রাবাস, অতিথি কক্ষ ও শিক্ষার উদ্দেশ্যে সামাজিক সহায়তা (শুধুমাত্র আমাদের সম্প্রদায়ের জন্য)' : 'Hostel, Guest Room & Social Help for Educational Purpose (Only for Our Community)'}</option>
                  <option value="Sponsor a Rural Student Bed (₹18,000/yr)">{isBengali ? '১ জন ছাত্রের বার্ষিক আবাসন ব্যবস্থা (₹১৮,০০০)' : 'Sponsor a Rural Student Bed (১ জন ছাত্রের বার্ষিক আবাসন - ₹১৮,০০০)'}</option>
                  <option value="Social Help for Educational Purpose (Only for Our Community) — Female Higher Education">{isBengali ? 'শিক্ষার উদ্দেশ্যে সামাজিক সহায়তা (শুধুমাত্র আমাদের সম্প্রদায়ের জন্য) — নারী উচ্চশিক্ষা' : 'Social Help for Educational Purpose (Only for Our Community) — Female Higher Education'}</option>
                  <option value="Community Library & Publications">{isBengali ? 'পাঠাগার ও প্রকাশনা' : 'Community Library & Publications (পাঠাগার ও প্রকাশনা)'}</option>
                  <option value="General Social Welfare & Health Relief">{isBengali ? 'সাধারণ সমাজকল্যাণ ও স্বাস্থ্য ত্রাণ' : 'General Social Welfare & Health Relief (সাধারণ সমাজকল্যাণ ও ত্রাণ)'}</option>
                </select>
              </div>

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {isBengali ? 'অনুদানের পরিমাণ' : 'Contribution Amount (INR)'}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ₹{isBengali 
                        ? (amt >= 1000 ? `${(amt / 1000).toLocaleString('bn-IN')} হাজার` : amt.toLocaleString('bn-IN')) 
                        : (amt >= 1000 ? `${amt / 1000}k` : amt)}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder={isBengali ? 'অন্যান্য পরিমাণ লিখুন (যেমন ৫০০০)' : 'Or enter custom amount in ₹'}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-900 outline-none"
                />
              </div>

              {/* Donor Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isBengali ? 'দাতার পূর্ণ নাম *' : 'Donor Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={isBengali ? 'যেমন: সুবীর সাহা' : 'Subir Saha'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isBengali ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isBengali ? '+৯১ ৯৮৩০০ ০০০০০' : '+91 98300 00000'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isBengali ? 'ইমেল (রসিদ প্রেরণের জন্য)' : 'Email (for Donation Receipt)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isBengali ? 'ইমেল ঠিকানা (যেমনঃ donor@example.com)' : 'donor@example.com'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isBengali ? 'প্যান নম্বর / পরিচয়পত্র (ঐচ্ছিক)' : 'PAN / ID Number (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder={isBengali ? 'প্যান নম্বর (যেমনঃ ABCDE1234F)' : 'ABCDE1234F'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-900 uppercase"
                  />
                </div>
              </div>

              {/* Bank Account Direct Credentials Quick Reference */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 space-y-1 text-xs text-slate-600">
                <div className="font-bold text-blue-950 flex items-center justify-between">
                  <span>{isBengali ? 'স্টেট ব্যাংক অব ইন্ডিয়া (বৌবাজার/তালতলা শাখা)' : 'State Bank of India (Bowbazar/Esplanade Branch)'}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'acc')}
                    className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    {copiedField === 'acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{isBengali ? 'অ্যাকাউন্ট কপি' : 'Copy A/C'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-600">
                  {isBengali ? 'হিসাব নং:' : 'A/C:'} <span className="font-bold text-blue-900">{isBengali ? '৩৮১৯২০১৯৩৬০' : BANK_DETAILS.accountNumber}</span> | {isBengali ? 'আইএফএসসি (IFSC):' : 'IFSC:'} <span className="font-bold text-orange-600">{BANK_DETAILS.ifscCode}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-orange-600 hover:bg-orange-500 shadow-md flex items-center justify-center gap-2 border border-orange-400 active:scale-[0.99] disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>{isBengali ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'Processing Contribution...'}</span>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>{isBengali ? `₹${activeAmount.toLocaleString()} অনুদান সম্পন্ন করুন` : `Complete Contribution of ₹${activeAmount.toLocaleString()}`}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
