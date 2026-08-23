import type { KpiCard } from "../lib/syntheticData";

interface KpiCardProps {
  data: KpiCard;
}

export default function KpiCard({ data }: KpiCardProps) {
  const deltaColor = {
    up: "text-instrument-green",
    down: "text-rust",
    neutral: "text-graphite-muted",
  }[data.deltaDirection || "neutral"];

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-graphite-muted mb-1">{data.label}</p>
      <p className="text-2xl md:text-3xl font-medium text-graphite tracking-tight">{data.value}</p>
      {data.delta && (
        <p className={`text-xs font-medium mt-1 ${deltaColor}`}>{data.delta}</p>
      )}
    </div>
  );
}
