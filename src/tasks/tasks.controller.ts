import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum ';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

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
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
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
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  // @Delete(':/id')
  // deleteTask(@Param('id') id: string) {
  // 	return this.taskService.deletTaskById(id)
  // }

  @Delete(':/id')
  deleteTask(@Param('id') id: string, @GetUser() user: User,): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  editTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.editTaskStatus(id, status, user);
  }

  // @Patch('/:id/status')
  // editTaskStatus(
  // 	@Param('id') id: string,
  // 	@Body() updateTaskStatusDto: UpdateTaskStatusDto)
  // 	:Task {
  // 		const {status} = updateTaskStatusDto;
  // 		return this.taskService.editTaskStatus(id, status)
  // }
}
