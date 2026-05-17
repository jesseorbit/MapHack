"use client";

type Props = {
  selected: "ALL" | "US" | "KR";
  onChange: (tab: "ALL" | "US" | "KR") => void;
};

export function CountryTab({ selected, onChange }: Props) {
  const tabs = [
    { value: "ALL" as const, label: "\uC804\uCCB4" },
    { value: "US" as const, label: "\uBBF8\uAD6D" },
    { value: "KR" as const, label: "\uD55C\uAD6D" },
  ];

  return (
    <div className="flex gap-1.5 px-5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
            selected === tab.value
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
