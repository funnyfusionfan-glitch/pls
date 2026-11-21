import { useMemo, useState } from 'react';
import { Check, Copy, Printer, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  TRANSITION_PHASES,
  type AlignmentResult,
  type ChecklistItem,
  type ProposalProfile,
  type StudentCommitment,
  computeChecklistProgress,
  formatProposalSummary,
} from '../utils/proposalLogic';

interface ActionChecklistSectionProps {
  profile: ProposalProfile;
  onUpdateProfile: (next: ProposalProfile) => void;
  commitments: StudentCommitment[];
  onToggleCommitment: (id: string) => void;
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  dadNotes: string;
  onChangeDadNotes: (notes: string) => void;
  alignment: AlignmentResult;
  showPersonalize: boolean;
  onTogglePersonalize: () => void;
  onResetAll: () => void;
}

export function ActionChecklistSection({
  profile,
  onUpdateProfile,
  commitments,
  onToggleCommitment,
  checklist,
  onToggleChecklist,
  dadNotes,
  onChangeDadNotes,
  alignment,
  showPersonalize,
  onTogglePersonalize,
  onResetAll,
}: ActionChecklistSectionProps) {
  const [copied, setCopied] = useState(false);

  const progress = useMemo(() => computeChecklistProgress(checklist), [checklist]);

  const handleCopySummary = async () => {
    const text = formatProposalSummary(profile, alignment, commitments, checklist, dadNotes);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <section id="next-steps" className="scroll-mt-20 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Transition Timeline */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#1E3A5F]">
            05. Transition & Accountability
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            How we make the move smoothly—and my promise to you.
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSITION_PHASES.map((phase) => (
              <div
                key={phase.step}
                className="bg-white border border-stone-200 rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono font-medium">{phase.step}</span>
                  <span>{phase.timeframe}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">{phase.title}</h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  {phase.actions.map((action) => (
                    <li key={action} className="leading-relaxed">
                      — {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Personalize Proposal Panel */}
        <div
          id="personalize-panel"
          className="bg-[#EFECE6]/70 border border-stone-200 rounded-xl p-6 sm:p-8 no-print"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                Customize This Proposal Before Presenting
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Update your name, how you address your dad, your current grade, and your personal
                note. Changes save automatically on this device.
              </p>
            </div>
            <button
              type="button"
              onClick={onTogglePersonalize}
              aria-expanded={showPersonalize}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>{showPersonalize ? 'Close Proposal Editor' : 'Open Proposal Editor'}</span>
            </button>
          </div>

          {showPersonalize && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label
                  htmlFor="input-student-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="input-student-name"
                  type="text"
                  value={profile.studentName}
                  onChange={(e) =>
                    onUpdateProfile({ ...profile, studentName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-2 focus:outline-[#1E3A5F]"
                />
              </div>

              <div>
                <label
                  htmlFor="input-dad-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Dad&rsquo;s Name / Greeting
                </label>
                <input
                  id="input-dad-name"
                  type="text"
                  value={profile.dadName}
                  onChange={(e) => onUpdateProfile({ ...profile, dadName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-2 focus:outline-[#1E3A5F]"
                />
              </div>

              <div>
                <label
                  htmlFor="input-current-grade"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Current Class at {profile.currentSchool}
                </label>
                <input
                  id="input-current-grade"
                  type="text"
                  value={profile.currentGrade}
                  onChange={(e) =>
                    onUpdateProfile({ ...profile, currentGrade: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-2 focus:outline-[#1E3A5F]"
                />
              </div>

              <div>
                <label
                  htmlFor="input-career-goal"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Your Academic / Career Focus
                </label>
                <input
                  id="input-career-goal"
                  type="text"
                  value={profile.careerGoal}
                  onChange={(e) => onUpdateProfile({ ...profile, careerGoal: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-2 focus:outline-[#1E3A5F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="input-personal-note"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Opening Note to {profile.dadName}
                </label>
                <textarea
                  id="input-personal-note"
                  rows={3}
                  value={profile.personalNote}
                  onChange={(e) =>
                    onUpdateProfile({ ...profile, personalNote: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-2 focus:outline-[#1E3A5F]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Two-Column Commitments & Dad's Action Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Student Commitments */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                My Commitments to You
              </h3>
              <p className="mt-1.5 text-sm text-stone-600">
                If you support this switch, these are the standards I agree to be held to:
              </p>

              <div className="mt-6 space-y-4">
                {commitments.map((commitment) => {
                  const checkboxId = `commit-${commitment.id}`;
                  return (
                    <div
                      key={commitment.id}
                      className="flex items-start gap-3.5 pb-4 border-b border-stone-200/80 last:border-b-0 last:pb-0"
                    >
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={commitment.accepted}
                        onChange={() => onToggleCommitment(commitment.id)}
                        className="mt-1 w-4 h-4 accent-[#1E3A5F] rounded cursor-pointer shrink-0"
                      />
                      <label htmlFor={checkboxId} className="cursor-pointer">
                        <span className="block text-sm font-semibold text-stone-900">
                          {commitment.title}
                        </span>
                        <span className="block text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                          {commitment.description}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dad's Next-Step Checklist & Notes */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  {profile.dadName}&rsquo;s Next-Step Checklist
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Practical steps to verify ICS together before making any final commitment.
                </p>
              </div>
              <span
                data-testid="checklist-progress"
                className="font-mono text-xs font-medium text-[#1E3A5F] tabular-nums whitespace-nowrap shrink-0 mt-1"
              >
                {progress.completed} / {progress.total} done
              </span>
            </div>

            {/* Clean Progress Track */}
            <div
              role="progressbar"
              aria-valuenow={progress.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Checklist completion progress"
              className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-[#1E3A5F] transition-transform duration-200 origin-left"
                style={{ transform: `scaleX(${progress.percent / 100})` }}
              />
            </div>

            <div className="space-y-3.5">
              {checklist.map((item) => {
                const checkId = `check-${item.id}`;
                return (
                  <div key={item.id} className="flex items-start gap-3.5">
                    <input
                      id={checkId}
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => onToggleChecklist(item.id)}
                      className="mt-1 w-4 h-4 accent-[#1E3A5F] rounded cursor-pointer shrink-0"
                    />
                    <label htmlFor={checkId} className="cursor-pointer">
                      <span
                        className={`block text-sm font-medium ${
                          item.completed ? 'line-through text-stone-400' : 'text-stone-900'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-xs text-stone-500 mt-0.5">{item.detail}</span>
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-200">
              <label
                htmlFor="dad-notes"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2"
              >
                {profile.dadName}&rsquo;s Questions or Conditions
              </label>
              <textarea
                id="dad-notes"
                rows={3}
                value={dadNotes}
                onChange={(e) => onChangeDadNotes(e.target.value)}
                placeholder="Write any questions for ICS admissions, budget notes, or conditions to discuss together..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#F9F7F3] border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-2 focus:outline-[#1E3A5F]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1E3A5F] hover:bg-[#162C49] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Copied Summary</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>Print 1-Page Brief</span>
              </button>

              <button
                type="button"
                onClick={onResetAll}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
