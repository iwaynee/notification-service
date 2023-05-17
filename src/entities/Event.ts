import {Entity, Column, BaseEntity, ObjectIdColumn, ObjectId} from "typeorm"

@Entity()
export class Event extends BaseEntity {
    @ObjectIdColumn()
    id!: ObjectId

    @Column()
    date!: Date

    @Column()
    topic!: string

    @Column()
    type!: string

    @Column('array')
    involved_users!: string[]

    @Column()
    source!: string

    @Column()
    content!: string

    @Column()
    action: string | undefined
}
