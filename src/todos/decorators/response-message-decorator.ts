import { SetMetadata } from '@nestjs/common';
//@ResponseMsg("asdasd")
export const ResponseMsg = (message: string) =>
  SetMetadata('response-message', message);
