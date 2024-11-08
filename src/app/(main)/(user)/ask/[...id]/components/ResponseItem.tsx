"use client";

import Image from "next/image";
import { formatDateToString } from "src/libs/utils";
import fb from "public/icon/icon-facebook.svg";
import { useSession } from "next-auth/react";

interface ResponseItemProps {
    response: any;
}

export const ResponseItem: React.FC<ResponseItemProps> = ({ response }) => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-2 py-2 px-4cursor-pointer px-4">
            <div className="flex flex-row gap-4 items-center ">
                <Image
                    src={session?.user.image ? session?.user.image : fb}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full w-10 h-10"
                ></Image>
                <div className="flex flex-col gap-2">
                    <span className="hover:underline text-xl font-semibold text-primary truncate">
                        {session?.user.name
                            ? session?.user.name
                            : "Tài khoản người dùng"}
                    </span>
                    <span className="flex flex-row gap-2">
                        <strong>Thời gian:</strong>
                        <p>
                            {formatDateToString(new Date(response.createdAt))}
                        </p>
                    </span>
                </div>
            </div>
            <div className="flex flex-row gap-4 text-center">
                <span className="flex flex-col gap-2">
                    <p>{response.content}</p>
                </span>
            </div>
            <div className="border-t-2 pt-2 border-gray-400"></div>
        </div>
    );
};
