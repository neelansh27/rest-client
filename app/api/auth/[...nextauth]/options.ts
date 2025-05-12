import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github';
import { MikroOrmAdapter } from "@auth/mikro-orm-adapter";
import config from "@/mikro-orm.config";

export const options: NextAuthOptions = {
    adapter: MikroOrmAdapter(config),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async session({session, user}) {
            // Add user id to the session object
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    }
}
