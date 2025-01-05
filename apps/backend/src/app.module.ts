import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './lead/lead.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StaffModule } from './staff/staff.module';
import { InteractionModule } from './interaction/interaction.module';
import config from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config), LeadModule, StaffModule, InteractionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
