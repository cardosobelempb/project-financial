import { NestFactory } from '@nestjs/core';

import { ErrorFilter } from './shared/errors/error.filter';
import { AppModule } from './modules/app.module';
import { EnvService } from './shared/env-service/env-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());

  const envService = app.get(EnvService);
  const prefixUrl = envService.get('PREFIX_URL');

  app.setGlobalPrefix(prefixUrl);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
