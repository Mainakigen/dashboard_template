import { useMemo, useState } from "react";
import DashboardFrame from "../DashboardFrame";
import KpiGrid from "../KpiGrid";
import VerticalBarChart from "../charts/VerticalBarChart";
import AreaTrendChart from "../charts/AreaTrendChart";
import GroupedBarChart from "../charts/GroupedBarChart";
import { marketingData } from "../../lib/syntheticData";

export default function MarketingSpecimen() {
  const [account, setAccount] = useState("all");
  const [rep, setRep] = useState("all");
  const [period, setPeriod] = useState("jan-jun");

  const filteredConversionByRep = useMemo(() => {
    if (rep === "all") return marketingData.conversionByRep;
    return marketingData.conversionByRep.filter((r) => r.name === rep);
  }, [rep]);

  const filteredLeadsByRep = useMemo(() => {
    if (rep === "all") return marketingData.leadsByRep;
    return marketingData.leadsByRep.filter((r) => r.name === rep);
  }, [rep]);

  const filteredMonthlySpend = useMemo(() => {
    if (period === "jan-jun") return marketingData.monthlySpend;
    return marketingData.monthlySpend.filter((m) => m.name === period);
  }, [period]);

  const filteredNewVsReturning = useMemo(() => {
    if (period === "jan-jun") return marketingData.newVsReturningRevenue;
    return marketingData.newVsReturningRevenue.filter((m) => m.name === period);
  }, [period]);

  const filteredKpis = useMemo(() => {
    if (rep === "all" && account === "all") return marketingData.kpis;
    if (rep !== "all" && account === "all") {
      const lead = marketingData.leadsByRep.find((r) => r.name === rep);
      const conv = marketingData.conversionByRep.find((r) => r.name === rep);
      return marketingData.kpis.map((kpi) => {
        if (kpi.label.includes("Leads MTD") && lead) {
          return { ...kpi, value: String(lead.value) };
        }
        if (kpi.label.includes("Conversion Rate") && conv) {
          return { ...kpi, value: `${conv.value}%` };
        }
        if (kpi.label.includes("Leads YTD") && lead) {
          return { ...kpi, value: `${Math.round(lead.value * 6)}` };
        }
        return kpi;
      });
    }
    return marketingData.kpis;
  }, [rep, account]);

  return (
    <DashboardFrame
      title="Marketing Performance"
      filters={
        <>
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">All Accounts</option>
            <option value="A">Account A</option>
            <option value="B">Account B</option>
          </select>
          <select
            value={rep}
            onChange={(e) => setRep(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">All Reps</option>
            {marketingData.conversionByRep.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="jan-jun">Jan 2026 – Jun 2026</option>
            {marketingData.monthlySpend.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} 2026
              </option>
            ))}
          </select>
        </>
      }
      density="dense"
    >
      <KpiGrid items={filteredKpis} columns={4} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <VerticalBarChart title="Conversion Rate by Rep" data={filteredConversionByRep} />
        <VerticalBarChart title="Leads by Rep" data={filteredLeadsByRep} color="#2563EB" />
      </div>
      <AreaTrendChart title="Monthly Spend" data={filteredMonthlySpend} />
      <GroupedBarChart
        title="New vs Returning Revenue"
        data={filteredNewVsReturning}
        bars={[
          { key: "new", label: "New", color: "#0B5D48" },
          { key: "returning", label: "Returning", color: "#86EFAC" },
        ]}
      />
      <p className="text-[10px] text-graphite-muted pt-2">
        Reporting period: {marketingData.meta.reportingPeriod} • Synthetic data • No production connections
      </p>
    </DashboardFrame>
  );
}
