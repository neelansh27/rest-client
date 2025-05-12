import { RequestHistory } from "@/entities/RequestHistory";
import { defaultEntities as AuthEntities } from "@auth/mikro-orm-adapter";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";

const config = defineConfig({
    dbName: "warewe",
    clientUrl: process.env.DATABASE_URL,
    entities: [RequestHistory, ...Object.values(AuthEntities)],
    // entitiesTs: ["./entities"],
    debug: process.env.DEBUG === "true",
    extensions: [
        Migrator,
    ],
    discovery: {
        checkDuplicateTableNames:false,
    },
    migrations: {
        path: "./migrations",
    },
})
export default config;