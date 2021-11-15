import { Entity, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum ';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
	async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
		const { status, search } = filterDto;
		// query builder
		const query = this.createQueryBuilder('task');
		if (status) {
			query.andWhere('task.status = :status', { status });
		}

		if (search) {
			query.andWhere(
				'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
				{ search: `%${search}%` },
			);
		}
		const tasks = await query.getMany();
		return tasks;
	}

	async createTask(createTaskDto: CreateTaskDto) {
		const { title, description } = createTaskDto;

		// creating the object
		const task = this.create({
			title,
			description,
			status: TaskStatus.OPEN,
		});

		await this.save(task);
		return task;
	}
}