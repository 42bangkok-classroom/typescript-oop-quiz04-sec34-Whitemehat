import { Injectable } from '@nestjs/common';
import { IMission } from "./mission.interface"
//import { CreateMissionDto } from './dto/create-mission.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MissionService {
  private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' },
  ];
  getSummary() {
    let active: number = 0;
    let failed: number = 0;
    let completed: number = 0;
    for (const m of this.missions) {
      const missionStatus = m.status;
      if (missionStatus === 'ACTIVE') {
        active++;
      } else if (missionStatus === 'FAILED') {
        failed++;
      } else if (missionStatus === 'COMPLETED') {
        completed++;
      }
    }
    return {
      ACTIVE: active,
      COMPLETED: completed,
      FAILED: failed,
    };
  }

  findAll() {
    const filePath = path.join(process.cwd() , 'data/missions.json');
    const data = fs.readFileSync(filePath , 'utf-8');
    const mission = JSON.parse(data)
    return mission as IMission ;
  }

  findOne(id: number) {
    return `This action returns a #${id} mission`;
  }
}
