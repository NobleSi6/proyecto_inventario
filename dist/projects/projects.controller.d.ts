import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("./Project.entity").Project>;
    findAll(): Promise<import("./Project.entity").Project[]>;
    findOne(id: string): Promise<import("./Project.entity").Project>;
    update(id: string, updateProjectDto: any): Promise<import("./Project.entity").Project | null>;
    remove(id: string): Promise<void>;
}
