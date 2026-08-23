import { useMemo, useState } from "react";
import DashboardFrame from "../DashboardFrame";
import KpiGrid from "../KpiGrid";
import GroupedBarChart from "../charts/GroupedBarChart";
import VerticalBarChart from "../charts/VerticalBarChart";
import CohortHeatmap from "../charts/CohortHeatmap";
import DataTable from "../charts/DataTable";
import { customerAnalysisData } from "../../lib/syntheticData";

export default function CustomerAnalysisSpecimen() {
  const [period, setPeriod] = useState("all");
  const [tier, setTier] = useState("all");

  const filteredCustomers = useMemo(() => {
    if (tier === "all") return customerAnalysisData.customers;
    return customerAnalysisData.customers.filter((c) => c.tier === tier);
  }, [tier]);

  const filteredFrequencyTable = useMemo(() => {
    if (tier === "all") return customerAnalysisData.frequencyTable;
    const tierCounts: Record<string, number> = {};
    customerAnalysisData.customers.forEach((c) => {
      tierCounts[c.frequency] = (tierCounts[c.frequency] || 0) + 1;
    });
    const filteredCounts = tier === "all" ? tierCounts : Object.fromEntries(
      Object.entries(tierCounts).filter(([, count]) => count > 0)
    );
    const total = Object.values(filteredCounts).reduce((a, b) => a + b, 0) || 1;
    return customerAnalysisData.frequencyTable
      .filter((f) => (filteredCounts[f.frequency] || 0) > 0)
      .map((f) => ({
        ...f,
        count: filteredCounts[f.frequency] || 0,
        percent: `${((filteredCounts[f.frequency] || 0) / total * 100).toFixed(1)}%`,
      }));
  }, [tier]);

  const filteredCohortHeatmap = useMemo(() => {
    if (period === "all") return customerAnalysisData.cohortHeatmap;
    return customerAnalysisData.cohortHeatmap.filter((m) => m.month === period);
  }, [period]);

  const filteredNewVsReturning = useMemo(() => {
    if (period === "all") return customerAnalysisData.newVsReturning;
    return customerAnalysisData.newVsReturning.filter((m) => m.name === period);
  }, [period]);

  const filteredRetentionRate = useMemo(() => {
    if (period === "all") return customerAnalysisData.retentionRate;
    return customerAnalysisData.retentionRate.filter((m) => m.name === period);
  }, [period]);

  const filteredKpis = useMemo(() => {
    if (tier === "all" && period === "all") return customerAnalysisData.kpis;
    if (tier !== "all") {
      const count = customerAnalysisData.customers.filter((c) => c.tier === tier).length;
      const total = customerAnalysisData.customers.length;
      const proportion = count / total;
      return customerAnalysisData.kpis.map((kpi) => {
        if (kpi.label.includes("Active Customers")) {
          return { ...kpi, value: String(count), delta: `+${Math.round(proportion * 24)}` };
        }
        if (kpi.label.includes("Returning Customers")) {
          return { ...kpi, value: String(Math.round(count * 0.6)), delta: `+${Math.round(proportion * 18)}` };
        }
        if (kpi.label.includes("Average Order Value")) {
          return { ...kpi, value: `$${(128.40 * (0.8 + proportion * 0.4)).toFixed(2)}` };
        }
        if (kpi.label.includes("Lifetime Value")) {
          return { ...kpi, value: `$${Math.round(1240 * (0.8 + proportion * 0.4)).toLocaleString()}` };
        }
        return kpi;
      });
    }
    return customerAnalysisData.kpis;
  }, [tier, period]);

  const customerColumns = [
    { key: "id", label: "Customer ID" },
    { key: "name", label: "Name" },
    { key: "rep", label: "Rep" },
    { key: "tier", label: "Tier" },
    { key: "frequency", label: "Frequency" },
    { key: "lastOrder", label: "Last Order" },
  ];

  return (
    <DashboardFrame
      title="Customer Analysis"
      filters={
        <>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">Jan 2026 – Jun 2026</option>
            {customerAnalysisData.newVsReturning.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} 2026
              </option>
            ))}
          </select>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-mineral-blue"
          >
            <option value="all">All Tiers</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </>
      }
      density="dense"
    >
      <KpiGrid items={filteredKpis} columns={3} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GroupedBarChart
          title="New vs Returning Customers"
          data={filteredNewVsReturning}
          bars={[
            { key: "new", label: "New", color: "#0B5D48" },
            { key: "returning", label: "Returning", color: "#86EFAC" },
          ]}
        />
        <VerticalBarChart title="Retention Rate" data={filteredRetentionRate} color="#2563EB" />
      </div>
      <CohortHeatmap title="Retention Cohorts" data={filteredCohortHeatmap} />
      <DataTable title="Frequency Summary" columns={[{ key: "frequency", label: "Frequency" }, { key: "count", label: "Count" }, { key: "percent", label: "Percent" }]} rows={filteredFrequencyTable} />
      <DataTable title="Customer Lifecycle" columns={customerColumns} rows={filteredCustomers} />
      <p className="text-[10px] text-graphite-muted pt-2">
        Reporting period: {customerAnalysisData.meta.reportingPeriod} • Synthetic data • No production connections
      </p>
    </DashboardFrame>
  );
}
