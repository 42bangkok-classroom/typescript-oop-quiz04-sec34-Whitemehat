import { Controller, Get} from '@nestjs/common';
import { MissionService } from './mission.service';
//import { CreateMissionDto } from './dto/create-mission.dto';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  //@Post()
  //create(@Body() createMissionDto: CreateMissionDto) {
  //  return this.missionService.create(createMissionDto);
  //}

  //@Get()
  //findAll() {
  //  return this.missionService.findAll();
  //}
  @Get('summary')
  getSummary() {
    return this.missionService.getSummary();
  }
}
