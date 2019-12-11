import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    // One side of the relationship can be eager but not both
    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[]

    // Done here, and not repo to utilize 'this'
    async validatePassword(password: string): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(password, this.salt)
        return hashedPassword === this.password
    }
}