import { useParams, Link, useLocation } from "wouter";
import { ArrowLeft, Shield, Maximize, Tag } from "lucide-react";
import GalleryShell from "../components/GalleryShell";
import MarketingSpecimen from "../components/specimens/MarketingSpecimen";
import CommissionSpecimen from "../components/specimens/CommissionSpecimen";
import SalesSpecimen from "../components/specimens/SalesSpecimen";
import CustomerAnalysisSpecimen from "../components/specimens/CustomerAnalysisSpecimen";
import { templateCatalog } from "../lib/templateCatalog";
import { useState } from "react";

const specimenMap: Record<string, React.ReactNode> = {
  marketing: <MarketingSpecimen />,
  commission: <CommissionSpecimen />,
  sales: <SalesSpecimen />,
  "customer-analysis": <CustomerAnalysisSpecimen />,
};

type RailItemId = "marketing" | "commission" | "sales" | "customer-analysis" | "overview";

export default function TemplateDetail() {
  const params = useParams<{ id: string }>();
  const template = templateCatalog.find((t) => t.id === params.id);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [, setLocation] = useLocation();

  if (!template) {
    return (
      <GalleryShell activeItem="overview" onNavigate={(id) => {
        if (id === "overview") {
          setLocation("/");
        } else {
          setLocation(`/templates/${id}`);
        }
      }}>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-graphite-muted mb-4">Template not found.</p>
          <Link href="/" className="text-instrument-green font-semibold hover:underline">
            Return to overview
          </Link>
        </div>
      </GalleryShell>
    );
  }

  const specimen = specimenMap[template.id];

  return (
    <GalleryShell activeItem={template.id as RailItemId} onNavigate={(id) => {
      if (id === "overview") {
        setLocation("/");
      } else {
        setLocation(`/templates/${id}`);
      }
    }}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-graphite hover:border-instrument-green hover:text-instrument-green transition-colors duration-180"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to overview
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-light border border-amber/20 px-2.5 py-0.5 text-xs font-semibold text-amber">
            <Tag size={12} aria-hidden="true" />
            Illustrative only
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors duration-180 ${
              showAnnotations
                ? "border-mineral-blue bg-mineral-blue-light text-mineral-blue"
                : "border-gray-300 bg-white text-graphite-muted hover:border-mineral-blue"
            }`}
            aria-pressed={showAnnotations}
          >
            <Maximize size={14} aria-hidden="true" />
            Annotations
          </button>
        </div>
      </div>

      <div className="mx-auto transition-all duration-220">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 bg-pale-stone border-b border-gray-200">
            <div>
              <h1 className="text-lg font-semibold text-graphite">{template.title}</h1>
              <p className="text-sm text-graphite-muted">{template.description}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-instrument-green/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#0B5D48" strokeWidth="2" />
                <path d="M12 6v12M6 12h12" stroke="#0B5D48" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="p-4 bg-pale-stone/50">
            {specimen}
            {showAnnotations && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {["KPI Grid", "Ranked Bar", "Trend Chart", "Heatmap / Table"].map((label) => (
                  <div key={label} className="rounded-md border border-dashed border-mineral-blue bg-mineral-blue-light/50 p-2 text-xs text-mineral-blue font-medium text-center">
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-graphite mb-2">Template Details</h3>
            <dl className="space-y-1 text-xs">
              <div className="flex justify-between">
                <dt className="text-graphite-muted">Category</dt>
                <dd className="font-medium text-graphite">{template.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-graphite-muted">Density</dt>
                <dd className="font-medium text-graphite capitalize">{template.density}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-graphite-muted">Aspect</dt>
                <dd className="font-medium text-graphite capitalize">{template.previewAspect}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-graphite mb-2">Chart Inventory</h3>
            <ul className="space-y-1 text-xs text-graphite-muted">
              {template.chartTypes.map((chart) => (
                <li key={chart} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-instrument-green" aria-hidden="true" />
                  {chart.replace(/-/g, " ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-graphite mb-2">Data Provenance</h3>
            <div className="flex items-start gap-2 text-xs text-graphite-muted">
              <Shield size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p>
                This dashboard is populated with deterministic synthetic data. No external data sources are
                queried, and no real customer information is displayed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GalleryShell>
  );
}
