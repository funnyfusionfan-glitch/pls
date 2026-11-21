export type ComparisonCategory =
  | 'all'
  | 'academics'
  | 'facilities'
  | 'pathways'
  | 'logistics';

export interface ProposalProfile {
  studentName: string;
  dadName: string;
  currentSchool: string;
  currentGrade: string;
  targetSchool: string;
  targetProgram: string;
  careerGoal: string;
  personalNote: string;
}

export interface ComparisonRow {
  id: string;
  category: Exclude<ComparisonCategory, 'all'>;
  categoryLabel: string;
  criterion: string;
  newMission: string;
  ics: string;
  whyItMatters: string;
}

export interface PriorityWeights {
  universityPathways: number;
  stemFacilities: number;
  holisticGrowth: number;
  transitionReadiness: number;
}

export interface PriorityFactorDetail {
  key: keyof PriorityWeights;
  label: string;
  description: string;
  icsEvidence: string;
  scoreOutOfFive: number;
}

export interface AlignmentResult {
  weightedScorePercent: number;
  topPriorityLabel: string;
  tailoredSummary: string;
  focusPoints: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  completed: boolean;
}

export interface StudentCommitment {
  id: string;
  title: string;
  description: string;
  accepted: boolean;
}

export interface DadFaqItem {
  id: string;
  question: string;
  answer: string;
  keyTakeaway: string;
}

export interface TransitionPhase {
  step: string;
  timeframe: string;
  title: string;
  actions: string[];
}

export const DEFAULT_PROFILE: ProposalProfile = {
  studentName: 'Your Son',
  dadName: 'Dad',
  currentSchool: 'New Mission Academy',
  currentGrade: 'Grade 6',
  targetSchool: 'International Community School (ICS)',
  targetProgram: 'Year 7 (Cambridge Lower Secondary)',
  careerGoal: 'Computer Science & Software Engineering',
  personalNote:
    'I am grateful for everything New Mission Academy has given me through Grade 6. As I prepare to enter secondary school, and as a boy who loves technology and wants to build a real future in Computer Science, moving to ICS for Year 7 is the cleanest, smartest time to start the Cambridge pathway and make you proud.',
};

export const COMPARISON_CATEGORIES: { id: ComparisonCategory; label: string }[] = [
  { id: 'all', label: 'All Priorities' },
  { id: 'academics', label: 'Academics & Exams' },
  { id: 'facilities', label: 'Campus & Labs' },
  { id: 'pathways', label: 'University Pathways' },
  { id: 'logistics', label: 'Character & Logistics' },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'curriculum',
    category: 'academics',
    categoryLabel: 'Academics & Exams',
    criterion: 'Computing & STEM Curriculum',
    newMission: 'Ghanaian National Curriculum (GES) with foundational ICT literacy toward BECE.',
    ics: 'Cambridge International Curriculum featuring formal Computer Science (programming, algorithms, logic), Mathematics, and Physics.',
    whyItMatters:
      'Goes far beyond basic office software—teaching real programming, binary logic, and problem-solving early.',
  },
  {
    id: 'exam-recognition',
    category: 'pathways',
    categoryLabel: 'University Pathways',
    criterion: 'Global Tech University Recognition',
    newMission: 'Local foundation for Ghanaian SHS placement via BECE.',
    ics: 'Cambridge IGCSE & A-Levels accepted directly by Ashesi, KNUST, UK, US, Canadian, and European CS departments.',
    whyItMatters:
      'Top Computer Science and Engineering programs look closely at Cambridge Math, Physics, and CS grades.',
  },
  {
    id: 'stem-labs',
    category: 'facilities',
    categoryLabel: 'Campus & Labs',
    criterion: 'ICT Suites & Physics Laboratories',
    newMission: 'Shared general classroom science and basic ICT introduction.',
    ics: 'Dedicated modern ICT suites, programming workstations, plus separate Physics, Chemistry, and Biology labs.',
    whyItMatters:
      'Building real technical fluency requires regular hands-on lab time and modern computing equipment.',
  },
  {
    id: 'campus-space',
    category: 'facilities',
    categoryLabel: 'Campus & Labs',
    criterion: 'Campus Environment & Research Library',
    newMission: 'Compact private school compound in Kwadaso Agric, Kumasi.',
    ics: '20-acre landscaped Pakyi campus with stocked research library, ICT access, collaborative study commons, and sports facilities.',
    whyItMatters:
      'Quiet, well-equipped study spaces support deep focus for coding projects, math problem sets, and healthy offline balance.',
  },
  {
    id: 'counseling',
    category: 'pathways',
    categoryLabel: 'University Pathways',
    criterion: 'Grade 7–13 Continuity',
    newMission: 'Transitions into JHS 1–3, then requires another school change for Senior High School.',
    ics: 'Start Year 7 at Pakyi and stay continuously through IGCSE (Year 11) and A-Levels (Year 13) with tech career guidance.',
    whyItMatters:
      'Moving right after Grade 6 gives me one uninterrupted 7-year secondary path instead of two separate transitions.',
  },
  {
    id: 'leadership',
    category: 'logistics',
    categoryLabel: 'Character & Logistics',
    criterion: 'Peer Network & Teamwork Skills',
    newMission: 'Community-rooted local peer environment with moral instruction.',
    ics: 'Diverse international peer body and Round Square membership emphasizing teamwork, public speaking, and leadership.',
    whyItMatters:
      'Great engineers do not just code alone—they communicate clearly, lead teams, and solve real-world problems.',
  },
  {
    id: 'boarding-commute',
    category: 'logistics',
    categoryLabel: 'Character & Logistics',
    criterion: 'Daily Routine & Boarding Options',
    newMission: 'Daily commute only from home to Kwadaso Agric.',
    ics: 'Flexible Day student or structured, supervised Boarding options at Pakyi Campus.',
    whyItMatters:
      'Consistent evening prep hours protect focus for demanding math and computer science coursework.',
  },
  {
    id: 'class-rigor',
    category: 'academics',
    categoryLabel: 'Academics & Exams',
    criterion: 'Problem-Solving & Assessment Style',
    newMission: 'Exam-focused memorization aligned to standard BECE preparation.',
    ics: 'Applied algorithmic thinking, technical projects, lab practicals, and externally moderated Cambridge exams.',
    whyItMatters:
      'Trains analytical debugging and independent technical reasoning instead of rote memorization.',
  },
];

export const DEFAULT_WEIGHTS: PriorityWeights = {
  universityPathways: 5,
  stemFacilities: 4,
  holisticGrowth: 4,
  transitionReadiness: 4,
};

export const PRIORITY_FACTORS: PriorityFactorDetail[] = [
  {
    key: 'universityPathways',
    label: 'Top Computer Science & Tech University Pathways',
    description: 'Externally accredited Cambridge Math, Physics & CS grades respected by global tech universities.',
    icsEvidence: 'Cambridge IGCSE & A-Level pathway recognized by Ashesi, KNUST, UK, US, and European CS programs.',
    scoreOutOfFive: 5,
  },
  {
    key: 'stemFacilities',
    label: 'Dedicated ICT Suites, Computing & Physics Labs',
    description: 'Real computing equipment, structured coding coursework, and hands-on science laboratories.',
    icsEvidence: 'Modern ICT suites, dedicated Physics/Chemistry/Biology labs, and research library at Pakyi Campus.',
    scoreOutOfFive: 5,
  },
  {
    key: 'holisticGrowth',
    label: 'Communication, Teamwork & Offline Balance',
    description: 'Building leadership, sports, and presentation skills so tech talent pairs with strong character.',
    icsEvidence: 'Round Square leadership network, robotics/tech clubs, and structured athletics on a 20-acre campus.',
    scoreOutOfFive: 4.5,
  },
  {
    key: 'transitionReadiness',
    label: 'Smooth Academic & Routine Transition',
    description: 'Structured onboarding into Cambridge problem-solving and balanced screen/study habits.',
    icsEvidence: 'Continuous secondary pathway with Day or supervised Boarding options and diagnostic placement.',
    scoreOutOfFive: 4.2,
  },
];

export const DAD_FAQS: DadFaqItem[] = [
  {
    id: 'faq-self-taught',
    question: 'Since you are good with tech, cannot you just learn coding online while staying at New Mission?',
    answer:
      'Learning syntax online is useful and I already practice on my own, but top Computer Science universities and engineering scholarships do not admit students on YouTube tutorials alone. They require rigorous Cambridge Mathematics, Physics, and externally examined Computer Science (algorithms, data representation, system architecture, and structured problem-solving), alongside formal lab practicals and verified grades that ICS provides.',
    keyTakeaway: 'Self-study builds interest; accredited Cambridge CS, Math, and Physics build an undeniable university record.',
  },
  {
    id: 'faq-cost',
    question: 'Why pay higher fees at ICS when New Mission Academy already covers core subjects?',
    answer:
      'New Mission Academy gave me a solid start, and I do not take that for granted. At the secondary level, ICS fees fund specialized ICT suites, separate Physics, Chemistry, and Biology laboratories, externally moderated Cambridge exams, and continuous progression through A-Levels. Stronger STEM credentials in secondary school directly open merit scholarship opportunities for Computer Science and Engineering degrees.',
    keyTakeaway: 'Investing in accredited STEM & computing prep now builds scholarship readiness and avoids remedial years.',
  },
  {
    id: 'faq-curriculum',
    question: 'Will jumping from Grade 6 at New Mission to Cambridge Year 7 be too hard?',
    answer:
      'Year 7 is actually the easiest time in the entire system to switch. Every student entering Year 7 is moving up from Primary into Cambridge Lower Secondary at the same time—starting fresh with dedicated Science labs, Secondary Math, and Computing. Switching now means I have three full years (Years 7–9) to build strong habits before IGCSE exams even begin in Year 10.',
    keyTakeaway: 'Year 7 is a fresh starting line for all students—giving three full years before IGCSE.',
  },
  {
    id: 'faq-commute',
    question: 'How do I know extra screen/computer time will go toward real learning, not distractions?',
    answer:
      'At ICS, computing is structured around clear syllabus milestones, teacher-monitored ICT labs, and balanced daily schedules with sports and Round Square activities. At home, I am putting in writing that all weekday screen time follows completed homework and regular bi-weekly grade reviews with you.',
    keyTakeaway: 'Structured lab work and written home screen-time rules keep focus on measurable academic output.',
  },
  {
    id: 'faq-timing',
    question: 'Why switch right after Grade 6 instead of finishing JHS / BECE first?',
    answer:
      'Finishing JHS 1–3 at New Mission means spending the next three years studying strictly for BECE—including basic ICT theory—and then switching schools anyway after JHS. Entering ICS in Year 7 lets me start Cambridge Mathematics, Sciences, and Computer Science on day one without wasting three years on a curriculum I plan to leave.',
    keyTakeaway: 'Grade 6 to Year 7 avoids repeating transitions and starts Cambridge Computing on day one.',
  },
];

export const TRANSITION_PHASES: TransitionPhase[] = [
  {
    step: 'Phase 01',
    timeframe: 'This Week',
    title: 'Information & Lab Tour',
    actions: [
      'Review my Grade 6 report cards from New Mission Academy together.',
      'Contact ICS Kumasi Admissions to confirm Year 7 entry dates, fee schedule, and placement assessment details.',
      'Visit the Pakyi campus to inspect the Year 7 classrooms, ICT suites, and science labs firsthand.',
    ],
  },
  {
    step: 'Phase 02',
    timeframe: 'Weeks 2–4',
    title: 'Year 7 Placement & Bridge Prep',
    actions: [
      'Complete the ICS Year 7 entrance/placement assessment in Mathematics and English.',
      'Follow a 4-week Grade 6-to-Year 7 bridge plan: Cambridge Math foundations, beginner Python/logic, and structured writing.',
      'Finalize Day transport or Boarding logistics and budget plan together.',
    ],
  },
  {
    step: 'Phase 03',
    timeframe: 'First Term in Year 7',
    title: 'Accountability & Check-Ins',
    actions: [
      'Bi-weekly parent-son review of Math, Science, and Computing quiz scores and teacher feedback.',
      'Join a school coding, robotics, or sports team by week 4 to build healthy friendships.',
      'End-of-term evaluation against the written grade goals agreed upon before enrollment.',
    ],
  },
];

export const DEFAULT_COMMITMENTS: StudentCommitment[] = [
  {
    id: 'commit-grades',
    title: 'Maintain Strong Math, Science & Computing Grades',
    description: 'Share every quiz, assignment, and teacher comment with you every two weeks—no surprises at report time.',
    accepted: true,
  },
  {
    id: 'commit-bridge',
    title: 'Complete Pre-Term Cambridge Math & Logic Bridge Study',
    description: 'Spend 45 minutes daily before term starts sharpening Cambridge Mathematics, problem-solving, and structured writing.',
    accepted: true,
  },
  {
    id: 'commit-screens',
    title: 'Disciplined Screen Time & Real Productive Output',
    description: 'Keep weeknight screen time strictly for schoolwork and structured learning—never gaming or distractions before tasks are done.',
    accepted: true,
  },
  {
    id: 'commit-gratitude',
    title: 'Value Every Cedi Invested',
    description: 'Treat tuition, ICT access, textbooks, and lab resources as a serious family investment repaid through consistent excellence.',
    accepted: true,
  },
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'check-talk',
    label: 'Read through this proposal and discuss questions together',
    detail: '15-minute quiet conversation over the weekend.',
    completed: true,
  },
  {
    id: 'check-admissions',
    label: 'Call or email ICS Kumasi Admissions for current fee & intake dates',
    detail: 'Confirm exact tuition, transport/boarding fees, and assessment dates.',
    completed: false,
  },
  {
    id: 'check-tour',
    label: 'Book a tour of the Pakyi Campus',
    detail: 'See the science labs, library, and speak directly with the academic coordinator.',
    completed: false,
  },
  {
    id: 'check-assessment',
    label: 'Sit the ICS placement assessment',
    detail: 'Determine exact year group readiness and any bridge topics needed.',
    completed: false,
  },
];

export function filterComparisonRows(
  rows: ComparisonRow[],
  category: ComparisonCategory
): ComparisonRow[] {
  if (category === 'all') {
    return rows;
  }
  return rows.filter((row) => row.category === category);
}

export function calculatePriorityAlignment(
  weights: PriorityWeights,
  factors: PriorityFactorDetail[] = PRIORITY_FACTORS
): AlignmentResult {
  const entries = factors.map((factor) => {
    const rawWeight = weights[factor.key];
    const clampedWeight = Math.max(1, Math.min(5, Number.isFinite(rawWeight) ? rawWeight : 3));
    return {
      factor,
      weight: clampedWeight,
    };
  });

  const totalWeight = entries.reduce((sum, item) => sum + item.weight, 0);
  const weightedPoints = entries.reduce(
    (sum, item) => sum + item.weight * (item.factor.scoreOutOfFive / 5),
    0
  );

  const weightedScorePercent =
    totalWeight > 0 ? Math.round((weightedPoints / totalWeight) * 100) : 0;

  const sortedByWeight = [...entries].sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return b.factor.scoreOutOfFive - a.factor.scoreOutOfFive;
  });

  const top = sortedByWeight[0];
  const second = sortedByWeight[1];

  const focusPoints = sortedByWeight
    .slice(0, 3)
    .map((entry) => `${entry.factor.label}: ${entry.factor.icsEvidence}`);

  const tailoredSummary = `Based on your highest priority (${top.factor.label}) paired with ${second.factor.label}, ICS aligns at ${weightedScorePercent}% because its Cambridge pathway and Pakyi campus directly deliver those outcomes.`;

  return {
    weightedScorePercent,
    topPriorityLabel: top.factor.label,
    tailoredSummary,
    focusPoints,
  };
}

export function computeChecklistProgress(items: ChecklistItem[]): {
  completed: number;
  total: number;
  percent: number;
} {
  const total = items.length;
  if (total === 0) {
    return { completed: 0, total: 0, percent: 0 };
  }
  const completed = items.filter((item) => item.completed).length;
  const percent = Math.round((completed / total) * 100);
  return { completed, total, percent };
}

export function formatProposalSummary(
  profile: ProposalProfile,
  alignment: AlignmentResult,
  commitments: StudentCommitment[],
  checklist: ChecklistItem[],
  dadNotes: string
): string {
  const progress = computeChecklistProgress(checklist);
  const activeCommitments = commitments
    .filter((c) => c.accepted)
    .map((c) => `- ${c.title}: ${c.description}`)
    .join('\n');

  const checklistLines = checklist
    .map((item) => `[${item.completed ? 'x' : ' '}] ${item.label}`)
    .join('\n');

  return [
    `SCHOOL TRANSITION PROPOSAL: ${profile.currentSchool} -> ${profile.targetSchool}`,
    `Prepared by: ${profile.studentName} (${profile.currentGrade})`,
    `For: ${profile.dadName}`,
    `Target Track: ${profile.targetProgram}`,
    `Long-Term Goal: ${profile.careerGoal}`,
    '',
    `PERSONAL NOTE:`,
    profile.personalNote,
    '',
    `PRIORITY ALIGNMENT (${alignment.weightedScorePercent}%):`,
    alignment.tailoredSummary,
    '',
    `STUDENT COMMITMENTS:`,
    activeCommitments || '- Pending selection',
    '',
    `NEXT STEPS CHECKLIST (${progress.completed}/${progress.total} completed):`,
    checklistLines,
    ...(dadNotes.trim() ? ['', `DAD'S QUESTIONS & NOTES:`, dadNotes.trim()] : []),
  ].join('\n');
}
