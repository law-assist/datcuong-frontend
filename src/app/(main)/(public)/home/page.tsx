// import s from "./home.module.scss";
// import { cn } from "src/libs/utils";
// import Greeting from "./components/Greeting";
import SearchList from "../search/components/Search";
// import Link from "next/link";
// import { Button } from "antd";
import Image from "next/image";
import hoidapphapluat from "public/images/hoidapphapluat.png"
import timkiemnangcao from "public/images/timkiemnangcao.png"

async function Page() {
    return (
        <main className="flex-grow flex flex-col w-full pt-5 pb-5">
            <div className=" flex flex-col md:flex-row gap-4 flex-grow pb-2">
                <div className="bg-white/90 rounded-md flex-grow">
                    <h4 className="p-4 italic">Văn bản pháp luật mới</h4>
                    <SearchList />
                </div>
                <div className="site flex flex-row md:flex-col md:min-w-52 gap-2 order-first md:order-last justify-end md:justify-start">
                    

                    <a href="/search" >
                    <Image
                            src={timkiemnangcao}
                            alt="Map of Vietnam"
                            width={256}
                            height={284} 
                        />
                    </a>  
                    
                    <a href="/ask" >
                    <Image
                            src={hoidapphapluat}
                            alt="Map of Vietnam"
                            width={256} 
                            height={284} 
                        />
                    </a>              
                </div>
            </div>
        </main>
    );
}

export default Page;
