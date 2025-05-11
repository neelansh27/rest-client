import { NextRequest, NextResponse } from "next/server";
import {getOrm} from "@/lib/orm";
import {User} from "@/entities/User";

export async function GET(req: NextRequest) {
    const orm = await getOrm();
    const em = orm.em.fork();

    const users = await em.find(User, {});
    return NextResponse.json(users);
}