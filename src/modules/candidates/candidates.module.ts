import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './entities/candidate.schema';

@Module({
  controllers: [CandidatesController],
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
  ],
  exports: [CandidatesService],
  providers: [CandidatesService],
})
export class CandidatesModule {}
