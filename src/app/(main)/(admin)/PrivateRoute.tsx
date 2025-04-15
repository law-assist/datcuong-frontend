import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/app/api/auth/[...nextauth]/authOptions";

type PrivateRouteProps = {
    children: React.ReactNode;
};
const PrivateRoute = async ({ children }: PrivateRouteProps) => {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
        redirect("/home");
    }

    return <>{children}</>;
};
export default PrivateRoute;
