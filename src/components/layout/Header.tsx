//
"use client";
import { Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import type { GetProps } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { getUserProfile } from "src/app/(auth)/apis/user.api";
import { useEffect, useState } from "react";
import Image from "next/image";

import fb from "public/icon/facebook.svg";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

function Header() {
    const [user, setUser] = useState<User>();

    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);

    const handleSignOut = () => {
        // Call signOut to clear the session
        signOut({ callbackUrl: "/" }); // Redirect to the home page after signing out
    };

    useEffect(() => {
        getUserProfile().then((user) => {
            setUser(user);
        });
    }, []);

    return (
        <header>
            <div className="flex flex-row justify-between items-center px-8 2xl:px-32 py-8 bg-primary">
                <Link
                    className="logo text-white font-bold text-2xl"
                    href={"/home"}
                >
                    XinchaoVietNam
                </Link>
                <div className="search-bar flex flex-row gap-3">
                    <div className="w-1/2">
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            enterButton
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
        </header>
    );
}

export default Header;
