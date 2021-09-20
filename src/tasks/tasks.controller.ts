import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Get()
	getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

		if(Object.keys(filterDto).length) {
			return this.taskService.getTasksWithFilters(filterDto);
		} else {
			return this.taskService.getAllTasks();
		}
	}

	@Get('/:id') 
	getTaskById(@Param("id") id: string) : Task {
		return this.taskService.getTaskById(id);
	}

	@Post()
	createTask(
		// before DTO:
		// @Body('title') title: string,
		// @Body('description') description: string,
		@Body() createTaskDto: CreateTaskDto
	): Task {
		return this.taskService.createTask(createTaskDto);
	}
	
	@Delete(':/id')
	deleteTask(@Param('id') id: string) {
		return this.taskService.deletTaskById(id)
	}

	@Patch('/:id/status')
	editTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus):Task {
		return this.taskService.editTaskStatus(id, status)
	}


}
