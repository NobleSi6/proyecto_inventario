import { Repository } from 'typeorm';
import { Project } from './Project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsService {
    private projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    create(projectData: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    update(id: number, updateData: any): Promise<Project | null>;
    remove(id: number): Promise<void>;
}
