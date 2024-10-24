/* eslint-disable @typescript-eslint/no-unused-vars */
//
"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { GetProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

import { getUserProfile } from "src/app/(auth)/apis/user.api";
import fb from "public/icon/facebook.svg";
import { removeTokens } from "src/app/api/client";
// import { handleSignOut } from "src/app/(auth)/apis/auth.api";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

function Header() {
    const [user, setUser] = useState<User>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [text, setText] = useState(searchParams.get("q") ?? "");

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        router.push(`/search?q=${value.trim()}` as any);
    };

    const handleSignOut = () => {
        removeTokens();
        signOut({ callbackUrl: "/" });
    };

    useEffect(() => {
        getUserProfile().then((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (pathname !== "/search") {
            setText("");
        }
    }, [pathname]);

    return (
        <header>
            <div className="flex flex-row justify-between items-center px-8 2xl:px-32 py-4 bg-primary">
                <Link
                    className="logo text-white font-bold text-2xl"
                    href={"/home"}
                >
                    XinchaoVietNam
                </Link>
                <div className="search-bar flex flex-row gap-3 ">
                    <div className="w-1/2">
                        <Search
                            className="grid h-10 w-1/2 items-center"
                            placeholder="Tìm kiếm..."
                            enterButton
                            onSearch={onSearch}
                            value={text}
                            defaultValue={searchParams.get("q") ?? ""}
                            onChange={(e) => setText(e.target.value)}
                            id="search-bar"
                        />
                    </div>
                    <div className="account flex flex-row gap-3 items-center">
                        <div className="avatar">
                            <Image
                                src={user?.avatarUrl || fb}
                                alt="avatar"
                                width={32}
                                height={32}
                                className="rounded-full w-8 h-8"
                            />
                        </div>
                        <Link className="text-white truncate" href={"/profile"}>
                            {user?.fullName || "Tài khoản"}
                        </Link>
                        <button
                            className="hover:border"
                            onClick={handleSignOut}
                        >
                            <CaretDownOutlined
                                style={{
                                    color: "white",
                                    padding: "0.25rem",
                                }}
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className="navigation px-8 2xl:px-32 pb-4 bg-primary ">
                <div className="border-t-2 pt-4"></div>
                <nav className="flex flex-row justify-start gap-3 items-center ">
                    <Link
                        className={`text-white font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/home" ? "text-yellow-400" : ""
                        }`}
                        href={"/home"}
                    >
                        Trang chủ
                    </Link>
                    <Link
                        className={`text-white font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/search" ? "text-yellow-400" : ""
                        }`}
                        href={"/search"}
                    >
                        Tìm kiếm văn bản
                    </Link>
                    <Link
                        className={`text-white font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/ask" ? "text-yellow-400" : ""
                        }`}
                        href={"/ask"}
                    >
                        Hỏi luật sư
                    </Link>
                    <Link
                        className={`text-white font-bold hover:text-yellow-600 hover:underline ${
                            pathname === "/about" ? "text-yellow-400" : ""
                        }`}
                        href={"/"}
                    >
                        Giới thiệu
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
