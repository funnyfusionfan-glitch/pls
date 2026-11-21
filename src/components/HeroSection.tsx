import { ArrowDownRight, SlidersHorizontal } from 'lucide-react';
import type { ProposalProfile } from '../utils/proposalLogic';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  profile: ProposalProfile;
  onOpenPersonalize: () => void;
}

const INSTITUTIONAL_FACTS = [
  { label: 'Established', value: 'Jan 2000', sub: '25+ years in Kumasi' },
  { label: 'Pakyi Campus', value: '20 Acres', sub: 'Day & Boarding options' },
  { label: 'Curriculum', value: 'Cambridge', sub: 'IGCSE & A-Level pathway' },
  { label: 'Accreditation', value: 'Round Square', sub: 'Global leadership network' },
];

export function HeroSection({ profile, onOpenPersonalize }: HeroSectionProps) {
  return (
    <section id="top" className="pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Pitch Letter Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-500">
                Proposal for {profile.dadName}{' '}
                <span aria-hidden="true" className="mx-1.5">
                  ·
                </span>{' '}
                Kumasi, Ghana{' '}
                <span aria-hidden="true" className="mx-1.5">
                  ·
                </span>{' '}
                Cambridge Pathway
              </p>

              <h1
                className="mt-4 font-serif font-semibold tracking-tight text-stone-900 leading-[1.12]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                Why moving from {profile.currentSchool} to ICS is the right next step.
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-700 max-w-prose">
                Dear {profile.dadName}, {profile.personalNote}
              </p>

              <dl className="mt-6 pt-5 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div>
                  <dt className="text-stone-500">Prepared by</dt>
                  <dd className="font-semibold text-stone-900 mt-0.5">{profile.studentName}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Current Class</dt>
                  <dd className="font-medium text-stone-800 mt-0.5">{profile.currentGrade}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Target Focus</dt>
                  <dd className="font-medium text-stone-800 mt-0.5">{profile.careerGoal}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#comparison"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C49] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
              >
                <span>Explore the Comparison</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenPersonalize}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span>Customize Proposal</span>
              </button>
            </div>
          </div>

          {/* Campus Visual Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 min-h-[280px] sm:min-h-[340px] rounded-xl overflow-hidden border border-stone-200 bg-[#EFECE6]">
              <ResilientImage
                src="/src/assets/images/hero_ics_campus_1795251230292.jpg"
                alt="Sunlit green academic campus buildings and shaded walkways representing International Community School Pakyi Campus"
                className="w-full h-full object-cover"
                fallbackTitle="International Community School (ICS)"
                fallbackSubtitle="20-acre landscaped campus at Pakyi, Kumasi"
              />
            </div>
            <p className="mt-2.5 text-xs font-serif italic text-stone-500">
              Fig. 1 — Dedicated secondary campus environment supporting Cambridge Lower Secondary, IGCSE, and A-Level study.
            </p>
          </div>
        </div>

        {/* Full-Width 4-Column Factual Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INSTITUTIONAL_FACTS.map((fact) => (
            <div key={fact.label} className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                {fact.label}
              </p>
              <p className="font-serif text-2xl font-semibold text-stone-900 tabular-nums">
                {fact.value}
              </p>
              <p className="text-xs sm:text-sm text-stone-600">{fact.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
