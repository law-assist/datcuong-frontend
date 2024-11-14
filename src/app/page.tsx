/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);
    // const { props } = await getServerSideProps();
    // const session = props?.session;

    if (!session?.user) {
        redirect("/login");
    }

    redirect("/home");
}
