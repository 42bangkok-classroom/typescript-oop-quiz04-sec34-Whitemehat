import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDTO } from './DTO/create-mission.dto';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get('summary')
  getSummary() {
    return this.missionService.getSummary();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('clearance') clearance: string = 'STANDARD',
  ) {
    return this.missionService.findOne(id, clearance);
  }

  @Post()
  create(@Body() createDto: CreateMissionDTO) {
    return this.missionService.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.missionService.remove(id);
  }
}
