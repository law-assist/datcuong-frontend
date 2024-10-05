//
"use client";
import { Input } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

function Header() {
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);

    return (
        <header>
            <div className="flex flex-row justify-between items-center px-8 2xl:px-32 py-8 bg-primary">
                <p className="logo text-white font-bold text-2xl">
                    XinchaoVietNam
                </p>
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
                            <img
                                src="https://via.placeholder.com/150"
                                alt="avatar"
                                className="rounded-full w-8 h-8"
                            />
                        </div>
                        <p className="text-white">Tài khoản</p>
                        <CaretDownOutlined
                            style={{
                                color: "white",
                                padding: "0.25rem",
                            }}
                            width={32}
                            height={32}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
