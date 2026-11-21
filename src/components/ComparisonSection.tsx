import { useMemo, useState } from 'react';
import {
  COMPARISON_CATEGORIES,
  COMPARISON_ROWS,
  PRIORITY_FACTORS,
  type ComparisonCategory,
  type PriorityWeights,
  type ProposalProfile,
  calculatePriorityAlignment,
  filterComparisonRows,
} from '../utils/proposalLogic';

interface ComparisonSectionProps {
  profile: ProposalProfile;
  weights: PriorityWeights;
  onWeightChange: (key: keyof PriorityWeights, value: number) => void;
}

export function ComparisonSection({
  profile,
  weights,
  onWeightChange,
}: ComparisonSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>('all');

  const visibleRows = useMemo(
    () => filterComparisonRows(COMPARISON_ROWS, activeCategory),
    [activeCategory]
  );

  const alignment = useMemo(() => calculatePriorityAlignment(weights), [weights]);

  return (
    <section
      id="comparison"
      className="scroll-mt-20 py-16 lg:py-24 bg-[#EFECE6]/60 border-b border-stone-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#1E3A5F]">
              02. Side-by-Side Comparison
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
              {profile.currentSchool} vs. International Community School
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              Filter by what matters most to our family to compare curriculum, facilities, and
              long-term outcomes transparently.
            </p>
          </div>

          {/* Interactive Segmented Filter Control */}
          <div
            role="group"
            aria-label="Filter comparison categories"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start lg:self-auto"
          >
            {COMPARISON_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F] ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Stacked Comparison Cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {visibleRows.map((row) => (
            <article
              key={row.id}
              className="bg-white border border-stone-200 rounded-xl p-5 space-y-3"
            >
              <div>
                <p className="text-xs text-stone-500">{row.categoryLabel}</p>
                <h3 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
                  {row.criterion}
                </h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {profile.currentSchool}
                  </p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">{row.newMission}</p>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A5F]">
                    International Community School (ICS)
                  </p>
                  <p className="text-stone-900 font-medium mt-0.5 leading-relaxed">{row.ics}</p>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Why It Matters
                  </p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">{row.whyItMatters}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block mt-8 bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th scope="col" className="py-4 px-5 w-1/5">
                    Criterion
                  </th>
                  <th scope="col" className="py-4 px-5 w-1/4">
                    {profile.currentSchool}
                  </th>
                  <th scope="col" className="py-4 px-5 w-1/3 text-[#1E3A5F]">
                    International Community School (ICS)
                  </th>
                  <th scope="col" className="py-4 px-5 w-1/4">
                    Why It Matters
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm">
                {visibleRows.map((row) => (
                  <tr key={row.id} className="align-top hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-semibold text-stone-900">{row.criterion}</p>
                      <p className="text-xs text-stone-500 mt-1">{row.categoryLabel}</p>
                    </td>
                    <td className="py-4 px-5 text-stone-600 leading-relaxed">{row.newMission}</td>
                    <td className="py-4 px-5 text-stone-900 font-medium leading-relaxed bg-[#1E3A5F]/[0.03]">
                      {row.ics}
                    </td>
                    <td className="py-4 px-5 text-stone-600 leading-relaxed">{row.whyItMatters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Dad's Priority Evaluator */}
        <div className="mt-10 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                {profile.dadName}&rsquo;s Priority Check
              </h3>
              <p className="mt-1.5 text-sm text-stone-600">
                Adjust each slider from 1 (less important) to 5 (top priority) to see how ICS fits
                what you care about most for my education.
              </p>
            </div>

            <div className="space-y-4">
              {PRIORITY_FACTORS.map((factor) => {
                const value = weights[factor.key];
                const inputId = `priority-${factor.key}`;
                return (
                  <div
                    key={factor.key}
                    className="pt-4 border-t border-stone-200/80 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <label htmlFor={inputId} className="text-sm font-semibold text-stone-900">
                        {factor.label}
                      </label>
                      <span className="font-mono text-xs font-medium text-[#1E3A5F] tabular-nums shrink-0">
                        {value} / 5
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 mb-2">{factor.description}</p>
                    <input
                      id={inputId}
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={value}
                      onChange={(e) => onWeightChange(factor.key, Number(e.target.value))}
                      className="w-full accent-[#1E3A5F] cursor-pointer h-2 bg-stone-200 rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F9F7F3] border border-stone-200 rounded-xl p-6 space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Weighted Alignment Result
            </p>
            <div className="flex items-baseline gap-3">
              <span
                data-testid="alignment-score"
                className="font-serif text-5xl font-semibold text-[#1E3A5F] tabular-nums"
              >
                {alignment.weightedScorePercent}%
              </span>
              <span className="text-sm text-stone-600">match with your priorities</span>
            </div>

            <p className="text-sm leading-relaxed text-stone-700">{alignment.tailoredSummary}</p>

            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Top Evidence Supporting Your Priorities
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {alignment.focusPoints.map((point) => (
                  <li key={point} className="leading-relaxed">
                    — {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
