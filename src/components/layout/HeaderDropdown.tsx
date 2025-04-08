"use client";
import React from "react";
import {
    ProfileOutlined,
    SmileOutlined,
    UserOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface HeaderDropdownProps {
    user: any;
}

const removeTokens = () => {
    document.cookie = "access_token=; Max-Age=0; path=/";
    document.cookie = "refresh_token=; Max-Age=0; path=/";
};

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ user }) => {
    const handleSignOut = () => {
        removeTokens();
        signOut({ callbackUrl: "/login" });
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Link href="/profile" className="hover:underline">
                    Thông tin người dùng
                </Link>
            ),
            icon: (
                <ProfileOutlined
                    style={{ fontSize: "18px", color: "#1890ff" }}
                />
            ),
        },
        {
            key: "2",
            disabled: !(user?.role === "admin"),
            label: (
                <Link href="/admin" className="hover:underline">
                    Quản trị viên
                </Link>
            ),
            icon: (
                <SmileOutlined style={{ fontSize: "18px", color: "#52c41a" }} />
            ),
        },
        {
            key: "3",
            label: (
                <button
                    className="hover:underline"
                    onClick={handleSignOut}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#f5222d",
                        cursor: "pointer",
                    }}
                >
                    Đăng xuất
                </button>
            ),
            icon: (
                <UserSwitchOutlined
                    style={{ fontSize: "18px", color: "#f5222d" }}
                />
            ),
        },
    ];

    return (
        <Space>
            <Dropdown
                menu={{
                    items,
                    style: {
                        minWidth: "200px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                }}
            >
                <Link href="/profile">
                    <span className="flex flex-row gap-2 items-center text-center">
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "semiBold",
                                color: "#fff",
                            }}
                            className="line-clamp-1"
                        >
                            {user ? user.name : "User"}
                        </p>
                        <UserOutlined
                            style={{ fontSize: "20px", color: "#fff" }}
                        />
                    </span>
                </Link>
            </Dropdown>
        </Space>
    );
};

export default HeaderDropdown;
