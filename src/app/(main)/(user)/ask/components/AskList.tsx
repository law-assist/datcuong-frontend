"use client";
import React from "react";
import { Pagination, PaginationProps } from "antd";

import { AskItem } from "./AskItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AskListProps {
    requests: any;
}

const AskList: React.FC<AskListProps> = ({ requests }) => {
    console.log(requests);
    const { data, total = 0 } = requests;
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

    return (
        <div className="mt-4 xl:pt-8 bg-white p-4 rounded-xl shadow-lg">
            <h4 className="text-primary border-l-4 border-primary px-4">
                Danh sách câu hỏi của bạn
            </h4>
            <div>
                {data &&
                    data.map((item: any, index: number) => (
                        <AskItem request={item} key={index}></AskItem>
                    ))}
            </div>
            <div className="mt-8 px-8">
                <Pagination
                    defaultCurrent={page ? Number(page) : 1}
                    total={total}
                    showSizeChanger={false}
                    pageSize={size}
                    align="end"
                    onChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default AskList;
