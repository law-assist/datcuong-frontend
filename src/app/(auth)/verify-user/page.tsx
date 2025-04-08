/* eslint-disable @typescript-eslint/no-unused-vars */
import { getValidRole } from "src/libs/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type VerifyUserPageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
};

const VerifyUserPage = async ({ searchParams }: VerifyUserPageProps) => {
    redirect("/home");

    return <></>;
};
export default VerifyUserPage;
