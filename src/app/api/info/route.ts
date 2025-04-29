import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    if (token !== "fake-jwt-token") {
        return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const user = {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
    };

    return NextResponse.json({ user }, { status: 200 });
}
