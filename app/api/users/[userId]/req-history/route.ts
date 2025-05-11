import {NextRequest, NextResponse} from "next/server";
import {RequestHistory} from "@/entities/RequestHistory";
import { defaultEntities } from "@auth/mikro-orm-adapter";
import {getOrm} from "@/lib/orm";

const {User} = defaultEntities;

export async function GET(request: NextRequest, { params } : { params: { userId: string } }) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const userId = params.userId;

    const history = await em.find(RequestHistory,{
        user_id: userId
    }, {
        orderBy: {id: 'desc'},
    });
    return NextResponse.json(history);
}

export async function POST(request: NextRequest, { params } : { params: { userId: string } }) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const userId = params.userId;
    const {url, method, headers, queryParams, body} = await request.json();
    const user = await em.findOne(User, userId);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const history = em.create(RequestHistory, {
        url,
        method,
        headers,
        params: queryParams,
        body,
        user,
    });
    await em.persistAndFlush(history);
    return NextResponse.json(history);
}