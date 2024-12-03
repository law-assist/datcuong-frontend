"use client";
import React from "react";
import { Pagination, PaginationProps } from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "src/libs/utils";
import { AskItem } from "src/app/(main)/(user)/ask/components/AskItem";

// interface PageProps {
//     requests?: any;
// }

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") ?? "1";
    const size = 5;

    const onPageChange: PaginationProps["onChange"] = (pageNumber: number) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("page", pageNumber.toString());

        router.push(`${pathname}?${currentParams.toString()}` as any, {
            scroll: false,
        });
    };

    const params = new URLSearchParams({
        page,
        size: size.toString(),
    });

    const {
        data: response,
        error,
        isLoading: swrLoading,
    } = useSWR(
        `/request/lawyer?${params.toString()}`,
        (url: string) => fetcher(url),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (error) {
        return <div>Đã có lỗi xảy ra</div>;
    }


    if (swrLoading) {
        return (
            <div>
                <p className="italic text-primary p-4">Vui lòng chờ ....</p>
            </div>
        );
    }

    if (!response) {
        return null;
    }

    return (
        <div className="mt-4 xl:pt-8 bg-white p-4 rounded-xl shadow-lg flex flex-col">
            <h4 className="text-primary border-l-4 border-primary px-4">
                Danh sách tư vấn
            </h4>
            <div className="flex-grow overflow-y-visible-scroll">
                {response.data &&
                    response.data.map((item: any, index: number) => (
                        <AskItem request={item} key={index}></AskItem>
                    ))}
            </div>
            <div className="mt-8 px-4">
                <Pagination
                    defaultCurrent={page ? Number(page) : 1}
                    total={response.total}
                    showSizeChanger={false}
                    pageSize={size}
                    align="end"
                    onChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Page;
