"use client";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-sm text-text-muted">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm rounded-lg border border-border bg-surface text-text disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-subtle transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm rounded-lg border border-border bg-surface text-text disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-subtle transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
