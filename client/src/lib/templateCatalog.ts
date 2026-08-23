export type TemplateId = "marketing" | "commission" | "sales" | "customer-analysis";

export type TemplateCatalogItem = {
  id: TemplateId;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  chartTypes: string[];
  density: "focused" | "balanced" | "dense";
  previewAspect: "wide" | "tall";
  synthetic: true;
};

export const templateCatalog: TemplateCatalogItem[] = [
  {
    id: "marketing",
    title: "Marketing Performance",
    shortTitle: "Marketing",
    description: "Campaign efficiency and lead flow across channels.",
    category: "Marketing",
    chartTypes: ["vertical-bar", "horizontal-bar", "area-trend", "grouped-bar"],
    density: "dense",
    previewAspect: "wide",
    synthetic: true,
  },
  {
    id: "commission",
    title: "Commission Overview",
    shortTitle: "Commission",
    description: "Representative earnings, balances, and delivery costs.",
    category: "Finance",
    chartTypes: ["vertical-bar", "horizontal-bar"],
    density: "balanced",
    previewAspect: "wide",
    synthetic: true,
  },
  {
    id: "sales",
    title: "Sales Performance",
    shortTitle: "Sales",
    description: "Revenue trends, new business, and segment breakdown.",
    category: "Sales",
    chartTypes: ["horizontal-bar", "area-trend"],
    density: "focused",
    previewAspect: "tall",
    synthetic: true,
  },
  {
    id: "customer-analysis",
    title: "Customer Analysis",
    shortTitle: "Customer",
    description: "Retention cohorts, lifetime value, and frequency patterns.",
    category: "Analytics",
    chartTypes: ["grouped-bar", "cohort-heatmap", "data-table"],
    density: "dense",
    previewAspect: "tall",
    synthetic: true,
  },
];
