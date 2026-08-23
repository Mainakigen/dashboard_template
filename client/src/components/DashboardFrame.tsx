import type { ReactNode } from "react";

interface DashboardFrameProps {
  title: string;
  filters?: ReactNode;
  children: ReactNode;
  density?: "focused" | "balanced" | "dense";
}

export default function DashboardFrame({ title, filters, children, density = "balanced" }: DashboardFrameProps) {
  const densityClasses: Record<string, string> = {
    focused: "gap-5",
    balanced: "gap-5",
    dense: "gap-4",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex h-[58px] md:h-[64px] items-center justify-between bg-instrument-green px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-semibold text-white truncate">{title}</h2>
        <div className="flex items-center gap-3">
          {filters && <div className="hidden sm:flex items-center gap-2">{filters}</div>}
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="sr-only">Northstar abstract mark</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      {filters && (
        <div className="sm:hidden flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-pale-stone/50">
          {filters}
        </div>
      )}
      <div className={`p-4 md:p-6 bg-pale-stone/50 ${densityClasses[density]}`}>{children}</div>
    </div>
  );
}
