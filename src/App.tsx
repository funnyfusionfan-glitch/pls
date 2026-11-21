import { useEffect, useMemo, useState } from 'react';
import { ActionChecklistSection } from './components/ActionChecklistSection';
import { CampusEvidenceSection } from './components/CampusEvidenceSection';
import { ComparisonSection } from './components/ComparisonSection';
import { CoreCaseSection } from './components/CoreCaseSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ParentFaqSection } from './components/ParentFaqSection';
import {
  DEFAULT_CHECKLIST,
  DEFAULT_COMMITMENTS,
  DEFAULT_PROFILE,
  DEFAULT_WEIGHTS,
  type ChecklistItem,
  type PriorityWeights,
  type ProposalProfile,
  type StudentCommitment,
  calculatePriorityAlignment,
} from './utils/proposalLogic';

const STORAGE_KEY = 'ics_proposal_state_v3';

interface SavedState {
  profile: ProposalProfile;
  weights: PriorityWeights;
  commitments: StudentCommitment[];
  checklist: ChecklistItem[];
  dadNotes: string;
}

function loadSavedState(): SavedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        profile: DEFAULT_PROFILE,
        weights: DEFAULT_WEIGHTS,
        commitments: DEFAULT_COMMITMENTS,
        checklist: DEFAULT_CHECKLIST,
        dadNotes: '',
      };
    }
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile ?? {}) },
      weights: { ...DEFAULT_WEIGHTS, ...(parsed.weights ?? {}) },
      commitments: Array.isArray(parsed.commitments) && parsed.commitments.length > 0
        ? parsed.commitments
        : DEFAULT_COMMITMENTS,
      checklist: Array.isArray(parsed.checklist) && parsed.checklist.length > 0
        ? parsed.checklist
        : DEFAULT_CHECKLIST,
      dadNotes: typeof parsed.dadNotes === 'string' ? parsed.dadNotes : '',
    };
  } catch {
    return {
      profile: DEFAULT_PROFILE,
      weights: DEFAULT_WEIGHTS,
      commitments: DEFAULT_COMMITMENTS,
      checklist: DEFAULT_CHECKLIST,
      dadNotes: '',
    };
  }
}

export default function App() {
  const initial = useMemo(() => loadSavedState(), []);
  const [profile, setProfile] = useState<ProposalProfile>(initial.profile);
  const [weights, setWeights] = useState<PriorityWeights>(initial.weights);
  const [commitments, setCommitments] = useState<StudentCommitment[]>(initial.commitments);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initial.checklist);
  const [dadNotes, setDadNotes] = useState<string>(initial.dadNotes);
  const [showPersonalize, setShowPersonalize] = useState<boolean>(false);

  useEffect(() => {
    try {
      const payload: SavedState = {
        profile,
        weights,
        commitments,
        checklist,
        dadNotes,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [profile, weights, commitments, checklist, dadNotes]);

  const alignment = useMemo(() => calculatePriorityAlignment(weights), [weights]);

  const handleWeightChange = (key: keyof PriorityWeights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleCommitment = (id: string) => {
    setCommitments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, accepted: !item.accepted } : item))
    );
  };

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleJumpToChecklist = () => {
    const el = document.getElementById('next-steps');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPersonalize = () => {
    setShowPersonalize(true);
    setTimeout(() => {
      const el = document.getElementById('personalize-panel');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleResetAll = () => {
    setProfile(DEFAULT_PROFILE);
    setWeights(DEFAULT_WEIGHTS);
    setCommitments(DEFAULT_COMMITMENTS);
    setChecklist(DEFAULT_CHECKLIST);
    setDadNotes('');
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F3] text-[#1C1917]">
      <Navbar onJumpToChecklist={handleJumpToChecklist} />

      <main className="flex-1">
        <HeroSection profile={profile} onOpenPersonalize={handleOpenPersonalize} />
        <CoreCaseSection profile={profile} />
        <ComparisonSection
          profile={profile}
          weights={weights}
          onWeightChange={handleWeightChange}
        />
        <CampusEvidenceSection />
        <ParentFaqSection profile={profile} />
        <ActionChecklistSection
          profile={profile}
          onUpdateProfile={setProfile}
          commitments={commitments}
          onToggleCommitment={handleToggleCommitment}
          checklist={checklist}
          onToggleChecklist={handleToggleChecklist}
          dadNotes={dadNotes}
          onChangeDadNotes={setDadNotes}
          alignment={alignment}
          showPersonalize={showPersonalize}
          onTogglePersonalize={() => setShowPersonalize((prev) => !prev)}
          onResetAll={handleResetAll}
        />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
