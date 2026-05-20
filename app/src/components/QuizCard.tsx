"use client";

import { useState, useEffect, useCallback } from "react";
import type { DailyPnl, Politician } from "@/types/database";
import { formatMoney, getPartyColor } from "@/lib/utils";

type PnlEntry = DailyPnl & { politician: Politician };

type Prediction = {
  date: string;
  aId: string;
  bId: string;
  aName: string;
  bName: string;
  pick: string; // politician id
};

type Props = {
  pnlData: PnlEntry[];
};

const USD_KRW = 1500;
const toKRW = (val: number, country: string) => country === "US" ? val * USD_KRW : val;

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function getRandomPair(data: PnlEntry[]): [PnlEntry, PnlEntry] {
  const valid = data.filter((d) => d.daily_gain !== 0 && d.total_portfolio_value > 0);
  const pool = valid.length >= 2 ? valid : data;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export function QuizCard({ pnlData }: Props) {
  const [pair, setPair] = useState<[PnlEntry, PnlEntry] | null>(null);
  const [todayPrediction, setTodayPrediction] = useState<Prediction | null>(null);
  const [yesterdayResult, setYesterdayResult] = useState<{
    prediction: Prediction;
    correct: boolean;
    aGain: string;
    bGain: string;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const loadState = useCallback(() => {
    try {
      const saved = localStorage.getItem("polywatch_quiz");
      if (!saved) return;
      const state = JSON.parse(saved);
      setScore(state.score || 0);
      setStreak(state.streak || 0);

      const today = getToday();

      // Check if there's a prediction for today (made yesterday)
      if (state.prediction && state.prediction.date === today) {
        // This prediction was for today — check result
        const a = pnlData.find((p) => p.politician_id === state.prediction.aId);
        const b = pnlData.find((p) => p.politician_id === state.prediction.bId);
        if (a && b) {
          const aGain = toKRW(a.daily_gain, a.politician.country);
          const bGain = toKRW(b.daily_gain, b.politician.country);
          const winnerId = aGain >= bGain ? a.politician_id : b.politician_id;
          const correct = state.prediction.pick === winnerId;

          setYesterdayResult({
            prediction: state.prediction,
            correct,
            aGain: formatMoney(a.daily_gain, a.politician.country),
            bGain: formatMoney(b.daily_gain, b.politician.country),
          });

          // Award points if not already awarded
          if (!state.resultChecked) {
            let newScore = state.score || 0;
            let newStreak = state.streak || 0;
            if (correct) {
              newScore += 10 + newStreak * 5;
              newStreak += 1;
            } else {
              newStreak = 0;
            }
            setScore(newScore);
            setStreak(newStreak);
            localStorage.setItem("polywatch_quiz", JSON.stringify({
              ...state, score: newScore, streak: newStreak, resultChecked: true,
            }));
          }
        }
      }

      // Check if already made tomorrow's prediction
      const tomorrow = getTomorrow();
      if (state.nextPrediction && state.nextPrediction.date === tomorrow) {
        setTodayPrediction(state.nextPrediction);
      }
    } catch {}
  }, [pnlData]);

  useEffect(() => {
    setPair(getRandomPair(pnlData));
    loadState();
  }, [pnlData, loadState]);

  if (!pair) return null;

  const [a, b] = pair;
  const hasPredicted = todayPrediction !== null;

  const handlePredict = (idx: 0 | 1) => {
    const picked = idx === 0 ? a : b;
    const tomorrow = getTomorrow();
    const prediction: Prediction = {
      date: tomorrow,
      aId: a.politician_id,
      bId: b.politician_id,
      aName: a.politician.name_kr || a.politician.name,
      bName: b.politician.name_kr || b.politician.name,
      pick: picked.politician_id,
    };
    setTodayPrediction(prediction);

    try {
      const saved = localStorage.getItem("polywatch_quiz");
      const state = saved ? JSON.parse(saved) : { score: 0, streak: 0 };
      localStorage.setItem("polywatch_quiz", JSON.stringify({
        ...state, nextPrediction: prediction, prediction: prediction, resultChecked: false,
      }));
    } catch {}
  };

  const renderPolitician = (entry: PnlEntry, idx: 0 | 1) => {
    const pol = entry.politician;
    const isPicked = todayPrediction?.pick === entry.politician_id;

    return (
      <button
        onClick={() => handlePredict(idx)}
        disabled={hasPredicted}
        className={`flex-1 rounded-2xl p-4 transition-all ${
          hasPredicted
            ? isPicked
              ? "bg-blue-50 border-2 border-toss-blue"
              : "bg-gray-50 border-2 border-gray-200 opacity-60"
            : "bg-white border-2 border-gray-100 active:scale-[0.97] active:bg-gray-50"
        }`}
      >
        <div className="flex justify-center mb-2">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[20px] font-bold"
            style={{ backgroundColor: getPartyColor(pol.party) }}
          >
            {(pol.name_kr || pol.name).charAt(0)}
          </div>
        </div>
        <p className="text-[15px] font-bold text-gray-900 text-center truncate">
          {pol.name_kr || pol.name}
        </p>
        <p className="text-[12px] text-gray-400 text-center mt-0.5">
          {pol.country === "US" ? pol.chamber : "국회"}
        </p>
        <p className="text-[11px] text-gray-400 text-center mt-1">
          {"포트폴리오 "}{formatMoney(entry.total_portfolio_value, pol.country)}
        </p>
        {hasPredicted && isPicked && (
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
      {/* Yesterday's result */}
      {yesterdayResult && (
        <div className={`mb-3 p-3.5 rounded-xl ${yesterdayResult.correct ? "bg-green-50" : "bg-red-50"}`}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-gray-900">
              {yesterdayResult.correct ? "정답!" : "아쉽!"}
            </span>
            {yesterdayResult.correct && (
              <span className="text-[12px] font-bold text-positive">
                +{10 + Math.max(0, streak - 1) * 5}P
              </span>
            )}
          </div>
          <p className="text-[12px] text-gray-600 mt-1">
            {yesterdayResult.prediction.aName} {yesterdayResult.aGain} vs {yesterdayResult.prediction.bName} {yesterdayResult.bGain}
          </p>
        </div>
      )}

      {/* Quiz header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-bold text-gray-900">
            {hasPredicted ? "예측 완료!" : "내일의 수익왕은?"}
          </h2>
          <p className="text-[12px] text-gray-400">
            {hasPredicted ? "내일 결과를 확인하세요" : "내일 더 많이 벌 의원을 골라보세요"}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {streak > 1 && (
            <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              {streak}연속
            </span>
          )}
          <span className="text-[14px] font-bold text-toss-blue bg-blue-50 px-3 py-1 rounded-full">
            {score}P
          </span>
        </div>
      </div>

      {/* VS Cards */}
      <div className="flex gap-3 items-stretch">
        {renderPolitician(a, 0)}
        <div className="flex items-center">
          <span className="text-[15px] font-bold text-gray-300">VS</span>
        </div>
        {renderPolitician(b, 1)}
      </div>

      {/* Predicted message */}
      {hasPredicted && (
        <p className="text-center text-[12px] text-gray-400 mt-3">
          {"내일 장 마감 후 결과가 공개됩니다"}
        </p>
      )}
    </div>
  );
}
