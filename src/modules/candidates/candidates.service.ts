import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './entities/candidate.schema';
import { Model, FilterQuery } from 'mongoose';
import { Status } from 'cloudinary';
import { Statuses } from 'src/enums/enums';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private CandidateRepo: Model<Candidate>,
  ) {}

  create(data: CreateCandidateDto, photo: string) {
    const candidate = new this.CandidateRepo({
      ...data,
      photo,
    });

    return candidate.save();
  }

  async filterCandidates(filter: FilterQuery<Candidate>) {
    return this.CandidateRepo.find(filter);
  }

  async updateStatus(id: string, status: Status) {
    const isExist = await this.CandidateRepo.findOne({ _id: id });
    if (!isExist) throw new NotFoundException('user not found');
    if (status === Statuses.accepted || status === Statuses.rejected)
      return this.CandidateRepo.findByIdAndUpdate(
        id,
        { status },
        { new: true },
      );
    throw new BadRequestException('unknown status format');
  }
}
