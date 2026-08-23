export type SyntheticMeta = {
  synthetic: true;
  source: "generated-demo-data";
  reportingPeriod: string;
};

export type KpiCard = {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "neutral";
  accent?: "positive" | "negative" | "neutral";
};

export type RepRow = {
  name: string;
  value: number;
};

export type MonthlyPoint = {
  month: string;
  value: number;
  comparison?: number;
};

export type CohortCell = {
  month: string;
  retention: number;
};

export type CustomerRecord = {
  id: string;
  name: string;
  rep: string;
  tier: string;
  frequency: string;
  lastOrder: string;
};

const meta: SyntheticMeta = {
  synthetic: true,
  source: "generated-demo-data",
  reportingPeriod: "Jan 2026 – Jun 2026",
};

export const marketingData = {
  meta,
  kpis: [
    { label: "Spend YTD", value: "1.4M", delta: "+12.4%", deltaDirection: "up" as const },
    { label: "Spend MTD", value: "238.6K", delta: "+3.1%", deltaDirection: "up" as const },
    { label: "Spend w/ Tax MTD", value: "261.2K", delta: "+2.8%", deltaDirection: "up" as const },
    { label: "Conversion Rate", value: "4.7%", delta: "-0.3%", deltaDirection: "down" as const },
    { label: "Leads YTD", value: "17.8K", delta: "+8.2%", deltaDirection: "up" as const },
    { label: "Leads MTD", value: "2.9K", delta: "+5.1%", deltaDirection: "up" as const },
    { label: "CPM MTD", value: "$18.40", delta: "-$1.20", deltaDirection: "down" as const },
    { label: "Acquisition Cost", value: "$42.15", delta: "+$2.30", deltaDirection: "down" as const },
  ],
  conversionByRep: [
    { name: "Avery Stone", value: 5.2 },
    { name: "Jordan Vale", value: 4.8 },
    { name: "Casey Rowan", value: 4.1 },
    { name: "Morgan Reed", value: 3.9 },
    { name: "Taylor Quinn", value: 3.5 },
    { name: "Riley Boone", value: 3.2 },
  ],
  leadsByRep: [
    { name: "Avery Stone", value: 842 },
    { name: "Jordan Vale", value: 721 },
    { name: "Casey Rowan", value: 634 },
    { name: "Morgan Reed", value: 589 },
    { name: "Taylor Quinn", value: 512 },
    { name: "Riley Boone", value: 478 },
  ],
  monthlySpend: [
    { name: "Jan", value: 180000, comparison: 160000 },
    { name: "Feb", value: 195000, comparison: 170000 },
    { name: "Mar", value: 210000, comparison: 185000 },
    { name: "Apr", value: 205000, comparison: 190000 },
    { name: "May", value: 225000, comparison: 200000 },
    { name: "Jun", value: 240000, comparison: 215000 },
  ],
  newVsReturningRevenue: [
    { name: "Jan", new: 45000, returning: 32000 },
    { name: "Feb", new: 52000, returning: 35000 },
    { name: "Mar", new: 58000, returning: 38000 },
    { name: "Apr", new: 51000, returning: 41000 },
    { name: "May", new: 62000, returning: 44000 },
    { name: "Jun", new: 68000, returning: 47000 },
  ],
};

export const commissionData = {
  meta,
  kpis: [
    { label: "Gross Sales", value: "2.1M", delta: "+9.6%", deltaDirection: "up" as const },
    { label: "Delivery Cost", value: "84.2K", delta: "+2.1%", deltaDirection: "up" as const },
    { label: "Balance Due", value: "142.5K", delta: "-5.4%", deltaDirection: "down" as const },
    { label: "Gross Commission", value: "210.8K", delta: "+9.6%", deltaDirection: "up" as const },
    { label: "B2C Commission", value: "126.4K", delta: "+7.2%", deltaDirection: "up" as const },
    { label: "Net Commission", value: "189.6K", delta: "+8.8%", deltaDirection: "up" as const },
  ],
  netCommissionByRep: [
    { name: "Avery Stone", value: 42800 },
    { name: "Jordan Vale", value: 38200 },
    { name: "Casey Rowan", value: 31500 },
    { name: "Morgan Reed", value: 27400 },
    { name: "Taylor Quinn", value: 21200 },
    { name: "Riley Boone", value: 18500 },
  ],
  monthlyNetCommission: [
    { name: "Jan", value: 28000 },
    { name: "Feb", value: 29500 },
    { name: "Mar", value: 31000 },
    { name: "Apr", value: 30500 },
    { name: "May", value: 32500 },
    { name: "Jun", value: 33800 },
  ],
  balanceDueByRep: [
    { name: "Avery Stone", value: 28500 },
    { name: "Jordan Vale", value: 22100 },
    { name: "Casey Rowan", value: 18400 },
    { name: "Morgan Reed", value: 320 },
    { name: "Taylor Quinn", value: 0 },
    { name: "Riley Boone", value: 150 },
  ],
};

export const salesData = {
  meta,
  kpis: [
    { label: "Gross Sales YTD", value: "3.2M", delta: "+14.2%", deltaDirection: "up" as const },
    { label: "Gross Sales MTD", value: "542.8K", delta: "+6.7%", deltaDirection: "up" as const },
    { label: "Gross Sales MTD B2C", value: "324.5K", delta: "+8.1%", deltaDirection: "up" as const },
    { label: "Gross Sales MTD B2B", value: "—", delta: "No data", deltaDirection: "neutral" as const, accent: "neutral" as const },
  ],
  monthlyNewBusiness: [
    { name: "Jan", value: 420000 },
    { name: "Feb", value: 385000 },
    { name: "Mar", value: 510000 },
    { name: "Apr", value: 465000 },
    { name: "May", value: 540000 },
    { name: "Jun", value: 580000 },
  ],
  weeklySales: [
    { name: "W1", value: 128000 },
    { name: "W2", value: 142000 },
    { name: "W3", value: 135000 },
    { name: "W4", value: 151000 },
    { name: "W5", value: 148000 },
    { name: "W6", value: 162000 },
    { name: "W7", value: 155000 },
    { name: "W8", value: 170000 },
    { name: "W9", value: 168000 },
    { name: "W10", value: 175000 },
    { name: "W11", value: 182000 },
    { name: "W12", value: 190000 },
  ],
};

export const customerAnalysisData = {
  meta,
  kpis: [
    { label: "Active Customers", value: "684", delta: "+24", deltaDirection: "up" as const },
    { label: "Returning Customers", value: "412", delta: "+18", deltaDirection: "up" as const },
    { label: "Average Order Value", value: "$128.40", delta: "+$4.20", deltaDirection: "up" as const },
    { label: "Lifetime Value", value: "$1,240", delta: "+$85", deltaDirection: "up" as const },
    { label: "Acquisition Cost", value: "$42.15", delta: "+$2.30", deltaDirection: "down" as const },
    { label: "LTV-to-CAC Ratio", value: "29.4x", delta: "+2.1x", deltaDirection: "up" as const },
  ],
  newVsReturning: [
    { name: "Jan", new: 120, returning: 85 },
    { name: "Feb", new: 135, returning: 92 },
    { name: "Mar", new: 148, returning: 101 },
    { name: "Apr", new: 142, returning: 108 },
    { name: "May", new: 155, returning: 114 },
    { name: "Jun", new: 168, returning: 121 },
  ],
  retentionRate: [
    { name: "Jan", value: 92 },
    { name: "Feb", value: 88 },
    { name: "Mar", value: 91 },
    { name: "Apr", value: 85 },
    { name: "May", value: 89 },
    { name: "Jun", value: 93 },
  ],
  cohortHeatmap: [
    { month: "Jan", retention: 100 },
    { month: "Feb", retention: 88 },
    { month: "Mar", retention: 76 },
    { month: "Apr", retention: 65 },
    { month: "May", retention: 58 },
    { month: "Jun", retention: 52 },
  ],
  frequencyTable: [
    { frequency: "Weekly", count: 142, percent: "20.8%" },
    { frequency: "Bi-weekly", count: 198, percent: "28.9%" },
    { frequency: "Monthly", count: 256, percent: "37.4%" },
    { frequency: "Quarterly", count: 88, percent: "12.9%" },
  ],
  customers: [
    { id: "DEMO-CUST-1048", name: "Avery Stone", rep: "Rep A", tier: "Medium", frequency: "Monthly", lastOrder: "1 day" },
    { id: "DEMO-CUST-1049", name: "Jordan Vale", rep: "Rep B", tier: "High", frequency: "Weekly", lastOrder: "3 days" },
    { id: "DEMO-CUST-1050", name: "Casey Rowan", rep: "Rep C", tier: "Low", frequency: "Quarterly", lastOrder: "12 days" },
    { id: "DEMO-CUST-1051", name: "Morgan Reed", rep: "Rep A", tier: "Medium", frequency: "Bi-weekly", lastOrder: "5 days" },
    { id: "DEMO-CUST-1052", name: "Taylor Quinn", rep: "Rep B", tier: "High", frequency: "Monthly", lastOrder: "2 days" },
    { id: "DEMO-CUST-1053", name: "Riley Boone", rep: "Rep C", tier: "Low", frequency: "Quarterly", lastOrder: "18 days" },
  ],
};
