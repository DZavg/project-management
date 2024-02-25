import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '@/projects/entities/project.entity';
import { User } from '@/users/entities/user.entity';
import { errorMessage } from '@/utils/errorMessage';
import { CreateAccessDto } from '@/accesses/dto/create-access.dto';
import { AccessesService } from '@/accesses/accesses.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private accessesService: AccessesService,
  ) {}
  async create(user: User, createProjectDto: CreateProjectDto) {
    const newProject = await this.projectRepository.create({
      ...createProjectDto,
      user,
    });
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async createAccess(user: User, id: number, createAccessDto: CreateAccessDto) {
    const project = await this.findOneById(user, id);

    return await this.accessesService.create(createAccessDto, project);
  }

  async findAll(user: User) {
    return await this.projectRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findAllAccesses(user: User, id: number) {
    const project = await this.findOneById(user, id);

    return await this.accessesService.findAll(project);
  }

  async findOneById(user: User, id: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!project) {
      throw new HttpException(
        { error: errorMessage.ProjectNotFound },
        HttpStatus.BAD_REQUEST,
      );
    }

    return project;
  }

  async update(user: User, id: number, updateProjectDto: UpdateProjectDto) {
    await this.findOneById(user, id);
    await this.projectRepository.update({ id }, updateProjectDto);
    return await this.findOneById(user, id);
  }

  async remove(user: User, id: number) {
    await this.findOneById(user, id);
    await this.projectRepository.delete(id);
    return { message: 'success' };
  }
}
