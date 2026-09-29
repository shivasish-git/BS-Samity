import React, { useState } from 'react';
import { MapPin, ArrowRight, Award, Calendar, BookOpen, ShieldCheck, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS, LOCALIZED_MILESTONES, LocalizedMilestone } from '../data/translations';
import { StoryModal } from './StoryModal';
import { IndianPatternDivider } from './IndianPatternDivider';

interface SuccessStoriesProps {
  onDonateClick: (category?: string) => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onDonateClick }) => {
  const { lang, isBengali } = useLanguage();
  const t = TRANSLATIONS[lang];
  const milestones = LOCALIZED_MILESTONES[lang];

  const [selectedMilestone, setSelectedMilestone] = useState<LocalizedMilestone | null>(null);

  const getMilestoneIcon = (year: string) => {
    if (year.includes('1936')) return <BookOpen className="w-5 h-5 text-[#2D6A4F]" />;
    if (year.includes('1950')) return <ShieldCheck className="w-5 h-5 text-[#8A5A36]" />;
    if (year.includes('1956')) return <Home className="w-5 h-5 text-[#2D6A4F]" />;
    return <Award className="w-5 h-5 text-[#8A5A36]" />;
  };

  return (
    <section id="about" className="py-16 bg-[#F4EFE6]/60 border-t border-b border-[#8A5A36]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mb-2">
            <span>{t.storiesBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#2D6A4F]">
            {t.storiesHeading}
          </h2>

          <p className="mt-3 text-base text-[#6C4A31]">
            {t.storiesSubtitle}
          </p>
        </div>

        {/* Milestones Grid (The 4 Historic Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#FAF7F2] border-2 border-[#8A5A36]/20 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group p-6 sm:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#2D6A4F]/10">
                      {getMilestoneIcon(m.year)}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#8A5A36]/15 text-[#8A5A36]">
                      {m.badge}
                    </span>
                  </div>

                  <span className="text-sm font-mono font-bold text-[#2D6A4F] px-2.5 py-0.5 bg-[#2D6A4F]/10 rounded">
                    {m.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif-heading font-bold text-[#2D6A4F] group-hover:text-[#1B4332] transition-colors">
                    {m.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#8A5A36] font-medium mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>{m.location}</span>
                  </div>
                </div>

                <p className="text-sm text-[#554336] leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#8A5A36]/15 flex items-center justify-between">
                <button
                  onClick={() => setSelectedMilestone(m)}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#2D6A4F] hover:text-[#1B4332] gap-1 transition-colors"
                >
                  <span>{t.readFullStoryBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDonateClick('Hostel & Scholarships')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8A5A36] bg-[#8A5A36]/10 hover:bg-[#8A5A36]/20 transition-colors"
                >
                  {isBengali ? 'সহায়তা করুন' : 'Support Cause'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery / Documentary Archive Banner */}
        <div id="gallery" className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
                {isBengali ? 'গ্যালারি ও সংরক্ষণাগার' : 'Historic Property & Hostel Gallery'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold">
                {isBengali
                  ? '৫২বি ইন্ডিয়ান মিরর স্ট্রিট: চারতলা প্রধান কার্যালয় ও গ্রামীণ ছাত্রাবাস'
                  : '52B Indian Mirror Street: 4-Storeyed Head Office & Rural Student Hostel'}
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
                {isBengali
                  ? '১৯৫৬ সালে জমি ক্রয়ের পর সমাজের দানশীল সদস্যদের অবদানে পুনর্নির্মিত চারতলা ভবন। ৩য় তলায় কলকাতা বিশ্ববিদ্যালয়ের বিভিন্ন কলেজে অধ্যয়নরত ১০-১৫ জন গ্রামীণ দরিদ্র ছাত্রের জন্য আবাসিক ছাত্রাবাস পরিচালিত হয়।'
                  : 'Purchased in 1956 through community contributions and reconstructed into a 4-storeyed headquarters. The 3rd floor houses a dedicated hostel for 10-15 rural students pursuing higher education in Kolkata.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onDonateClick('Hostel')}
                className="px-5 py-3 rounded-xl bg-white text-[#2D6A4F] font-bold text-sm shadow hover:bg-emerald-50 transition-all text-center"
              >
                {isBengali ? 'ছাত্রাবাসে অনুদান দিন' : 'Donate to Rural Hostel'}
              </button>
              <div className="text-center text-xs text-emerald-200/90">
                {isBengali ? 'ধারণক্ষমতা: ১০-১৫ জন ছাত্র (৩য় তল)' : 'Hostel Capacity: 10-15 Boys (3rd Floor)'}
              </div>
            </div>
          </div>
        </div>

        {/* Indian Pattern Divider */}
        <div className="mt-12">
          <IndianPatternDivider variant="lotus" />
        </div>

      </div>

      {/* Milestone Modal */}
      <StoryModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        onDonateToCause={onDonateClick}
      />
    </section>
  );
};
