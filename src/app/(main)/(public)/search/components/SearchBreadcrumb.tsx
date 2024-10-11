"use client";
import { useSearchParams } from "next/navigation";

function SearchBreadcrumb() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q") ?? "";

    return (
        <span className="px-4 pb-2 text-2xl flex flex-row gap-2 items-center text-center">
            <span className="text-gray-600 text-xl">
                Kết quả tìm kiếm cho:{" "}
            </span>
            <h4 className="font-semibold">{q}</h4>
        </span>
    );
}

export default SearchBreadcrumb;
