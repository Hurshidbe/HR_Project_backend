import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.schema';
import { Model } from 'mongoose';
import { createAdminDto, LoginDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Candidate } from '../candidates/entities/candidate.schema';
import { MESSAGES, ENV_KEYS } from 'src/constants/app.constants';
import { ServiceResponse, JwtPayload } from 'src/types/common.types';

/**
 * Service for managing admin users and authentication
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(Admin.name) private readonly adminRepository: Model<Admin>,
    @InjectModel(Candidate.name)
    private readonly candidateRepository: Model<Candidate>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new admin user
   */
  async create(data: createAdminDto): Promise<ServiceResponse<Admin>> {
    try {
      this.logger.log(`Creating new admin user: ${data.username}`);

      // Check if username already exists
      const existingUser = await this.adminRepository.findOne({
        username: data.username,
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      const saved = await this.adminRepository.create(data);
      this.logger.log(`Admin user created successfully with ID: ${saved._id}`);

      return {
        success: true,
        data: saved,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(
        `Failed to create admin user: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to create admin user');
    }
  }

  /**
   * Authenticate admin user and return JWT token
   */
  async login(data: LoginDto): Promise<ServiceResponse<{ token: string }>> {
    try {
      this.logger.log(`Login attempt for username: ${data.username}`);

      const user = await this.adminRepository.findOne({
        username: data.username,
      });

      if (!user) {
        this.logger.warn(`Login failed: User not found - ${data.username}`);
        throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
      }

      // TODO: Implement password hashing with bcrypt
      if (user.password !== data.password) {
        this.logger.warn(`Login failed: Invalid password - ${data.username}`);
        throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
      }

      const payload: JwtPayload = {
        username: user.username,
        role: user.role,
        id: user.id,
      };

      const token = await this.jwtService.signAsync(payload);
      this.logger.log(`Login successful for user: ${data.username}`);

      return {
        success: true,
        data: { token },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(`Login error: ${error.message}`, error.stack);
      throw new BadRequestException('Login failed');
    }
  }

  /**
   * Get all admin users
   */
  async findAll(): Promise<ServiceResponse<Admin[]>> {
    try {
      this.logger.log('Retrieving all admin users');

      const allUsers = await this.adminRepository
        .find()
        .select('-password') // Exclude password from response
        .sort({ createdAt: -1 })
        .exec();

      this.logger.log(`Retrieved ${allUsers.length} admin users`);

      return {
        success: true,
        data: allUsers,
      };
    } catch (error) {
      this.logger.error(
        `Failed to retrieve admin users: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve admin users');
    }
  }

  /**
   * Find a single admin user by ID
   */
  async findOne(id: string): Promise<ServiceResponse<Admin>> {
    try {
      this.logger.log(`Finding admin user with ID: ${id}`);

      const user = await this.adminRepository
        .findById(id)
        .select('-password')
        .exec();

      if (!user) {
        throw new NotFoundException('Admin user not found');
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find admin user: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve admin user');
    }
  }

  /**
   * Add a new admin user (alias for create)
   */
  async addUser(data: createAdminDto): Promise<ServiceResponse<Admin>> {
    return this.create(data);
  }

  /**
   * Update an admin user
   */
  async update(id: string, data: LoginDto): Promise<Admin> {
    try {
      this.logger.log(`Updating admin user with ID: ${id}`);

      // Prevent updating superadmin username
      if (data.username === process.env[ENV_KEYS.SUPERADMIN_USERNAME]) {
        throw new BadRequestException('Cannot use reserved username');
      }

      const user = await this.adminRepository.findById(id);
      if (!user) {
        throw new NotFoundException('Admin user not found');
      }

      // Check if new username already exists (if username is being changed)
      if (data.username && data.username !== user.username) {
        const existingUser = await this.adminRepository.findOne({
          username: data.username,
          _id: { $ne: id }, // Exclude current user
        });

        if (existingUser) {
          throw new ConflictException('Username already exists');
        }
      }

      Object.assign(user, data);
      const updated = await user.save();

      this.logger.log(`Admin user ${id} updated successfully`);
      return updated;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to update admin user: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to update admin user');
    }
  }

  /**
   * Remove an admin user
   */
  async remove(id: string): Promise<Admin | null> {
    try {
      this.logger.log(`Removing admin user with ID: ${id}`);

      const user = await this.adminRepository.findById(id);
      if (!user) {
        throw new NotFoundException('Admin user not found');
      }

      // Prevent deletion of superadmin
      if (user.username === process.env[ENV_KEYS.SUPERADMIN_USERNAME]) {
        throw new BadRequestException('Cannot delete superadmin user');
      }

      const deleted = await this.adminRepository.findOneAndDelete({ _id: id });
      this.logger.log(`Admin user ${id} removed successfully`);

      return deleted;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to remove admin user: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to remove admin user');
    }
  }

  /**
   * Check if admin user exists by ID
   */
  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.adminRepository.countDocuments({ _id: id });
      return count > 0;
    } catch (error) {
      this.logger.error(
        `Failed to check admin user existence: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }
}
