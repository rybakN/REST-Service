import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { EntityRepositoryModule } from '../entity-repository/entity-repository.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [EntityRepositoryModule],
  controllers: [TracksController],
  providers: [TracksService, UserService],
})
export class TracksModule {}
