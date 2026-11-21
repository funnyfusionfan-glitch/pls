import type { ProposalProfile } from '../utils/proposalLogic';

interface FooterProps {
  profile: ProposalProfile;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 py-10 bg-[#F9F7F3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-stone-500">
        <div>
          <span className="font-serif font-semibold text-stone-900">The ICS Proposal</span>{' '}
          <span aria-hidden="true" className="mx-1.5">
            ·
          </span>{' '}
          <span>
            Prepared by {profile.studentName} for {profile.dadName}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#case" className="hover:text-stone-900 transition-colors">
            The Case
          </a>
          <a href="#comparison" className="hover:text-stone-900 transition-colors">
            Comparison
          </a>
          <a href="#questions" className="hover:text-stone-900 transition-colors">
            Parent Q&A
          </a>
          <a href="#next-steps" className="hover:text-stone-900 transition-colors">
            Checklist
          </a>
        </div>
      </div>
    </footer>
  );
}
