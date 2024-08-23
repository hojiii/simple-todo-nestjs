import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

//라우팅으로 하고싶은것 입력시 사용 가능("localhost:3000/root")
@Controller('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //쿼리값을 선언해서 사용 하는 방법 ("localhost:3000/root/이름")
  @Get(':name')
  getHello(@Param('name') name: string): string {
    // return this.appService.getHello();
    return '라우팅 연습' + name;
  }
}
