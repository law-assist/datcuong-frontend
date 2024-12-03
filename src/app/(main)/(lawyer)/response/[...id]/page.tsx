/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { REQUEST_STATUS_MAPPING } from "src/constants/constant";
import { fetcher, formatDateToString } from "src/libs/utils";
import useSWR from "swr";
import ResponseFrom from "./components/ResponseFrom";
import { ResponseItem } from "./components/ResponseItem";
import { CustomPageProps } from "src/interfaces";

const Page: React.FC<CustomPageProps> = ({ params: params }) => {
    const { id } = params;

    const path: string = `/request/lawyer/${id.toString()}`;

    const {
        data: request,
        error,
        isLoading: swrLoading,
    } = useSWR(path, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (swrLoading) {
        return <div className="py-4 text-primary italic">Vui lòng chờ...</div>;
    } else {
        if (!request) {
            return <div className="p-4 italic">Không tìm thấy yêu cầu</div>;
        } else {
        }
    }

    const color =
        request.status === "pending"
            ? "text-yellow-500"
            : request.status === "starting"
            ? "text-green-500"
            : request.status === "reject"
            ? "text-red-500"
            : "text-blue-500";

    return (
        <div className="py-4">
            <ul className="flex flex-row gap-4">
                <li>
                    <strong>Trạng thái</strong>
                    <p
                        className={`${color} hover:underline hover:cursor-pointer`}
                    >
                        {REQUEST_STATUS_MAPPING[request.status]}
                    </p>
                </li>
                <li>
                    <strong>Lĩnh vực</strong>
                    <p className="hover:underline hover:cursor-pointer">
                        {request.field ? request.field : "Không xác định"}
                    </p>
                </li>
                <li>
                    <strong>Thời gian</strong>
                    <p>{formatDateToString(new Date(request.createdAt))}</p>
                </li>
            </ul>
            <div className="flex flex-col p-2">
                <h4 className="text-primary hover:underline">
                    {request.title}
                </h4>
                <p className="overflow-hidden line-clamp-3 hover:line-clamp-none whitespace-pre-wrap">
                    {request.content}
                </p>
                <div className="border-t-2 pt-2 border-gray-500"></div>
            </div>

            {request.responseMessage && (
                <div>
                    {request.responseMessage.map((item: any, index: number) => (
                        <ResponseItem
                            key={index}
                            response={item}
                            name={request?.userResponse?.fullName}
                            image={request?.userResponse?.avatarUrl}
                        />
                    ))}
                </div>
            )}

            <ResponseFrom id={id}></ResponseFrom>
        </div>
    );
};

export default Page;
