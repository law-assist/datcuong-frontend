import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Page() {
    const session: any = await getServerSession();
    if (!session) {
        if (!session?.user) {
            redirect("/login");
        }
    }
    redirect("/search");

    return <h1>home</h1>;
}

export default Page;
