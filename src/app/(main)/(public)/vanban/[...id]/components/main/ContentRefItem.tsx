/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect } from "react";
import Link from "next/link";
import { fetcher } from "src/libs/utils";
import useSWR from "swr";
import $ from "jquery";

import Diem from "./Diem";
import Khoan from "./Khoan";
import Muc from "./Muc";
import TieuMuc from "./TieuMuc";
import Dieu from "./Dieu";
import Chuong from "./Chuong";
import Phan from "./Phan";
import Content from "./Content";
import { CLASSIFICATION_MAPPING } from "src/constants/constant";

interface Props {
    reference: any;
}

const RefRender = (reference: any) => {
    const content = reference.reference;
    const name: string = content.name ?? "";
    if (name.includes("phan")) return <Phan content={content} isRef={false} />;

    if (name.includes("chuong"))
        return <Chuong content={content} isRef={false} />;

    // if (name.includes("muc")) return <Muc content={parent} />;

    // if (name.includes("tieuMuc")) return <TieuMuc content={parent} />;

    if (name.includes("dieu")) return <Dieu content={content} isRef={false} />;

    if (name.includes("tieumuc"))
        return <TieuMuc content={content} isRef={false} />;

    if (name.includes("muc")) return <Muc content={content} isRef={false} />;

    if (name.includes("diem"))
        return <Diem content={content} parent={content} isRef={false} />;

    if (name.includes("khoan"))
        return <Khoan content={content} parent={content} isRef={false} />;

    return <Content content={content} parent={content} isRef={false} />;
};

const ContentRefItem: React.FC<Props> = ({ reference }) => {
    const params = new URLSearchParams({
        LawRef: reference.LawRef,
        lawId: reference.lawId,
        index: reference.index,
        classification: reference.classification,
        type: reference.type,
    });
    const {
        data: response,
        error,
        isLoading: swrLoading,
    } = useSWR(
        `/law/search-ref?${params.toString()}`,
        (url: string) => fetcher(url),
        {
            revalidateIfStale: false,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    if (error) {
        return (
            <p className="italic text-red-500 p-4">
                Xảy ra lỗi, vui lòng thử lại sau ...
            </p>
        );
    }

    if (swrLoading) {
        return (
            <p className="italic text-primary p-4">
                Vui lòng chờ trong giây lát ...
            </p>
        );
    }

    if (!response) {
        return (
            <p className="italic text-red-500 p-4">
                Không tìm thấy thông tin ...
            </p>
        );
    } else {
        // $(document).ready(function () {
        //     const lines = $("#reference").find("p");
        //     lines.each(function () {
        //         if ($(this).text().trim() === response.content.value.trim()) {
        //             $(this).addClass(
        //                 "bg-yellow-200 p-1 -mx-1 lg:p-2 lg:-mx-2 rounded hover:underline italic"
        //             );
        //         }
        //     });
        // });
    }

    // useEffect(() => {
    //     // Your jQuery code here
    //     $(document).ready(function () {
    //         const lines = $("#reference").find("p");
    //         lines.each(function () {
    //             if ($(this).text().trim() === response.content.value.trim()) {
    //                 $(this).addClass(
    //                     "bg-yellow-200 p-1 -mx-1 lg:p-2 lg:-mx-2 rounded hover:underline italic"
    //                 );
    //             }
    //         });
    //     });
    // }, [response]);

    let classify = "Tham khảo";
    if (CLASSIFICATION_MAPPING[response.classification] !== undefined) {
        classify = CLASSIFICATION_MAPPING[response.classification];
    }
    console.log(classify, reference);
    // if (response.type === "referring") {
    //     classify = "Tham chiếu";
    // }

    return (
        <div className="rounded border border-gray-400 p-4 flex flex-col gap-2 w-full flex-grow">
            <Link href={`/vanban/${response._id}` as any}>{response.name}</Link>
            <span>
                <strong>Loại tham chiếu: </strong>
                {/* {CLASSIFICATION_MAPPING[response.classification] !== undefined
                    ? CLASSIFICATION_MAPPING[response.classification]
                    : "Trích đẫn"} */}
                {classify}
            </span>
            <div id="reference">
                {response.ref && <RefRender reference={response.ref} />}
            </div>
        </div>
    );
};

export default ContentRefItem;
