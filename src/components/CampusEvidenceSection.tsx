import { ResilientImage } from './ResilientImage';

export function CampusEvidenceSection() {
  return (
    <section id="campus" className="scroll-mt-20 py-16 lg:py-24 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[#1E3A5F]">
            03. Learning Environment
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Labs and study spaces built for builders and problem-solvers.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            At ICS&rsquo;s 20-acre Pakyi campus in Kumasi, students work in modern ICT suites,
            dedicated Physics, Chemistry, and Biology laboratories, and a stocked research library.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <figure className="space-y-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-[#EFECE6]">
              <ResilientImage
                src="/src/assets/images/science_lab_stem_1795251229394.jpg"
                alt="Modern secondary school science laboratory with microscopes and lab benches"
                className="w-full h-full object-cover"
                fallbackTitle="Dedicated STEM Laboratories"
                fallbackSubtitle="Physics, Chemistry, Biology, and ICT practicals"
              />
            </div>
            <figcaption className="space-y-1">
              <p className="text-sm font-semibold text-stone-900">
                Dedicated Physics, Chemistry, Biology & ICT Facilities
              </p>
              <p className="text-xs font-serif italic text-stone-500">
                Fig. 2 — Hands-on experimentation and computing workstations prepare students for
                Cambridge IGCSE STEM and Computer Science tracks.
              </p>
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-[#EFECE6]">
              <ResilientImage
                src="/src/assets/images/campus_library_study_1795251230513.jpg"
                alt="Quiet sunlit school library and research study hall with oak tables and bookshelves"
                className="w-full h-full object-cover"
                fallbackTitle="Research Library & Study Commons"
                fallbackSubtitle="Independent reading and guided coursework"
              />
            </div>
            <figcaption className="space-y-1">
              <p className="text-sm font-semibold text-stone-900">
                Research Library, Deep-Focus Commons & Study Culture
              </p>
              <p className="text-xs font-serif italic text-stone-500">
                Fig. 3 — Quiet research spaces support algorithm problem sets, technical coursework,
                and supervised prep hours.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
