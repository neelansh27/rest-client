import 'reflect-metadata';
import config from "@/mikro-orm.config";
import {GeneratedCacheAdapter, MikroORM} from "@mikro-orm/postgresql";

let orm: MikroORM | null = null;

export async function getOrm() {
    if (orm === null) {
        console.log("Initializing ORM");
        orm = await MikroORM.init(config);
    }
    return orm;
}