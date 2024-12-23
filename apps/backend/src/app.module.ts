import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config), LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
