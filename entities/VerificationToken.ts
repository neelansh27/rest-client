// entities/VerificationToken.ts
import {
    Entity,
    PrimaryKey,
    Property,
    Index,
} from '@mikro-orm/core';

@Entity({ tableName: 'verification_token' })
@Index({ properties: ['identifier', 'token'], options: { unique: true } })
export class VerificationToken {
    @PrimaryKey({ type: 'string'})
    id!: string;

    @Property({ type: 'string'})
    identifier!: string;

    @Property({ type: 'string'})
    token!: string;

    @Property({ type: Date})
    expires!: Date;
}