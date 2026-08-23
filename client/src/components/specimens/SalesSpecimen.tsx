import { useMemo, useState } from "react";
import DashboardFrame from "../DashboardFrame";
import KpiGrid from "../KpiGrid";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import AreaTrendChart from "../charts/AreaTrendChart";
import { salesData } from "../../lib/syntheticData";

export default function SalesSpecimen() {
  const [period, setPeriod] = useState("all");
  const [rep, setRep] = useState("all");

  const filteredMonthlyNewBusiness = useMemo(() => {
    if (period === "all") return salesData.monthlyNewBusiness;
    return salesData.monthlyNewBusiness.filter((m) => m.name === period);
  }, [period]);

  const filteredWeeklySales = useMemo(() => {
    if (period === "all") return salesData.weeklySales;
    return salesData.weeklySales.filter((m) => m.name === period);
  }, [period]);

  const filteredKpis = useMemo(() => {
    if (rep === "all" && period === "all") return salesData.kpis;
    if (rep !== "all") {
      const repHash = rep.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const repShare = 0.5 + (repHash % 20) / 100;
      const total = salesData.weeklySales.reduce((sum, w) => sum + w.value, 0);
      const repTotal = Math.round(total * repShare);
      return salesData.kpis.map((kpi) => {
        if (kpi.label.includes("Gross Sales YTD")) {
          return { ...kpi, value: `$${(repTotal / 1000000).toFixed(1)}M`, delta: `+${(repShare * 14).toFixed(1)}%`, deltaDirection: "up" as const };
        }
        if (kpi.label.includes("Gross Sales MTD")) {
          return { ...kpi, value: `$${(repTotal / 6 / 1000).toFixed(1)}K`, delta: `+${(repShare * 6).toFixed(1)}%`, deltaDirection: "up" as const };
        }
        return kpi;
      });
    }
    return salesData.kpis;
  }, [rep, period]);

  return (
    <DashboardFrame
      title="Sales Performance"
      filters={
        <>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">Jan 2026 – Jun 2026</option>
            {salesData.monthlyNewBusiness.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} 2026
              </option>
            ))}
          </select>
          <select
            value={rep}
            onChange={(e) => setRep(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">All Reps</option>
            <option value="Avery Stone">Avery Stone</option>
            <option value="Jordan Vale">Jordan Vale</option>
          </select>
        </>
      }
      density="focused"
    >
      <KpiGrid items={filteredKpis} columns={4} />
      <HorizontalBarChart title="Monthly New-Business Revenue" data={filteredMonthlyNewBusiness} />
      <AreaTrendChart title="Sales Over Reporting Weeks" data={filteredWeeklySales} />
      <p className="text-[10px] text-graphite-muted pt-2">
        Reporting period: {salesData.meta.reportingPeriod} • Synthetic data • No production connections
      </p>
    </DashboardFrame>
  );
}
