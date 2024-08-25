import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
  HttpException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
//서버 루트/todos
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // @HttpCode(HttpStatus.OK)
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  // @Post()
  // async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
  //   const createdTodo = await this.todosService.create(createTodoDto);
  //   res.status(HttpStatus.CREATED).json({
  //     message: '성공적으로 할일이 추가되었습니다.',
  //     statusCode: 200,
  //     data: createTodoDto,
  //   });
  // }//express 방식으로 return을 줌

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return {
      message: '성공적으로 할일이 추가되었습니다.',
      statusCode: 200,
      data: createdTodo,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const fetchedTodos = await this.todosService.findAll();
    return {
      message: '성공적으로 할일이 모두 가져왔습니다..',
      statusCode: 200,
      data: fetchedTodos,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 앖습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: '성공적으로 해당 할일을 가져왔습니다..',
      statusCode: 200,
      data: foundTodo,
    };
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 앖습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedTodo = await this.todosService.update(+id, updateTodoDto);
    return {
      message: '해당 할일이 성공적으로 업데이트 되었습니다.',
      statusCode: 200,
      data: updatedTodo,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 앖습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const deletedTodo = await this.todosService.remove(+id);
    return {
      message: '해당 할일이 성공적으로 삭제 되었습니다.',
      statusCode: 200,
      data: deletedTodo,
    };
  }
}
