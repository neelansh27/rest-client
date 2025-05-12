// entities/User.ts
import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Account } from '@/entities/Account';
import { Session } from '@/entities/Session';

@Entity({ tableName: 'user' })
export class User {
    @PrimaryKey({ type: 'string'})
    id!: string;

    @Property({ type: 'string',nullable: true })
    name?: string;

    @Property({ type: 'string', unique: true })
    email!: string;

    @Property({
        fieldName: 'email_verified',
        nullable: true,
        type: 'timestamp',
    })
    emailVerified?: Date;

    @Property({ type: 'string',nullable: true })
    image?: string;
}