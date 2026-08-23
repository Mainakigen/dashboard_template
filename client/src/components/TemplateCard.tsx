import { Link } from "wouter";
import { Eye } from "lucide-react";
import type { TemplateCatalogItem } from "../lib/templateCatalog";

interface TemplateCardProps {
  template: TemplateCatalogItem;
  aspect?: "wide" | "tall";
}

export default function TemplateCard({ template, aspect = "wide" }: TemplateCardProps) {
  return (
    <article className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-180 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-mineral-blue focus-within:ring-offset-2">
      <div
        className={`relative overflow-hidden bg-pale-stone ${
          aspect === "tall" ? "aspect-[3/4]" : "aspect-[16/10]"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-2xl font-semibold text-instrument-green/80">
            {template.shortTitle}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-180" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-base font-semibold text-graphite">{template.title}</h3>
            <p className="text-sm text-graphite-muted mt-1">{template.description}</p>
          </div>
        </div>
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-pale-stone px-2.5 py-0.5 text-xs font-medium text-graphite-muted capitalize">
            {template.density}
          </span>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-pale-stone px-2.5 py-0.5 text-xs font-medium text-graphite-muted capitalize">
            {template.previewAspect}
          </span>
          <Link href={`/templates/${template.id}`}>
            <span
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.location.href = `/templates/${template.id}`;
                }
              }}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-instrument-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-instrument-green/90 focus:outline-none focus:ring-2 focus:ring-mineral-blue focus:ring-offset-2 transition-colors duration-180"
            >
              <Eye size={14} aria-hidden="true" />
              Inspect
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
