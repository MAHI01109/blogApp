
import React from 'react';
import { HiMiniArrowLongRight, HiMiniArrowLongLeft } from "react-icons/hi2";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex max-w-5xl items-center justify-between gap-6 mt-10 text-sm sm:text-base">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded border-gray-300"
            >
                <span className="sr-only">Previous</span><HiMiniArrowLongLeft />
            </button>

            <span className="font-medium text-gray-400">
                Page <span className="text-blue-600 font-bold">{currentPage}</span> of <span className="text-blue-600 font-bold">{totalPages}</span>
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
               
            >
                <HiMiniArrowLongRight />
            </button>
        </div>
    );
};

export default Pagination;

