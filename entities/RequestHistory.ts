import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import { defaultEntities } from "@auth/mikro-orm-adapter";
const { User } = defaultEntities;
@Entity()
export class RequestHistory {
    @PrimaryKey()
    id!: number;

    @Property()
    url!: string;

    @Property()
    method!: string;

    @Property({ length: 500 })
    headers!: string;

    @Property({ length: 500 })
    params!: string;

    @Property({ length: 500 })
    body!: string;

    @ManyToOne(
        () => User,
        {
            fieldName: 'user_id',
            nullable: false,
    })
    user!: typeof User;
}