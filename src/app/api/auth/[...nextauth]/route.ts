import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";

const handler: any = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
