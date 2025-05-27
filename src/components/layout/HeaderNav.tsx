/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "src/libs/utils";
import useSWR from "swr";

function HeaderNav() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const {
        data: user,
        error,
        isLoading: swrLoading,
    } = useSWR(`/user/user-profile`, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div className="navigation px-4 lg:px-8 xl:px-32 pb-2 bg-primary ">
            <div className="border-t-2 pt-2 border-gray-500"></div>
            <nav className="flex flex-row justify-start gap-10 items-center ">
                <Link
                    className={`text-white text-2xl font-bold hover:text-yellow-600 hover:underline ${
                        pathname === "/home" ? "text-yellow-400" : ""
                    }`}
                    href={"/home"}
                >
                    Trang chủ
                </Link>
                <Link
                    className={`text-white text-2xl font-bold hover:text-yellow-600 hover:underline ${
                        pathname === "/search" ? "text-yellow-400" : ""
                    }`}
                    href={"/search"}
                >
                    Tìm kiếm văn bản
                </Link>
                {user?.role === "lawyer" ? (
                    <Link
                        className={`text-white text-2xl font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/response" ? "text-yellow-400" : ""
                        }`}
                        href={"/response"}
                    >
                        Luật sư trả lời
                    </Link>
                ) : (
                    <Link
                        className={`text-white text-2xl font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/ask" ? "text-yellow-400" : ""
                        }`}
                        href={"/ask"}
                    >
                        Hỏi luật sư
                    </Link>
                )}

                <Link
                    className={`text-white text-2xl font-bold hover:text-yellow-600 hover:underline ${
                        pathname === "/about" ? "text-yellow-400" : ""
                    }`}
                    href={"/"}
                >
                    Giới thiệu
                </Link>
            </nav>
        </div>
    );
}

export default HeaderNav;
