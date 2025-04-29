import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = loginSchema.parse(body);

        if (data.username && data.password) {
            return NextResponse.json({ message: "Login successful", token: "fake-jwt-token" }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
