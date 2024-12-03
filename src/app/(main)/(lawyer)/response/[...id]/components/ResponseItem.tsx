"use client";

import Image from "next/image";
import { formatDateToString } from "src/libs/utils";
import fb from "public/icons/icon-facebook.svg";

interface ResponseItemProps {
    response: any;
    name?: string;
    image?: string;
}

export const ResponseItem: React.FC<ResponseItemProps> = ({
    response,
    name,
    image,
}) => {
    return (
        <div className="flex flex-col gap-2 py-2 px-4cursor-pointer px-4">
            <div className="flex flex-row gap-4 items-center ">
                <Image
                    src={image ? image : fb}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full w-10 h-10"
                ></Image>
                <div className="flex flex-col gap-2">
                    <span className="hover:underline text-xl font-semibold text-primary truncate">
                        {name ? name : "Tài khoản người dùng"}
                    </span>
                    <span className="flex flex-row gap-2">
                        <strong>Thời gian:</strong>
                        <p>
                            {formatDateToString(new Date(response.createdAt))}
                        </p>
                    </span>
                </div>
            </div>
            <div className="">
                <p className="line-clamp-3 hover:line-clamp-none whitespace-pre-wrap">
                    {response.content}
                </p>
            </div>
            <div className="border-t-2 pt-2 border-gray-400"></div>
        </div>
    );
};
