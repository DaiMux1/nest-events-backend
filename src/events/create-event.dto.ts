import { IsDateString, IsString, Length } from "class-validator";


export class CreateEventDto {
    @IsString()
    @Length(5, 12)
    name: string;

    @Length(5, 255)
    description: string;

    @IsDateString()
    when: string;

    // @Length(9, 255, {groups: ['update']})
    @Length(5, 255, {groups: ['create']})
    address: string;
}