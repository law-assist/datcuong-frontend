import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import s from "./home.module.scss";
// import { cn } from "src/libs/utils";
import Greeting from "./components/Greeting";
import SearchList from "../search/components/Search";
import Link from "next/link";
import { Button } from "antd";

async function Page() {
    const session: any = await getServerSession();
    if (!session) {
        if (!session?.user) {
            redirect("/login");
        }
    }
    // redirect("/search");

    return (
        <main className="flex-grow flex flex-col w-full">
            <Greeting />
            <div className=" flex flex-col md:flex-row gap-4 flex-grow pb-2">
                <div className="bg-white/90 rounded-md flex-grow">
                    <h4 className="p-4 italic">Văn bản pháp luật mới</h4>
                    <SearchList />
                </div>
                <div className="site flex flex-row md:flex-col md:min-w-52 gap-2 order-first md:order-last justify-end md:justify-start">
                    <span className="flex flex-col gap-2 bg-white/90 p-4 rounded-md">
                        Tìm kiếm nâng cao
                        <Button className="" type="primary">
                            <Link href="/search">Tìm kiếm</Link>
                        </Button>
                    </span>
                    <span className="flex flex-col gap-2 bg-white/90 p-4 rounded-md">
                        Trợ giúp pháp lý
                        <Button type="primary">
                            <Link href="/ask">Đến ngay</Link>
                        </Button>
                    </span>
                </div>
            </div>
        </main>
    );
}

export default Page;
