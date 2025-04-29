import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

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
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["admin", "user", "system"]),
    };

    return NextResponse.json(user, { status: 200 });
}
