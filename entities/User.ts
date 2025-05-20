import {
    Entity,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';

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
