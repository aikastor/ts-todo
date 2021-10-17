import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum ';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TasksRepository)
		private tasksRepository: TasksRepository,
	) {}
	// private tasks: Task[] = [];

	async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
		return this.tasksRepository.getTasks(filterDto);
	}

	// getAllTasks(): Task[] {
	// 	return this.tasks;
	// }

	// getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
	// 	const {status, search} = filterDto;

	// 	let tasks = this.getAllTasks();

	// 	if(status) {
	// 		tasks = tasks.filter(task => task.status === status)
	// 	}

	// 	if(search) {
	// 		tasks = tasks.filter(task => {
	// 			if(task.title.includes(search) || task.description.includes(search)) {
	// 				return true;
	// 			}
	// 			return false;
	// 		})
	// 	}

	// 	return tasks;
	// }

	// createTask(createTaskDto: CreateTaskDto): Task {
	// 	const {title, description} = createTaskDto;
	// 	const task: Task = {
	// 		id: uuid(),
	// 		title,
	// 		description,
	// 		status: TaskStatus.OPEN,
	// 	};

	// 	this.tasks.push(task);
	// 	return task;
	// }

	// getTaskById(id: string):Task {
	// 	const found = this.tasks.find(item => item.id === id);

	// 	if(!found) {
	// 		throw new NotFoundException(`Tasj with ${id} not found!`)
	// 	}
	// 	return found;
	// }

	// removed async because repo method is async
	createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto);
	}

	async getTaskById(id: string): Promise<Task> {
		const found = await this.tasksRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`Task with ${id} not found!`);
		}

		return found;
	}

	async deleteTaskById(id: string): Promise<void> {
		const result = await this.tasksRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Task with ID ${id} not found!`);
		}
	}

	// deletTaskById(id: string  ):void {
	// 	const found = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter((task) => task.id !== found.id)
	// }

	async editTaskStatus(id: string, status: TaskStatus): Promise<Task> {
		// using this method will throw 404 error if no task is found
		const task = await this.getTaskById(id);

		task.status = status;
		await this.tasksRepository.save(task);
		return task;
	}

	// editTaskStatus(id: string, status: TaskStatus): Task{
	// 	const task = this.tasks.find(item => item.id === id);
	// 	task.status = status;
	// 	return task;
	// }
}
