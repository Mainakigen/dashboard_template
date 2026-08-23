import { Shield } from "lucide-react";

interface GalleryHeaderProps {
  title: string;
  description: string;
  templateCount: number;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = ["All", "Marketing", "Finance", "Sales", "Analytics"];

export default function GalleryHeader({
  title,
  description,
  templateCount,
  categoryFilter,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: GalleryHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="font-serif text-4xl md:text-5xl font-semibold text-graphite tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-base md:text-lg text-graphite-muted max-w-2xl mb-4">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs font-medium text-graphite-muted bg-white border border-gray-200 rounded-md px-3 py-2 w-fit">
        <Shield size={14} aria-hidden="true" />
        <span>
          Illustrative dashboards built with generated data. No source customers, identifiers, logos, or
          production metrics are shown.
        </span>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-sm text-graphite-muted">
          <span className="font-semibold text-graphite">{templateCount}</span> templates available
        </p>
        <div className="flex gap-2 flex-wrap">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates…"
            className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm placeholder:text-graphite-muted focus:outline-none focus:ring-2 focus:ring-mineral-blue focus:border-transparent"
            aria-label="Search templates"
          />
          <div className="flex gap-1" role="group" aria-label="Category filter">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`h-9 px-3 rounded-md text-sm font-medium transition-colors duration-180 border ${
                  categoryFilter === cat
                    ? "bg-instrument-green text-white border-instrument-green"
                    : "bg-white text-graphite-muted border-gray-300 hover:border-instrument-green hover:text-instrument-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
