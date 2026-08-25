import { useState } from "react";
import { LayoutDashboard, BarChart3, DollarSign, Users, ChevronLeft, ChevronRight, Menu, Shield } from "lucide-react";

const railItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "marketing", label: "Marketing", icon: BarChart3 },
  { id: "commission", label: "Commission", icon: DollarSign },
  { id: "sales", label: "Sales", icon: LayoutDashboard },
  { id: "customer-analysis", label: "Customer", icon: Users },
] as const;

type RailItemId = (typeof railItems)[number]["id"];

interface GalleryShellProps {
  activeItem: RailItemId;
  onNavigate: (id: RailItemId) => void;
  children: React.ReactNode;
}

export default function GalleryShell({ activeItem, onNavigate, children }: GalleryShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-pale-stone">
      {/* Desktop rail */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-200 bg-white transition-all duration-200 ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
          {!collapsed && (
            <span className="font-serif text-lg font-semibold text-instrument-green truncate">
              Analytics Templates
            </span>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-graphite-muted hover:text-graphite hover:bg-gray-50"
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-1" aria-label="Primary">
          {railItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-180 ${
                  isActive
                    ? "bg-mineral-blue-light text-mineral-blue"
                    : "text-graphite-muted hover:text-graphite hover:bg-gray-50"
                } ${collapsed ? "justify-center px-2" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2 text-xs text-graphite-muted">
              <Shield size={14} aria-hidden="true" />
              <span>Safe synthetic data</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-56 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
              <span className="font-serif text-lg font-semibold text-instrument-green">Analytics Templates</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-md text-graphite-muted hover:text-graphite"
                aria-label="Close navigation"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <nav className="py-3 px-2 space-y-1" aria-label="Mobile primary">
              {railItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-mineral-blue-light text-mineral-blue"
                        : "text-graphite-muted hover:text-graphite hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between h-12 px-4 bg-white border-b border-gray-200 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-md text-graphite hover:bg-gray-50"
            aria-label="Open navigation"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="font-serif text-base font-semibold text-instrument-green">Analytics Templates</span>
          <div className="w-8" />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] p-5 md:p-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
