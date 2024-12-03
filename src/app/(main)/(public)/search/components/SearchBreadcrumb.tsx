"use client";
import { useSearchParams } from "next/navigation";

function SearchBreadcrumb() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") ?? "";

    return (
        <span className="px-4 pb-2 text-2xl flex flex-row gap-2 items-center text-center">
            <span className="text-gray-600 text-lg line-clamp-1 hover:line-clamp-none">
                Kết quả tìm kiếm cho:{" "}
            </span>
            <p className="font-semibold text-sm">{q}</p>
        </span>
    );
}

export default SearchBreadcrumb;
