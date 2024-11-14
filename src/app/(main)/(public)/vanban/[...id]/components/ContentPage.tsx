"use client";

import { CustomPageProps } from "src/interfaces";
import { fetcher } from "src/libs/utils";
import useSWR from "swr";
import LawHeader from "./LawHeader";
import LawDescription from "./LawDescription";
import LawContent from "./LawContent";
import LawFooter from "./LawFooter";

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
        console.log(law);
    }

    return (
        <div className="my-2 flex mx-auto items-center justify-center">
            <div className="w-[520px] lg:w-[800px] max-h-screen text-[12px] p-4 bg-white flex flex-col gap-4 border-2 border-gray-500 rounded overflow-scroll">
                <LawHeader header={law.content.header} />
                <LawDescription description={law.content.description} />
                <LawContent content={law.content.mainContent} />
                <LawFooter footer={law.content.footer} />
            </div>
        </div>
    );
}
