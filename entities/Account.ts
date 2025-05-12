// entities/Account.ts
import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
    Index,
} from '@mikro-orm/core';
import { User } from '@/entities/User';

@Entity({ tableName: 'account' })
@Index({ properties: ['provider', 'providerAccountId'], options: { unique: true } })
export class Account {
    @PrimaryKey({ type: 'string'})
    id!: string;

    @Property({ type: 'string'})
    provider!: string;

    @Property({ type: 'string', fieldName: 'provider_account_id' })
    providerAccountId!: string;

    @Property({ type: 'string'})
    type!: string;

    @Property({ type:'string', nullable: true })
    refresh_token?: string;

    @Property({ type:'string', nullable: true })
    access_token?: string;

    @Property({ type: 'bigint', nullable: true })
    expires_at?: number;

    @Property({ type: 'string', nullable: true })
    token_type?: string;

    @Property({ type: 'string', nullable: true })
    scope?: string;

    @Property({ type:"string", nullable: true })
    id_token?: string;

    @ManyToOne(() => User, { fieldName: 'user_id' })
    user!: User;
}
