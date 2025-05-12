import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import {User} from "@/entities/User";

@Entity()
export class RequestHistory {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'string' })
    url!: string;

    @Property({ type: 'string' })
    method!: string;

    @Property({ type: 'string', length: 500 })
    headers!: string;

    @Property({ type: 'string', length: 500 })
    params!: string;

    @Property({ type: 'string', length: 500 })
    body!: string;

    @ManyToOne(
        () => User,
        {
            fieldName: 'user_id',
            nullable: false,
        })
    user!: User;

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt = new Date();
}