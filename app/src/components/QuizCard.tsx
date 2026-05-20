"use client";

import { useState, useEffect } from "react";
import type { DailyPnl, Politician } from "@/types/database";
import { formatMoney, getPartyColor } from "@/lib/utils";

type PnlEntry = DailyPnl & { politician: Politician };
type Props = { pnlData: PnlEntry[] };

const TOTAL_QUESTIONS = 5;
const PERFECT_BONUS = 1000;
const USD_KRW = 1500;
const toKRW = (val: number, c: string) => c === "US" ? val * USD_KRW : val;

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function generatePairs(data: PnlEntry[], count: number): [PnlEntry, PnlEntry][] {
  const valid = data.filter((d) => d.total_portfolio_value > 0);
  const shuffled = [...valid].sort(() => Math.random() - 0.5);
  const pairs: [PnlEntry, PnlEntry][] = [];
  const used = new Set<string>();
  for (let i = 0; i < shuffled.length - 1 && pairs.length < count; i++) {
    for (let j = i + 1; j < shuffled.length && pairs.length < count; j++) {
      const a = shuffled[i], b = shuffled[j];
      if (!used.has(a.politician_id) && !used.has(b.politician_id)) {
        pairs.push([a, b]);
        used.add(a.politician_id);
        used.add(b.politician_id);
      }
    }
  }
  return pairs;
}

type SavedState = {
  date: string;
  picks: (string | null)[];
  pairs: { aId: string; bId: string; aName: string; bName: string }[];
  completed: boolean;
  score: number;
  totalScore: number;
};

export function QuizCard({ pnlData }: Props) {
  const [pairs, setPairs] = useState<[PnlEntry, PnlEntry][]>([]);
  const [current, setCurrent] = useState(0);
  const [picks, setPicks] = useState<(string | null)[]>(Array(TOTAL_QUESTIONS).fill(null));
  const [completed, setCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const tomorrow = getTomorrow();
    try {
      const saved = localStorage.getItem("maphack_quiz");
      if (saved) {
        const state: SavedState = JSON.parse(saved);
        setTotalScore(state.totalScore || 0);
        if (state.date === tomorrow && state.pairs.length === TOTAL_QUESTIONS) {
          // Restore today's session
          const restored = state.pairs.map((p) => {
            const a = pnlData.find((d) => d.politician_id === p.aId);
            const b = pnlData.find((d) => d.politician_id === p.bId);
            return a && b ? [a, b] as [PnlEntry, PnlEntry] : null;
          }).filter(Boolean) as [PnlEntry, PnlEntry][];

          if (restored.length === TOTAL_QUESTIONS) {
            setPairs(restored);
            setPicks(state.picks);
            setCompleted(state.completed);
            const firstNull = state.picks.findIndex((p) => p === null);
            setCurrent(firstNull === -1 ? TOTAL_QUESTIONS - 1 : firstNull);
            return;
          }
        }
      }
    } catch {}

    // Generate new pairs
    const newPairs = generatePairs(pnlData, TOTAL_QUESTIONS);
    setPairs(newPairs);
    saveState(newPairs, Array(TOTAL_QUESTIONS).fill(null), false);
  }, [pnlData]);

  function saveState(p: [PnlEntry, PnlEntry][], pk: (string | null)[], done: boolean) {
    try {
      const state: SavedState = {
        date: getTomorrow(),
        picks: pk,
        pairs: p.map(([a, b]) => ({
          aId: a.politician_id, bId: b.politician_id,
          aName: a.politician.name_kr || a.politician.name,
          bName: b.politician.name_kr || b.politician.name,
        })),
        completed: done,
        score: 0,
        totalScore,
      };
      localStorage.setItem("maphack_quiz", JSON.stringify(state));
    } catch {}
  }

  if (pairs.length < TOTAL_QUESTIONS) return null;

  const handlePick = (idx: 0 | 1) => {
    if (picks[current] !== null) return;
    const picked = idx === 0 ? pairs[current][0] : pairs[current][1];
    const newPicks = [...picks];
    newPicks[current] = picked.politician_id;
    setPicks(newPicks);

    const isLast = current === TOTAL_QUESTIONS - 1;
    if (isLast) {
      setCompleted(true);
      const correctCount = newPicks.filter((_, i) => i < TOTAL_QUESTIONS).length; // all answered
      if (correctCount === TOTAL_QUESTIONS) {
        setTotalScore((s) => s + PERFECT_BONUS);
      }
    }
    saveState(pairs, newPicks, isLast);
  };

  const handleNext = () => {
    if (current < TOTAL_QUESTIONS - 1) {
      setCurrent(current + 1);
    }
  };

  const pair = pairs[current];
  const [a, b] = pair;
  const hasPicked = picks[current] !== null;
  const answeredCount = picks.filter((p) => p !== null).length;

  const renderCard = (entry: PnlEntry, idx: 0 | 1) => {
    const pol = entry.politician;
    const isPicked = picks[current] === entry.politician_id;

    return (
      <button
        onClick={() => handlePick(idx)}
        disabled={hasPicked}
        className={`flex-1 rounded-2xl p-4 transition-all ${
          hasPicked
            ? isPicked
              ? "bg-blue-50 border-2 border-toss-blue scale-[1.02]"
              : "bg-gray-50 border-2 border-gray-200 opacity-50"
            : "bg-white border-2 border-gray-100 active:scale-[0.97]"
        }`}
      >
        <div className="flex justify-center mb-2">
          <div
            className="w-13 h-13 rounded-full flex items-center justify-center text-white text-[18px] font-bold"
            style={{ backgroundColor: getPartyColor(pol.party) }}
          >
            {(pol.name_kr || pol.name).charAt(0)}
          </div>
        </div>
        <p className="text-[14px] font-bold text-gray-900 text-center truncate">
          {pol.name_kr || pol.name}
        </p>
        <p className="text-[11px] text-gray-400 text-center mt-0.5">
          {pol.country === "US" ? pol.chamber : "국회"}
        </p>
        <p className="text-[11px] text-gray-400 text-center mt-1">
          {formatMoney(entry.total_portfolio_value, pol.country)}
        </p>
        {hasPicked && isPicked && (
          <div className="mt-2 text-center">
            <span className="text-[11px] font-bold text-toss-blue bg-blue-100 px-2 py-0.5 rounded-full">
              {"내 선택"}
            </span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="mx-5 mt-3 mb-2">
      {/* Progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[14px] font-bold text-gray-900">
          {completed ? "예측 완료!" : `${current + 1} / ${TOTAL_QUESTIONS}`}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] text-gray-400">
            {completed ? "내일 결과 공개" : "전부 맞히면"}
          </span>
          <span className="text-[13px] font-bold text-toss-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
            {completed ? `${totalScore}P` : `+${PERFECT_BONUS}P`}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              picks[i] !== null
                ? "bg-toss-blue"
                : i === current
                  ? "bg-blue-200"
                  : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      {!completed && (
        <>
          <p className="text-center text-[13px] text-gray-500 mb-3">
            {"내일 누가 더 벌까?"}
          </p>

          <div className="flex gap-3 items-stretch">
            {renderCard(a, 0)}
            <div className="flex items-center">
              <span className="text-[15px] font-bold text-gray-300">VS</span>
            </div>
            {renderCard(b, 1)}
          </div>

          {hasPicked && current < TOTAL_QUESTIONS - 1 && (
            <button
              onClick={handleNext}
              className="w-full mt-3 py-2.5 bg-toss-blue text-white text-[14px] font-semibold rounded-xl active:bg-blue-600"
            >
              {"다음 문제"}
            </button>
          )}
        </>
      )}

      {/* Completed */}
      {completed && (
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <p className="text-[28px] mb-1">{"🎯"}</p>
          <p className="text-[15px] font-bold text-gray-900">
            {`${TOTAL_QUESTIONS}문제 예측 완료!`}
          </p>
          <p className="text-[13px] text-gray-500 mt-1">
            {"내일 장 마감 후 결과가 공개됩니다"}
          </p>
          <div className="flex justify-center gap-2 mt-3">
            {pairs.map(([pa, pb], i) => {
              const picked = picks[i];
              const name = picked === pa.politician_id
                ? (pa.politician.name_kr || pa.politician.name)
                : (pb.politician.name_kr || pb.politician.name);
              return (
                <span key={i} className="text-[11px] bg-blue-100 text-toss-blue px-2 py-0.5 rounded-full font-medium">
                  {name.slice(0, 3)}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
