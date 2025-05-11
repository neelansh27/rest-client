import { User } from "@/entities/User"
import { RequestHistory } from "@/entities/RequestHistory";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";

const config = defineConfig({
    dbName: "warewe",
    clientUrl: process.env.DATABASE_URL,
    entities: [User, RequestHistory],
    entitiesTs: ["./entities"],
    debug: process.env.DEBUG === "true",
    extensions: [
        Migrator,
    ],
    migrations: {
        path: "./migrations",
    },
})
export default config;