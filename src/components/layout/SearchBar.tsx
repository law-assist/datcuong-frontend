/* eslint-disable @typescript-eslint/no-unused-vars */
//
"use client";
import { Input, GetProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const q = searchParams.get("q") ?? "";

    const [text, setText] = useState(searchParams.get("q") ?? "");

    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        router.push(`/search?q=${value.trim()}` as any);
    };

    useEffect(() => {
        if (pathname !== "/search") {
            setText("");
        }
    }, [pathname]);

    useEffect(() => {
        setText(q);
    }, [q]);


    return (
        <Search
            className="items-center"
            style={{ width: "100%" }}
            placeholder="Tìm kiếm..."
            enterButton
            onSearch={onSearch}
            value={text}
            defaultValue={searchParams.get("q") ?? ""}
            onChange={(e) => setText(e.target.value)}
            id="search-bar"
        />
    );
}

export default SearchBar;
