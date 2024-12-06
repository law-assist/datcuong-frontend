/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal, notification, Typography } from "antd";
import { useEffect, useState } from "react";

import $ from "jquery";

import Phan from "./Phan";
import Chuong from "./Chuong";
import Muc from "./Muc";
import TieuMuc from "./TieuMuc";
import Dieu from "./Dieu";
import ContentRefList from "./ContentRefList";
import Content from "./Content";

interface Props {
    onClose: () => void;
    content: any;
    parent: any;
}

const { Title } = Typography;

const ParentRender = (parent: any) => {
    const content = parent.parent;
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

    return <Content content={content} parent={content} isRef={false} />;
};

const ContentRef: React.FC<Props> = ({ onClose, content, parent }) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        // Your jQuery code here
        $(document).ready(function () {
            const lines = $("#parent").find("p");
            lines.each(function () {
                if ($(this).text().trim() === content.value.trim()) {
                    $(this).addClass(
                        "bg-yellow-200 p-1 -mx-1 lg:p-2 lg:-mx-2 rounded hover:underline italic"
                    );
                }
            });
        });
    }, [content.value]);

    return (
        <div className="flex flex-col gap-2 relative h-full w-full min-h-[520px]">
            <span
                className="closeBtn absolute right-0 top-0 w-8 h-8 text-center hover:cursor-pointer border rounded-full border-blue-500"
                onClick={onClose}
            >
                <CloseOutlined
                    style={{
                        fontSize: "24px",
                        // width: "24px",
                        // height: "24px",
                        color: "#08c",
                    }}
                    className="text-2xl hover-spin"
                />
            </span>
            {contextHolder}

            <Title
                level={4}
                className="flex items-center justify-center !text-primary"
            >
                Tham chiếu văn bản
            </Title>

            <div className="grid grid-cols-2 flex-grow">
                <div className="border-r border-gray-900 p-4 flex flex-col items-center gap-2">
                    <span className="body-2 font-semibold !text-primary italic">
                        Nội dung văn bản đang xem
                    </span>
                    <div id="parent">
                        <ParentRender parent={parent} />
                    </div>
                </div>
                <div className="border-l border-gray-900 p-4 flex flex-col items-center gap-2">
                    <span className="body-2 font-semibold !text-primary italic">
                        Nội dung Trích dẫn/Hướng dẫn/Thay thế/Sửa đổi/Bổ sung
                    </span>
                    <div></div>
                    <div>
                        <ContentRefList content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentRef;
