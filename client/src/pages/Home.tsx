import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import GalleryShell from "../components/GalleryShell";
import GalleryHeader from "../components/GalleryHeader";
import TemplateCard from "../components/TemplateCard";
import { templateCatalog } from "../lib/templateCatalog";

type RailItemId = "marketing" | "commission" | "sales" | "customer-analysis" | "overview";

export default function Home() {
  const [activeItem, setActiveItem] = useState<RailItemId>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const filteredTemplates = useMemo(() => {
    return templateCatalog.filter((t) => {
      return (
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const handleNavigate = (id: RailItemId) => {
    setActiveItem(id);
    if (id !== "overview") {
      setLocation(`/templates/${id}`);
    }
  };

  return (
    <GalleryShell activeItem={activeItem} onNavigate={handleNavigate}>
      <GalleryHeader
        title="Overview"
        description="Explore reconstructed dashboard patterns rendered with synthetic data."
        templateCount={filteredTemplates.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section aria-label="Dashboard templates" className="grid grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            aspect={template.previewAspect}
            onNavigate={handleNavigate}
          />
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
