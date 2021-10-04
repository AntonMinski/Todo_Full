import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";


@Injectable()
export abstract class AbstractService {

    protected constructor(
        protected readonly repository: Repository<any>
    ) {}

    async findAll(relations = []): Promise<any[]> {
        return this.repository.find({relations});
    }

    async create(data): Promise<any> {
        return this.repository.save(data);
    }

    async findOne(condition, relations = []): Promise<any> {
        return this.repository.findOne(condition, {relations});
    }

    async update(id: number, data): Promise<any> {
        return this.repository.update(id, data)
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}

