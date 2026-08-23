import { useMemo, useState } from "react";
import DashboardFrame from "../DashboardFrame";
import KpiGrid from "../KpiGrid";
import VerticalBarChart from "../charts/VerticalBarChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { commissionData } from "../../lib/syntheticData";

export default function CommissionSpecimen() {
  const [period, setPeriod] = useState("all");
  const [rep, setRep] = useState("all");

  const filteredNetCommissionByRep = useMemo(() => {
    if (rep === "all") return commissionData.netCommissionByRep;
    return commissionData.netCommissionByRep.filter((r) => r.name === rep);
  }, [rep]);

  const filteredMonthlyNetCommission = useMemo(() => {
    if (period === "all") return commissionData.monthlyNetCommission;
    return commissionData.monthlyNetCommission.filter((m) => m.name === period);
  }, [period]);

  const filteredBalanceDueByRep = useMemo(() => {
    if (rep === "all") return commissionData.balanceDueByRep;
    return commissionData.balanceDueByRep.filter((r) => r.name === rep);
  }, [rep]);

  const filteredKpis = useMemo(() => {
    if (rep === "all" && period === "all") return commissionData.kpis;
    if (rep !== "all") {
      const net = commissionData.netCommissionByRep.find((r) => r.name === rep);
      const balance = commissionData.balanceDueByRep.find((r) => r.name === rep);
      return commissionData.kpis.map((kpi) => {
        if (kpi.label.includes("Gross Commission") && net) {
          return { ...kpi, value: `$${(net.value / 1000).toFixed(1)}K` };
        }
        if (kpi.label.includes("Net Commission") && net) {
          return { ...kpi, value: `$${(net.value / 1000).toFixed(1)}K` };
        }
        if (kpi.label.includes("Balance Due") && balance) {
          return { ...kpi, value: `$${(balance.value / 1000).toFixed(1)}K` };
        }
        return kpi;
      });
    }
    return commissionData.kpis;
  }, [rep, period]);

  return (
    <DashboardFrame
      title="Commission Overview"
      filters={
        <>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">Jan 2026 – Jun 2026</option>
            {commissionData.monthlyNetCommission.map((m) => (
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
            {commissionData.netCommissionByRep.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </>
      }
      density="balanced"
    >
      <KpiGrid items={filteredKpis} columns={3} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <VerticalBarChart title="Net Commission by Rep" data={filteredNetCommissionByRep} />
        <HorizontalBarChart title="Monthly Net Commission" data={filteredMonthlyNetCommission} />
      </div>
      <VerticalBarChart title="Balance Due by Rep" data={filteredBalanceDueByRep} color="#D97706" />
      <p className="text-[10px] text-graphite-muted pt-2">
        Reporting period: {commissionData.meta.reportingPeriod} • Synthetic data • No production connections
      </p>
    </DashboardFrame>
  );
}
