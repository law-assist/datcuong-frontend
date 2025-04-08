//
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { handleRefreshToken } from "src/app/(auth)/apis/auth.api";

export async function GET() {
    try {
        const tokens = await handleRefreshToken();
        if (!tokens) {
            return NextResponse.json(
                { error: "Token refresh failed" },
                { status: 401 }
            );
        }

        const response = NextResponse.json(tokens);
        response.cookies.set("access_token", tokens.access_token, {
            maxAge: 60 * 60,
            path: "/",
        });
        response.cookies.set("refresh_token", tokens.refresh_token, {
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "strict",
        });

        return response;
    } catch (error: any) {
        console.error("Error refreshing token:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
