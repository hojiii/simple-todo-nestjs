import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
//PartialType=> CreateTodoDto에 사용되는 걸 그대로 사용한다라는 의미로 보면됨
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
