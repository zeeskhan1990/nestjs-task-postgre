import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterDTO } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: FilterDTO, @GetUser() user: User): Promise<Task[]> {
        console.log(filterDTO)
        return this.tasksService.getTasks(filterDTO, user)
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User) {
        console.log(createTaskDTO)
        return this.tasksService.createTask(createTaskDTO, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number,
                     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
                     @GetUser() user: User): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user)
    } 

    /* @Get()
    getTasks(@Query(ValidationPipe) filterDTO: FilterDTO): Task[] {
        console.log(filterDTO)
        if (Object.keys(filterDTO).length) {
            return this.tasksService.getFilteredTasks(filterDTO)
        } else {
            return this.tasksService.getAllTasks()
        }
    }

    

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Task {
        return this.tasksService.deleteTask(id)
    }

    // Param pipe, you can also provide a new object of the pipe with arguments
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', new TaskStatusValidationPipe()) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO) {
        console.log(createTaskDTO) 
        return this.tasksService.createTask(createTaskDTO)
    } */

    /* createTask(@Body('title') title: string, @Body('description') description: string) {
        console.log(title, description) 
        return this.tasksService.createTask(title, description)
    } */
}
