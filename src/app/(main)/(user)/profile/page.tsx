//
"use client";
import Image from "next/image";
import React from "react";

// import fb from "public/icon/facebook.svg";

import Profile from "./ProfileForm";
import useSWR from "swr";
import { fetcher } from "src/libs/utils";
import { redirect } from "next/navigation";

function Page() {
    // const user: User | undefined = getUserProfile();

    const {
        data: response,
        error,
        isLoading: swrLoading,
    } = useSWR(`/user/user-profile`, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        redirect("/home");
    }

    if (swrLoading) {
        return (
            <div>
                <p className="italic text-primary p-4">Vui lòng chờ ....</p>
            </div>
        );
    }

    return (
        <div className=" bg-violet-100 h-full flex flex-col items-center gap-2 py-4 mt-2 rounded-xl">
            <span className="text-2xl font-semibold w-3/4 lg:w-2/3 xl:w-1/2">
                Tài khoản của bạn
            </span>

            <div className="flex flex-row gap-4 w-3/4 lg:w-2/3 xl:w-1/2 m-auto bg-white px-8 py-4 ">
                <Image
                    src={response?.avatarUrl || "/icon/facebook.svg"}
                    alt="user"
                    width={100}
                    height={100}
                    layout="fixed"
                    className="rounded-full w-24 h-24"
                />
                <div className="flex flex-col gap-4">
                    <p>
                        Bạn đang là <strong>Thành viền</strong> của{" "}
                        <strong>XinchaoVietNam</strong>
                    </p>

                    <p>
                        Bạn sẽ được trải nghiệm các dịch vụ{" "}
                        <strong>Tiện ích văn bản</strong> của chúng tôi hoàn
                        toàn miễn phí
                    </p>
                </div>
            </div>

            {response && <Profile user={response} />}
        </div>
    );
}

export default Page;
