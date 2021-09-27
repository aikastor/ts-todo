import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum ';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) {}

	// @Get()
	// getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

	// 	if(Object.keys(filterDto).length) {
	// 		return this.taskService.getTasksWithFilters(filterDto);
	// 	} else {
	// 		return this.taskService.getAllTasks();
	// 	}
	// }

	// @Get('/:id') 
	// getTaskById(@Param("id") id: string) : Task {
	// 	return this.taskService.getTaskById(id);
	// }

	@Get(':/id') 
	getTaskById(@Param('id') id: string): Promise<Task>{
		return this.taskService.getTaskById(id);
	}

	// @Post()
	// createTask(
	// 	// before DTO:
	// 	// @Body('title') title: string,
	// 	// @Body('description') description: string,
	// 	@Body() createTaskDto: CreateTaskDto
	// ): Task {
	// 	return this.taskService.createTask(createTaskDto);
	// }

	@Post()
	createTask(
		// before DTO:
		// @Body('title') title: string,
		// @Body('description') description: string,
		@Body() createTaskDto: CreateTaskDto
	): Promise<Task>  {
		return this.taskService.createTask(createTaskDto);
	}

	// @Delete(':/id')
	// deleteTask(@Param('id') id: string) {
	// 	return this.taskService.deletTaskById(id)
	// }

	// @Patch('/:id/status')
	// editTaskStatus(
	// 	@Param('id') id: string, 
	// 	@Body() updateTaskStatusDto: UpdateTaskStatusDto) 
	// 	:Task {
	// 		const {status} = updateTaskStatusDto;
	// 		return this.taskService.editTaskStatus(id, status)
	// }

}
