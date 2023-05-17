import {Entity, Column, BaseEntity, ObjectIdColumn} from "typeorm"

@Entity()
export class Subscription extends BaseEntity {
    @ObjectIdColumn()
    id!: number

    @Column()
    uid!: string

    @Column()
    type!: string

    @Column()
    transport!: string[]
}
