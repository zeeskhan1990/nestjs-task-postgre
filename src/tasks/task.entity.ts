import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TaskStatus } from './task-status.enum';
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    /**
     * When we set @JoinColumn, it automatically creates a column in the database named propertyName + referencedColumnName. Ex here -userId
     * If you want to change this name in the database you can specify a custom join column name.
     */
    // @JoinColumn({name: 'customColumn'})
    user: User

    // You need to explicitly declare the column for it to be used in queryBuilder
    @Column()
    userId: number
}

// You can declare a model as a class or an interface
// The entity class can and should actually be used as the model
/* export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus
}*/
