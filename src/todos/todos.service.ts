import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@Prisma/client';
import { PrismaService } from 'src/prisma.clilent';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.is_done,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.is_done,
      },
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}
