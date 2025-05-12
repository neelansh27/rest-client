import { RequestHistory } from "@/entities/RequestHistory";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import {User} from "@/entities/User";
import {Account} from "@/entities/Account";
import {Session} from "@/entities/Session";
import {VerificationToken} from "@/entities/VerificationToken";
console.log([RequestHistory, User, Account, Session, VerificationToken])

const config = defineConfig({
    clientUrl: process.env.DATABASE_URL,
    entities: [RequestHistory, User, Account, Session, VerificationToken],
    debug: process.env.DEBUG === "true",
    extensions: [
        Migrator,
    ],
    preferTs: true,
    discovery: { disableDynamicFileAccess: true },
    migrations: {
        path: __dirname + '/migrations',
        pathTs: __dirname + '/migrations',
        disableForeignKeys: false
    },
    allowGlobalContext: true,
})
export default config;