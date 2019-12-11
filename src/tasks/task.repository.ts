import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterDTO } from './dto/filter-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const {title, description} = createTaskDTO

        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        task.user = user
        await task.save()

        // Delete all users from return
        delete task.user
        return task
    }

    async getTasks(filterDTO: FilterDTO, user: User): Promise<Task[]> {
        const {status, search} = filterDTO
        // since this is a repository of Task it's gonna create a query builder that interacts with Task
        const query = this.createQueryBuilder('task')
        query.where('task.userId = :userId', {userId: user.id})
        if (status) {
            // `task` is the alias declared here in the createQueryBuilder
            // using 'andWhere' because you want these cond. operations to be additive and not overwrite each other
            query.andWhere('task.status = :status', {status})
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
        }
        const tasks = await query.getMany()
        return tasks
    }
}