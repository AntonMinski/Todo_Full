import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, getManager, Like, ILike, Connection} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { Task } from './model/entity';
import { User } from 'src/user/model/user.entity';
import { GetTasksFilterDto } from './model/dto/filter-task.entity';



@Injectable()
export class TaskService {


    constructor(
        @InjectRepository(Task) private readonly repository: Repository<Task>
    ) {}

    // async findAll(): Promise<any[]> {
    //     return this.repository.find();
    // }

    async findByUser(user: User, searchQuery: GetTasksFilterDto): Promise<[Task[], number]> {  
        let {title, status, page, limit} = searchQuery
        

        // pagination
        page = Number(page)
        limit = Number(limit) 
        const skippedItems = (page - 1) * limit 
       
        
        // convert string to boolean:
        let isActive
        if (status)  { isActive = true ? status ==='active' : false }
  
        
       const result = await this.repository.createQueryBuilder()
       .where('"userId" = :user', {user: user.id})
       .andWhere('task ilike :name', {name: `%${title}%`})
       .andWhere((status !== '') ? `"isActive" = :isActive` : '1=1', { isActive })
       .offset((skippedItems >0) ? skippedItems : 0)
       .limit((limit) ? limit : 0)
       .getManyAndCount()

    //    const {data, count} = result
        console.log(result)

        return result
        
        // return this.repository.find({ where: { 
        //     user: user.id,
        //     task: ILike(`%${title}%`)
        // } });
    }

        
    async create(body, user): Promise<any> {

        body.isActive = true;
        // typeOrm: should get whole User object on ManyToOne relations
        body.user = user;

        return this.repository.save(body);
    }

    async findById(id, user): Promise<any> {
        const task =  await this.repository.findOne({where: {id: id, user: user }});

        if (!task) {
            throw new NotFoundException(`Task with id '${id}' not found`);
        }

        return task;

    }


    async update(id, data, user){

        const entityManager = getManager(); 
        
        const task = await entityManager.findOne(Task, {where: {id: id, user: user }});

        if (!task) {
            throw new NotFoundException('Task with such id not found');
        }

        if (data.task) { task.task = data.task }
        if (data.isActive) { task.isActive = data.isActive }

        await entityManager.save(task);

        return task;

    }

    async changeStatus(id, data, user) {
        const entityManager = getManager(); 
        
        const task = await entityManager.findOne(Task, {where: {id: id, user: user }});

        if (!task) {
            throw new NotFoundException('Task with such id not found');
        }

        task.isActive = data.isActive;

        await entityManager.save(task);

        return task;
    }

    async delete(id, user): Promise<any> {
    const result = await this.repository.createQueryBuilder()
    .delete()
    .where('id = :id', {id})
    .andWhere('"userId" = :user', {user: user.id})
    // .andWhereInIds
    .execute();

    if (!result) {
        throw new NotFoundException('Task with such id not found');
    }

    return result;
    }
}
