import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventsController {
    private events: Event[] = [];

    @Get()
    findAll() {
        // return [
        //     {id: 1, number: 1},
        //     {id: 2, number: 2},
        // ]
        return this.events;
    }

    @Get(":id/:name")
    findOne(@Param("id") id,@Param("name") name) {
        const event = this.events.find(e => e.id === parseInt(id))
        // if (event)
        return event;
    }
    @Post()
    create(@Body() input: CreateEventDto) {
        const event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1
        }
        this.events.push(event)
        return event;
    }
    @Patch(":id")
    update(@Param("id") id, @Body() input: UpdateEventDto) {
        const index = this.events.findIndex(e => e.id === parseInt(id))

        this.events[index] = {
            ...this.events[index],
            ...input,
            when: input.when ? new Date(input.when) : this.events[index].when
        }

        return this.events[index]
    }

    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id") id) {
        this.events = this.events.filter(e => e.id !== parseInt(id))

    }
}
