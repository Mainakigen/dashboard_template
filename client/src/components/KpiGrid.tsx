import type { KpiCard as KpiCardType } from "../lib/syntheticData";
import KpiCard from "./KpiCard";

interface KpiGridProps {
  items: KpiCardType[];
  columns?: 2 | 3 | 4;
}

export default function KpiGrid({ items, columns = 4 }: KpiGridProps) {
  const cols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${cols} gap-4`}>
      {items.map((item, idx) => (
        <KpiCard key={idx} data={item} />
      ))}
    </div>
  );
}
