/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { cookies } from "next/headers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationProps } from "antd";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "src/libs/utils";
import { SearchItem } from "src/app/(main)/(public)/search/components/SearchItem";
import { DeleteOutlined } from "@ant-design/icons";
import Loading from "src/app/loading";
import { getSession } from "next-auth/react";

const LawManagement = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const q = searchParams.get("q") ?? "";
    const field = searchParams.get("field") ?? "";
    const category = searchParams.get("category") ?? "";
    const department = searchParams.get("department") ?? "";
    const page = searchParams.get("page") ?? "1";
    const year = searchParams.get("year") ?? "";

    const [size, setSize] = useState(10);

    const query = {
        name: q.trim(),
        field,
        category,
        department,
        year,
    };

    const params = new URLSearchParams({
        name: q,
        field,
        category,
        department,
        year,
        page,
        size: size.toString(),
    });

    const {
        data: response,
        error,
        isLoading: swrLoading,
    } = useSWR(
        `/law/search?${params.toString()}`,
        (url: string) => fetcher(url),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const onPageChange: PaginationProps["onChange"] = (pageNumber: number) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("page", pageNumber.toString());

        router.push(`${pathname}?${currentParams.toString()}` as any, {
            scroll: false,
        });
    };

    if (swrLoading) {
        return (
            <p className="italic text-primary p-4">
                Đang tìm kiếm. Vui lòng chờ trong giây lát
            </p>
        );
    }

    if (!response || error || response.laws.length === 0) {
        return (
            <p className="italic text-primary p-4">
                Không tìm thấy kết quả phù hợp
            </p>
        );
    }

    const onDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa văn bản này không?")) return;

        try {
            const session = await getSession();
            const accessToken = session?.user?.accessToken;
            console.log(session);

            if (!accessToken) {
                alert("Phiên đăng nhập đã hết hạn.");
            return;
            }

            const res = await fetch(`http://localhost:5000/law/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            mutate(`/law/search?${params.toString()}`);
        } catch (error) {
            console.error("Error deleting law:", error);
            alert("Đã xảy ra lỗi khi xóa văn bản");
        }
    };


    return (
        <div className="p-4">
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 flex-grow">
                {response.laws.map((law: any) => (
                <div
                    key={law.id}
                    className="flex items-center justify-between bg-white shadow-sm p-4 rounded-md"
                >
                    <SearchItem law={law} />
                    <button
                        onClick={() => onDelete(law._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        aria-label="Delete"
                        >
                        <DeleteOutlined className="text-xl" />
                    </button>
                </div>
                ))}
            </div>
            <div className="mt-4 px-4">
                <Pagination
                defaultCurrent={page ? Number(page) : 1}
                total={response ? response.total : 0}
                showSizeChanger={false}
                pageSize={size}
                align="end"
                onChange={onPageChange}
                />
            </div>
        </div>
        </div>
    );
};
export default LawManagement;
