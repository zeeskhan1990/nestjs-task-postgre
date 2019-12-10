import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import * as uuid from 'uuid/v1'
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

    }

    async getTasks(filterDTO: FilterDTO, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO, user)
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found =  await this.taskRepository.findOne({where: {id, userId: user.id}})
        if (found) {
            return found
        } else {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }

    createTask(createTaskDTO: CreateTaskDTO, user: User) {
        return this.taskRepository.createTask(createTaskDTO, user)
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const deleteTask = await this.getTaskById(id, user)
        const result = await this.taskRepository.delete({id, userId: user.id})
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        //return this.taskRepository.remove([deleteTask])
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const updateTask = await this.getTaskById(id, user)
        updateTask.status = status
        await updateTask.save()
        return updateTask
    }
}
