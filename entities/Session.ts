// entities/Session.ts
import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
    Index,
} from '@mikro-orm/core';
import { User } from '@/entities/User';

@Entity({ tableName: 'session' })
@Index({ properties: ['sessionToken'], options: { unique: true } })
export class Session {
    @PrimaryKey({ type: 'string'})
    id!: string;

    @Property({ type: 'string', fieldName: 'session_token' })
    sessionToken!: string;

    @Property({ type: Date,  fieldName: 'expires' })
    expires!: Date;

    @ManyToOne(() => User, { fieldName: 'user_id' })
    user!: User;
}