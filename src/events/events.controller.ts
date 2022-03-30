import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('events')
export class EventsController {
    @Get()
    findAll() {}
    @Get(":id/:name")
    findOne(@Param("id") id,@Param("name") name) {
        return [id, name];
    }
    @Post()
    create(@Body() input) {
        return input
    }
    @Patch(":id")
    update(@Param("id") id) {}
    @Delete(":id")
    remove(@Param("id") id) {}
}
