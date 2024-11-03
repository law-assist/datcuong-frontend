/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import fb from "public/icon/facebook.svg";
import SearchBar from "./SearchBar";
import HeaderNav from "./HeaderNav";
import { handleSignOut } from "src/app/(auth)/apis/auth.api";
import { getServerSession } from "next-auth";
import HeaderDropdown from "./HeaderDropdown";

async function Header() {
    const session = await getServerSession();
    // const {
    //     data: user,
    //     error,
    //     isLoading: swrLoading,
    // } = useSWR(`/user/user-profile`, (url: string) => fetcher(url), {
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false,
    // });

    return (
        <header>
            <div className="flex flex-row gap-2 justify-between items-center px-8 2xl:px-32 py-2 bg-primary">
                <Link
                    className="logo text-white font-bold text-2xl"
                    href={"/home"}
                >
                    <p className="hidden lg:block">XinchaoVietNam</p>
                    <p className="block lg:hidden">XCVN</p>
                </Link>
                <div className="search-bar grid grid-cols-3 gap-3 ">
                    <div className="col-span-2">
                        <SearchBar />
                    </div>
                    <div className="account flex flex-row gap-3 items-center">
                        <div className="avatar ">
                            <Image
                                src={session?.user?.image || fb}
                                alt="avatar"
                                width={32}
                                height={32}
                                className="rounded-full w-8 h-8"
                            />
                        </div>
                        <HeaderDropdown user={session?.user} />
                    </div>
                </div>
            </div>
            <HeaderNav></HeaderNav>
        </header>
    );
}

export default Header;
