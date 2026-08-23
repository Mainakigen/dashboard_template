interface CohortHeatmapProps {
  title: string;
  data: { month: string; retention: number }[];
}

export default function CohortHeatmap({ title, data }: CohortHeatmapProps) {
  const max = Math.max(...data.map((d) => d.retention));

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-graphite mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs" aria-label={title}>
          <thead>
            <tr>
              <th className="pb-2 pr-3 font-semibold text-graphite-muted">Month</th>
              {data.map((d) => (
                <th key={d.month} className="pb-2 px-2 font-semibold text-graphite-muted text-center min-w-[3.5rem]">
                  {d.month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.month}>
                <td className="py-2 pr-3 font-medium text-graphite whitespace-nowrap">{row.month}</td>
                {data.map((cell) => {
                  const isCurrent = cell.month === row.month;
                  const isFuture = data.indexOf(cell) < idx;
                  const retention = isCurrent ? 100 : isFuture ? 0 : cell.retention;
                  const intensity = isFuture ? 0 : retention / max;
                  return (
                    <td
                      key={cell.month}
                      className={`py-2 px-2 text-center rounded-sm ${
                        isCurrent
                          ? "bg-instrument-green text-white font-semibold"
                          : isFuture
                            ? "bg-gray-100 text-graphite-muted"
                            : "bg-instrument-green/80 text-white"
                      }`}
                      style={isCurrent || isFuture ? undefined : { opacity: 0.4 + intensity * 0.6 }}
                    >
                      {isFuture ? "—" : `${retention}%`}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[10px] text-graphite-muted">
        Retention decreases from the first month (100%) across subsequent cohorts.
      </p>
    </div>
  );
}
