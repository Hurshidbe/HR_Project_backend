import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './entities/candidate.schema';
import { Model, FilterQuery } from 'mongoose';
import { Employee } from '../employee/entities/employee.schema';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { CreateCandidateDto } from './dto/main.candidate.dto';
import { CandidateStatus, EmployeeStatus } from 'src/enums/enums';
import { MESSAGES } from 'src/constants/app.constants';

/**
 * Service for managing candidate operations
 */
@Injectable()
export class CandidatesService {
  private readonly logger = new Logger(CandidatesService.name);

  constructor(
    @InjectModel(Candidate.name)
    private readonly candidateRepository: Model<Candidate>,
    @InjectModel(Employee.name)
    private readonly employeeRepository: Model<Employee>,
  ) {}

  /**
   * Create a new candidate application
   */
  async create(data: CreateCandidateDto): Promise<Candidate> {
    try {
      this.logger.log(`Creating new candidate: ${data.fullName}`);

      // Set default status if not provided
      const candidateData = {
        ...data,
        status: data.status || CandidateStatus.PENDING,
      };

      const candidate = await this.candidateRepository.create(candidateData);
      this.logger.log(
        `Candidate created successfully with ID: ${candidate._id}`,
      );

      return candidate;
    } catch (error) {
      this.logger.error(
        `Failed to create candidate: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to create candidate application');
    }
  }

  /**
   * Get all candidates with optional filtering
   */
  async getAll(filter: FilterQuery<Candidate> = {}): Promise<Candidate[]> {
    try {
      this.logger.log('Retrieving candidates with filter:', filter);

      const candidates = await this.candidateRepository
        .find(filter)
        .sort({ createdAt: -1 })
        .exec();

      this.logger.log(`Retrieved ${candidates.length} candidates`);
      return candidates;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve candidates: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve candidates');
    }
  }

  /**
   * Reject a candidate application
   */
  async rejectCandidate(id: string): Promise<Candidate | null> {
    try {
      this.logger.log(`Rejecting candidate with ID: ${id}`);

      const candidate = await this.candidateRepository.findById(id);
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }

      const updated = await this.candidateRepository.findByIdAndUpdate(
        id,
        { status: CandidateStatus.REJECTED },
        { new: true },
      );

      this.logger.log(`Candidate ${id} rejected successfully`);
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to reject candidate: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to reject candidate');
    }
  }

  /**
   * Accept a candidate and create employee record
   */
  async acceptCandidate(
    id: string,
    department: Department,
    position: Position,
    salary: number,
    employeeStatus: EmployeeStatus,
  ): Promise<Employee> {
    try {
      this.logger.log(`Accepting candidate with ID: ${id}`);

      const candidate = await this.candidateRepository.findById(id);
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }

      // Create employee record from candidate data
      const employeeData = {
        ...candidate.toObject(),
        department,
        position,
        salary,
        employeeStatus,
        _id: undefined, // Remove candidate ID to generate new employee ID
      };

      const employee = await this.employeeRepository.create(employeeData);

      // Update candidate status to accepted
      await this.candidateRepository.findByIdAndUpdate(id, {
        status: CandidateStatus.ACCEPTED,
      });

      this.logger.log(
        `Candidate ${id} accepted and employee created with ID: ${employee._id}`,
      );
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to accept candidate: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to accept candidate');
    }
  }

  /**
   * Find a single candidate by ID
   */
  async findOne(id: string): Promise<Candidate | null> {
    try {
      this.logger.log(`Finding candidate with ID: ${id}`);

      const candidate = await this.candidateRepository.findById(id).exec();
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }

      return candidate;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find candidate: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve candidate');
    }
  }

  /**
   * Check if candidate exists by ID
   */
  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.candidateRepository.countDocuments({ _id: id });
      return count > 0;
    } catch (error) {
      this.logger.error(
        `Failed to check candidate existence: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }
}
