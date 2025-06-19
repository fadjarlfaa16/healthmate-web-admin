interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md text-sm ${
            p === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
}
