import React from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  noDataText?: string;
  renderActions?: (row: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  noDataText = "No data found.",
  renderActions,
}: DataTableProps<T>) {
  const colCount = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-3 py-2 font-medium text-gray-700 text-center ${
                  col.className ?? ""
                }`}
              >
                {col.header}
              </th>
            ))}
            {renderActions && (
              <th className="px-3 py-2 font-medium text-gray-700 text-center">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={colCount} className="text-center py-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={colCount} className="text-center py-6 text-gray-500">
                {noDataText}
              </td>
            </tr>
          ) : (
            data.map((row, ri) => (
              <tr key={ri} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, ci) => (
                  <td key={ci} className="px-3 py-2 text-center">
                    {col.render
                      ? col.render(row)
                      : // @ts-ignore
                        String(row[col.accessor!])}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-3 py-2 text-center space-x-2">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
