import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

@Injectable()
export class MissionService {
  private readonly missions = [
  { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
  { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
  { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
  { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
  { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
  { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
];
  getSummary(){
    let active: number = 0
    let failed: number = 0
    let completed : number = 0
    for( const m of this.missions){
      const missionStatus = m.status
      if(missionStatus === "ACTIVE"){
        active++;
      }
      else if(missionStatus === "FAILED"){
        failed++;
      }
      else if(missionStatus === "COMPLETED"){
        completed++
      }
    }
    return {
  ACTIVE: active,
  COMPLETED: completed,
  FAILED: failed
}
  }
  create(createMissionDto: CreateMissionDto) {
    return 'This action adds a new mission';
  }

  findAll() {
    return `This action returns all mission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mission`;
  }

  update(id: number, updateMissionDto: UpdateMissionDto) {
    return `This action updates a #${id} mission`;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}
