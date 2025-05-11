import config from "@/mikro-orm.config";
import {MikroORM} from "@mikro-orm/postgresql";

let orm: MikroORM | null = null;

export async function getOrm() {
    if (orm === null) {
        orm = await MikroORM.init(config);
    }
    return orm;
}