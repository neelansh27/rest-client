import {NextRequest, NextResponse} from "next/server";
import {RequestHistory} from "@/entities/RequestHistory";
import { defaultEntities } from "@auth/mikro-orm-adapter";
import {getOrm} from "@/lib/orm";

const {User} = defaultEntities;

export async function GET(request: NextRequest, {params}: { params: Promise<{ userId: string }>} ) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const {userId} = await params;

    const user = await em.findOne(User, userId);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const history = await em.find(RequestHistory,{
        user: userId,
    }, {
        orderBy: {id: 'desc'},
    });
    return NextResponse.json(history);
}
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters
export async function POST(request: NextRequest, {params}: { params: Promise<{ userId: string }>} ) {
    const orm = await getOrm();
    const em = orm.em.fork();
    const { userId } = await params;
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
        createdAt: new Date(),
    });
    await em.persistAndFlush(history);
    return NextResponse.json(history);
}