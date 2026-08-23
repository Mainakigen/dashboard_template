import { useState, useMemo } from "react";
import GalleryShell from "../components/GalleryShell";
import GalleryHeader from "../components/GalleryHeader";
import TemplateCard from "../components/TemplateCard";
import { templateCatalog } from "../lib/templateCatalog";

type RailItemId = "marketing" | "commission" | "sales" | "customer" | "gallery";

export default function Home() {
  const [activeItem, setActiveItem] = useState<RailItemId>("gallery");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return templateCatalog.filter((t) => {
      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
      const matchesSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleNavigate = (id: RailItemId) => {
    setActiveItem(id);
    if (id !== "gallery") {
      window.location.href = `/templates/${id}`;
    }
  };

  return (
    <GalleryShell activeItem={activeItem} onNavigate={handleNavigate}>
      <GalleryHeader
        title="Template Gallery"
        description="Explore reconstructed dashboard patterns rendered with synthetic data."
        templateCount={filteredTemplates.length}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section aria-label="Dashboard templates" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, idx) => (
          <div key={template.id} className={idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
            <TemplateCard template={template} aspect={template.previewAspect} />
          </div>
        ))}
      </section>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-graphite-muted py-12">No templates match your filters.</p>
      )}

      <footer className="mt-10 border-t border-gray-200 pt-6">
        <p className="text-xs text-graphite-muted text-center max-w-2xl mx-auto">
          These previews are reconstructed patterns, not production data exports. All values are generated
          for demonstration purposes. No real customer records, financial data, or proprietary metrics are
          displayed.
        </p>
      </footer>
    </GalleryShell>
  );
}
