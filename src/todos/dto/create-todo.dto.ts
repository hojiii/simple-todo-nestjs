import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({
    message: '제목은 문자열만 가능합니다.',
  })
  @MinLength(6, {
    message: '제목은 $constraint1 자 이상 작성해주세요. 입력된 글자: $value',
  })
  @MaxLength(30, {
    message: '제목은 $constraint1 자를 넘길 수 없습니다. 입력된 글자: $value',
  })
  title: string;

  @IsBoolean({
    message: 'Boolean 타입만 가능합니다.',
  })
  is_done: boolean;
}
