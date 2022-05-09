import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseIntPipeOptions,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    // return [
    //     {id: 1, number: 1},
    //     {id: 2, number: 2},
    // ]
    return await this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({ where: { id: MoreThan(3) } });
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe)
    id,
  ) {
    console.log(typeof id);

    return await this.repository.findOne(id);
  }

  @UsePipes()
  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }
  
  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    await this.repository.delete(id);
  }
}
