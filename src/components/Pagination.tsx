import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#d6dae8] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#4A3FD8] text-[#475569] active:scale-95"
        style={{
          boxShadow: currentPage === 1 
            ? 'inset 4px 4px 8px #b0b8cc, inset -4px -4px 8px #ffffff'
            : '8px 8px 16px #b0b8cc, -8px -8px 16px #ffffff'
        }}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="px-6 py-3 rounded-2xl bg-[#d6dae8]" style={{ boxShadow: 'inset 6px 6px 12px #b0b8cc, inset -6px -6px 12px #ffffff' }}>
        <span className="text-[14px] font-bold text-[#1a1d2e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Page <span className="text-[#4A3FD8]">{currentPage}</span> of {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#d6dae8] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#4A3FD8] text-[#475569] active:scale-95"
        style={{
          boxShadow: currentPage === totalPages
            ? 'inset 4px 4px 8px #b0b8cc, inset -4px -4px 8px #ffffff'
            : '8px 8px 16px #b0b8cc, -8px -8px 16px #ffffff'
        }}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
