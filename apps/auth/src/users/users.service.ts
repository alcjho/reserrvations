import { TDocument, UserDocument } from '@app/common';
import { Model } from 'mongoose';
import { Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user-dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel(UserDocument.name) private readonly model: Model<TDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    return await new this.model({
      ...createUserDto,
      email: createUserDto.email, //await this.validateUserCreation(createUserDto),
      password: await bcrypt.hash(createUserDto.password, salt),
      salt: salt,
      createdAt: new Date(),
    }).save();
  }

  async validateUserCreation(createUserDto: CreateUserDto) {
    try {
      await this.model.findOne({ email: createUserDto.email });
    } catch (error) {
      this.logger.log(`findOne email error ${error}`);
      return;
    }
    throw new UnprocessableEntityException(`Email ${createUserDto.email} already exists.`);
  }

  async find(_id: string): Promise<UserDocument> {
    this.logger.log(`Retrieve user by id`);
    return await this.model.findById(_id);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.model.find().exec();
  }

  async update(_id: string, updateUser: UpdateUserDto): Promise<UserDocument> {
    return await this.model.findByIdAndUpdate(_id, updateUser).exec();
  }

  async delete(_id: string): Promise<UserDocument> {
    return await this.model.findByIdAndDelete(_id).exec();
  }

  async verifyUser(email: string, password: string) {
    const user = await this.model.findOne({ email });
    const pwdIsValid = await bcrypt.compare(password, user.password);
    if (!pwdIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.model.findOne(getUserDto);
  }
}
