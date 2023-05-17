import {Entity, Column, BaseEntity, ObjectIdColumn} from "typeorm"

@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn()
    id!: number

    @Column()
    uid!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    phone!: string
}
