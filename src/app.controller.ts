import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todos/interceptors/response-transfrom-interceptor';
import { ResponseMsg } from './todos/decorators/response-message-decorator';

//라우팅으로 하고싶은것 입력시 사용 가능("localhost:3000/root")
@Controller('root')
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  //쿼리값을 선언해서 사용 하는 방법 ("localhost:3000/root/이름")
  @Get(':name')
  @ResponseMsg('성공적으로 들어왔습니다.')
  getHello(@Param('name') name: string) {
    // return this.appService.getHello();
    return {
      data: '라우팅 연습' + name,
      message: 'gklgkgkgk',
    };
  }
}
