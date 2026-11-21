import type { ProposalProfile } from '../utils/proposalLogic';

interface CoreCaseSectionProps {
  profile: ProposalProfile;
}

const PILLARS = [
  {
    index: '01',
    title: 'Real Cambridge Computer Science—Not Just Basic ICT',
    body: 'At New Mission Academy, ICT stops at basic computer literacy and theory for BECE. At ICS, Cambridge Lower Secondary, IGCSE, and A-Level Computer Science teach algorithms, programming logic, data representation, and system architecture—real foundations for software engineering.',
    span: 'lg:col-span-2',
  },
  {
    index: '02',
    title: 'Mathematics & Physics Lab Depth',
    body: 'Top tech degrees require strong applied Mathematics and Physics, not coding alone. Weekly experimental work in dedicated Physics labs builds the analytical discipline needed for Computer Science and Engineering.',
    span: 'lg:col-span-1',
  },
  {
    index: '03',
    title: 'Direct Global & Ghanaian Tech University Pathways',
    body: 'IGCSE and Cambridge A-Levels are directly respected by Ashesi, KNUST, and leading Computer Science departments across the UK, US, Canada, and Europe—keeping merit scholarships open without remedial years.',
    span: 'lg:col-span-1',
  },
  {
    index: '04',
    title: 'Technical Leadership, Teamwork & Communication',
    body: 'As a Round Square member school, ICS pushes students beyond solo screen time—pairing technical ability with collaborative projects, presentations, athletics, and community leadership alongside motivated peers.',
    span: 'lg:col-span-2',
  },
];

export function CoreCaseSection({ profile }: CoreCaseSectionProps) {
  return (
    <section id="case" className="scroll-mt-20 py-16 lg:py-24 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[#1E3A5F]">
            01. The Academic Case
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Four reasons this move unlocks my future in {profile.careerGoal}.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            {profile.currentSchool} helped build my early foundation through {profile.currentGrade}.
            Starting Year 7 at {profile.targetSchool} is the cleanest entry point into Cambridge
            Computing, STEM labs, and long-term university preparation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              className={`${pillar.span} bg-white border border-stone-200 rounded-xl p-7 sm:p-8 flex flex-col justify-between`}
            >
              <div>
                <p className="font-mono text-xs font-medium text-stone-400 tabular-nums">
                  Pillar {pillar.index}
                </p>
                <h3 className="mt-3 font-serif text-xl sm:text-2xl font-medium text-stone-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-600">
                  {pillar.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
