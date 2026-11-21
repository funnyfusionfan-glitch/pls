import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DAD_FAQS, type ProposalProfile } from '../utils/proposalLogic';

interface ParentFaqSectionProps {
  profile: ProposalProfile;
}

export function ParentFaqSection({ profile }: ParentFaqSectionProps) {
  const [openId, setOpenId] = useState<string>(DAD_FAQS[0].id);

  return (
    <section
      id="questions"
      className="scroll-mt-20 py-16 lg:py-24 bg-[#EFECE6]/60 border-b border-stone-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#1E3A5F]">
            04. Honest Parent Q&A
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Questions you might have, {profile.dadName}.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Switching schools is a big financial and practical decision. Here are my honest answers
            to the toughest questions.
          </p>
        </div>

        <div className="mt-10 divide-y divide-stone-200 bg-white border border-stone-200 rounded-xl">
          {DAD_FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E3A5F]"
                >
                  <span className="font-serif text-lg font-medium text-stone-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 space-y-3">
                    <p className="text-sm sm:text-base leading-relaxed text-stone-700">
                      {item.answer}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-[#1E3A5F]">
                      Key takeaway: {item.keyTakeaway}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
