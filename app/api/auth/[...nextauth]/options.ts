import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username",
        //             type: "text",
        //             placeholder: "Please enter you username",
        //         },
        //         // password: {}
        //         async authorize(credentials) {
        //
        //         }
        //     }
        // })
    ]
}
