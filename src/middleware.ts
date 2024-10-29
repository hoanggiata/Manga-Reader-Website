import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const session = await getToken({ req: request, secret: secret });

    if (session && request.nextUrl.pathname === "/profile") {
        return NextResponse.next();
    } else if (!session && request.nextUrl.pathname === "/profile") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = { matcher: ["/profile"] };
