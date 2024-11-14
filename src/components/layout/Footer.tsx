import Image from "next/image";
import Link from "next/link";

import facebook from "public/icon/facebook.svg";
import youtube from "public/icon/youtube.svg";
import linkedin from "public/icon/linkedin.svg";

async function Footer() {
    return (
        <footer className="bg-primary text-center pb-4">
            <div className="social bg-white flex gap-2 xl:gap-3 flex-col justify-end items-end px-8 2xl:px-32 py-3">
                <p className="underline font-bold text-primary">
                    Tìm chúng tôi trên mạng xã hội
                </p>
                <div className="flex flex-row gap-2 xl:gap-5">
                    <Link href={"/home"}>
                        <Image
                            src={facebook}
                            alt="facebook"
                            width={40}
                            height={40}
                        />
                    </Link>
                    <Link href={"/home"}>
                        <Image
                            src={youtube}
                            alt="youtube"
                            width={40}
                            height={40}
                        />
                    </Link>
                    <Link href={"/home"}>
                        <Image
                            src={linkedin}
                            alt="linkedin"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
            </div>
            <div className="contact flex flex-row justify-between text-gray-100 border-b-2 border-gray-100 mx-8 2xl:mx-32 pb-2 pt-4">
                <p className=" text-gray-100">@XinChaoVietNam 2024</p>
                <div className="flex flex-row gap-2 xl:gap-5">
                    <span>Về Chúng Tôi</span>
                    <span>Liên Hệ</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
