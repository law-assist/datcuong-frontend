//

import Image from "next/image";
import React from "react";

// import fb from "public/icon/facebook.svg";

import Profile from "./ProfileForm";
import { getUserProfile } from "src/app/(auth)/apis/user.api";

async function Page() {
    const user: User | undefined = await getUserProfile();


    return (
        <div className=" bg-violet-100 h-full flex flex-col items-center gap-4 py-4 xl:py-8 2xl:py-10">
            <span className="text-2xl font-semibold w-3/4 lg:w-2/3 xl:w-1/2">
                Tài khoản của bạn
            </span>

            <div className="flex flex-row gap-4 w-3/4 lg:w-2/3 xl:w-1/2 m-auto bg-white px-8 py-4 ">
                <Image
                    src={user?.avatarUrl || "/icon/facebook.svg"}
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

            {user && <Profile user={user} />}
        </div>
    );
}

export default Page;
