import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPARISON_ROWS,
  DEFAULT_CHECKLIST,
  DEFAULT_COMMITMENTS,
  DEFAULT_PROFILE,
  DEFAULT_WEIGHTS,
  calculatePriorityAlignment,
  computeChecklistProgress,
  filterComparisonRows,
  formatProposalSummary,
} from './proposalLogic';

test('filterComparisonRows returns all rows when category is all', () => {
  const filtered = filterComparisonRows(COMPARISON_ROWS, 'all');
  assert.equal(filtered.length, COMPARISON_ROWS.length);
});

test('filterComparisonRows returns only matching category rows', () => {
  const facilities = filterComparisonRows(COMPARISON_ROWS, 'facilities');
  assert.ok(facilities.length > 0);
  assert.ok(facilities.every((row) => row.category === 'facilities'));
});

test('calculatePriorityAlignment calculates accurate weighted percentage and top priority', () => {
  const result = calculatePriorityAlignment({
    universityPathways: 5,
    stemFacilities: 5,
    holisticGrowth: 1,
    transitionReadiness: 1,
  });

  // (5*1.0 + 5*1.0 + 1*0.9 + 1*0.84) / 12 = 11.74 / 12 = 97.83% -> 98%
  assert.equal(result.weightedScorePercent, 98);
  assert.equal(result.topPriorityLabel, 'Top Computer Science & Tech University Pathways');
  assert.equal(result.focusPoints.length, 3);
});

test('calculatePriorityAlignment handles out-of-range weights safely by clamping', () => {
  const result = calculatePriorityAlignment({
    universityPathways: 99,
    stemFacilities: -5,
    holisticGrowth: 3,
    transitionReadiness: 3,
  });

  assert.ok(result.weightedScorePercent >= 80 && result.weightedScorePercent <= 100);
});

test('computeChecklistProgress reports accurate counts and percentage', () => {
  const initial = computeChecklistProgress(DEFAULT_CHECKLIST);
  assert.equal(initial.completed, 1);
  assert.equal(initial.total, 4);
  assert.equal(initial.percent, 25);

  const empty = computeChecklistProgress([]);
  assert.equal(empty.percent, 0);
});

test('formatProposalSummary includes student, dad, alignment, and custom notes', () => {
  const alignment = calculatePriorityAlignment(DEFAULT_WEIGHTS);
  const summary = formatProposalSummary(
    { ...DEFAULT_PROFILE, studentName: 'Kwame', dadName: 'Mr. Boateng' },
    alignment,
    DEFAULT_COMMITMENTS,
    DEFAULT_CHECKLIST,
    'Let us check boarding fees on Tuesday.'
  );

  assert.ok(summary.includes('Kwame'));
  assert.ok(summary.includes('Mr. Boateng'));
  assert.ok(summary.includes('Let us check boarding fees on Tuesday.'));
  assert.ok(summary.includes('1/4 completed'));
});
