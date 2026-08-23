interface DataTableProps {
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
}

export default function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-graphite mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs" aria-label={title}>
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th key={col.key} className="pb-2 pr-4 font-semibold text-graphite-muted whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className="py-2 pr-4 text-graphite whitespace-nowrap">
                    {String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
