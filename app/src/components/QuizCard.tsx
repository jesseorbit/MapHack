"use client";

import { useState, useEffect } from "react";
import type { DailyPnl, Politician } from "@/types/database";
import { formatMoney, formatPct, getPartyColor } from "@/lib/utils";

type PnlEntry = DailyPnl & { politician: Politician };

type Props = {
  pnlData: PnlEntry[];
};

function getRandomPair(data: PnlEntry[]): [PnlEntry, PnlEntry] {
  const withGain = data.filter((d) => d.daily_gain !== 0);
  if (withGain.length < 2) return [data[0], data[1]];
  const shuffled = [...withGain].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export function QuizCard({ pnlData }: Props) {
  const [pair, setPair] = useState<[PnlEntry, PnlEntry] | null>(null);
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setPair(getRandomPair(pnlData));
    const saved = localStorage.getItem("quiz_score");
    if (saved) {
      const s = JSON.parse(saved);
      setScore(s.score || 0);
      setStreak(s.streak || 0);
      setTotal(s.total || 0);
    }
  }, [pnlData]);

  if (!pair) return null;

  const [a, b] = pair;
  const USD_KRW = 1500;
  const toKRW = (val: number, country: string) => country === "US" ? val * USD_KRW : val;
  const aGain = toKRW(a.daily_gain, a.politician.country);
  const bGain = toKRW(b.daily_gain, b.politician.country);
  const winnerId = aGain >= bGain ? 0 : 1;

  const handleSelect = (idx: 0 | 1) => {
    if (selected !== null) return;
    setSelected(idx);
    const newTotal = total + 1;
    let newScore = score;
    let newStreak = streak;
    if (idx === winnerId) {
      newScore += 10 + streak * 5;
      newStreak += 1;
    } else {
      newStreak = 0;
    }
    setScore(newScore);
    setStreak(newStreak);
    setTotal(newTotal);
    localStorage.setItem("quiz_score", JSON.stringify({ score: newScore, streak: newStreak, total: newTotal }));
  };

  const handleNext = () => {
    setSelected(null);
    setPair(getRandomPair(pnlData));
  };

  const renderCard = (entry: PnlEntry, idx: 0 | 1) => {
    const pol = entry.politician;
    const isRevealed = selected !== null;
    const isWinner = idx === winnerId;
    const isSelected = selected === idx;
    const gain = toKRW(entry.daily_gain, pol.country);

    return (
      <button
        onClick={() => handleSelect(idx)}
        disabled={isRevealed}
        className={`flex-1 rounded-2xl p-4 transition-all ${
          isRevealed
            ? isWinner
              ? "bg-blue-50 border-2 border-toss-blue"
              : "bg-gray-50 border-2 border-gray-200"
            : isSelected
              ? "bg-gray-100 border-2 border-gray-300"
              : "bg-white border-2 border-gray-100 active:bg-gray-50"
        }`}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[18px] font-bold"
            style={{ backgroundColor: getPartyColor(pol.party) }}
          >
            {(pol.name_kr || pol.name).charAt(0)}
          </div>
        </div>

        {/* Name */}
        <p className="text-[14px] font-semibold text-gray-900 text-center truncate">
          {pol.name_kr || pol.name}
        </p>
        <p className="text-[11px] text-gray-400 text-center">
          {pol.country === "US" ? `${pol.chamber}` : "국회"}
        </p>

        {/* Gain - hidden until revealed */}
        <div className="mt-3 h-8 flex items-center justify-center">
          {isRevealed ? (
            <div className="text-center">
              <span className={`text-[16px] font-bold ${gain >= 0 ? "text-positive" : "text-negative"}`}>
                {gain >= 0 ? "+" : ""}{formatMoney(gain, "KR")}
              </span>
              {isWinner && (
                <span className="ml-1 text-[11px] text-toss-blue font-bold">WIN</span>
              )}
            </div>
          ) : (
            <span className="text-[20px]">?</span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="mx-5 mt-3 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900">
            {"수익왕 맞히기"}
          </h2>
          <p className="text-[12px] text-gray-400">
            {"오늘 누가 더 벌었을까?"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              {streak}연속
            </span>
          )}
          <span className="text-[13px] font-bold text-toss-blue bg-blue-50 px-2.5 py-1 rounded-full">
            {score}P
          </span>
        </div>
      </div>

      {/* VS Cards */}
      <div className="flex gap-3">
        {renderCard(a, 0)}
        <div className="flex items-center">
          <span className="text-[14px] font-bold text-gray-300">VS</span>
        </div>
        {renderCard(b, 1)}
      </div>

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full mt-3 py-2.5 bg-toss-blue text-white text-[14px] font-semibold rounded-xl active:bg-blue-600 transition-colors"
        >
          {"다음 문제"}
        </button>
      )}

      {/* Result message */}
      {selected !== null && (
        <p className="text-center text-[12px] text-gray-400 mt-2">
          {selected === winnerId
            ? `정답! +${10 + (streak - 1) * 5}P${streak > 1 ? ` (${streak}연속 보너스!)` : ""}`
            : "아쉽! 다음에 도전해보세요"}
        </p>
      )}
    </div>
  );
}
