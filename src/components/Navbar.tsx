import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onJumpToChecklist: () => void;
}

const NAV_ITEMS = [
  { href: '#case', label: 'The Case' },
  { href: '#comparison', label: 'Comparison' },
  { href: '#campus', label: 'Campus' },
  { href: '#questions', label: 'Parent Q&A' },
  { href: '#next-steps', label: 'Next Steps' },
];

export function Navbar({ onJumpToChecklist }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F3]/95 backdrop-blur-sm border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A5F]"
        >
          The ICS Proposal
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A5F]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onJumpToChecklist}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E3A5F] hover:bg-[#162C49] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
          >
            Review Checklist
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-200 bg-white text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-stone-200 bg-[#F9F7F3] px-4 py-4 space-y-2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-md"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onJumpToChecklist();
            }}
            className="w-full mt-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1E3A5F] hover:bg-[#162C49] rounded-lg transition-colors whitespace-nowrap"
          >
            Review Checklist
          </button>
        </nav>
      )}
    </header>
  );
}
