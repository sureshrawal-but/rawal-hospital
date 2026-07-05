'use client';

import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination({ totalItems, pageSize = 10, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  const totalPages = Math.ceil(totalItems / pageSizeState);

  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i = 0; i < range.length; i++) {
      if (l) {
        if (range[i] - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (range[i] - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(range[i]);
      l = range[i] as number;
    }

    return rangeWithDots;
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSizeState;
  const endIndex = Math.min(startIndex + pageSizeState, totalItems);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    pageSize: pageSizeState,
    startIndex,
    endIndex,
    totalItems,
    paginationRange,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
