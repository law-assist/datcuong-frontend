"use client";

import { CustomPageProps } from "src/interfaces";
import { fetcher } from "src/libs/utils";
import useSWR from "swr";
import LawHeader from "./LawHeader";
import LawDescription from "./LawDescription";
import LawContent from "./LawContent";
import LawFooter from "./LawFooter";
import LawExtend from "./LawExtend";

export default function ContentPage({ params }: CustomPageProps) {
    const { id } = params;

    const path: string = `/law/${id.toString()}`;

    const {
        data: law,
        error,
        isLoading: swrLoading,
    } = useSWR(path, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (swrLoading) {
        return <div>Vui lòng chờ...</div>;
    } else {
        if (!law || error) {
            return (
                <div className="p-4 italic">Không tìm thấy văn bản luật</div>
            );
        }
    }

    return (
        <div
            className="my-2 flex mx-auto items-center justify-center w-full"
            id={id}
        >
            <div className=" h-screen w-full overflow-scroll">
                <div className="p-4 bg-white flex flex-col gap-4 law-content max-w-[800px] m-auto border-2 border-gray-400 rounded">
                    <LawHeader header={law.content.header} />
                    <LawDescription description={law.content.description} />
                    <LawContent content={law.content.mainContent} />
                    <LawFooter footer={law.content.footer} />
                    <LawExtend content={law.content.extend} />
                </div>
            </div>
        </div>
    );
}
