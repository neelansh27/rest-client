import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { defaultEntities } from "@auth/mikro-orm-adapter";

const { User } = defaultEntities;

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
    user!: InstanceType<typeof User>;

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt = new Date();
}