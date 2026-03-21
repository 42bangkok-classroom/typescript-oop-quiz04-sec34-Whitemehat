import { Injectable } from '@nestjs/common';
import { IMission } from './interface/mission.interface';
import * as fs from "fs"
import * as path from "path"
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
  
  findAll(): IMission[] {
    const result : IMission[] = [];
    const filepath = path.join(__dirname , "../../data/missions.json");
    const rawData = fs.readFileSync(filepath , "utf-8");
    const data = JSON.parse(rawData);

    for(const mission of data){
      const start = mission.startDate ? new Date(mission.startDate) : null
      const end = mission.endDate ? new Date(mission.endDate) : null

      let duration = -1;

      if(start && end){
        const different = end.getTime() - start.getTime();
        duration = Math.floor(different / (1000 * 60 * 60 * 24));
      }

      const format : IMission = {
        id: mission.id,
        codename: mission.codename,
        status: mission.status,
        startDate: mission.startDate,
        endDate: mission.endDate,
        durationDays: duration 
      }

      result.push(format)
    }
    return result
  }

  findOne(id: string, clearance: string): IMission{
    const filepath = path.join(__dirname , "../../data/missions.json");
    const rawData = fs.readFileSync(filepath , "utf-8");
    const data = JSON.parse(rawData);
    const mission_need = data.find(m => m.id === id);
    if((mission_need.riskLevel === "HIGH" || mission_need.riskLevel === "CRITICAL") && clearance !== "TOP_SECRET"){
      return {
      ...mission_need,
      targetName: '***REDACTED***'
      }
    }
    else{
      return {
      id: mission_need.id,
      ...mission_need
    }
    }
  }

  getSummary() {
    let active: number = 0;
    let completed: number = 0;
    let failed: number = 0;
    const data = this.missions;
    for (const d of data) {
      const data_status = d.status;
      if (data_status === 'ACTIVE') {
        active++;
      } else if (data_status === 'FAILED') {
        failed++;
      } else if (data_status === 'COMPLETED') {
        completed++;
      }
    }
    return {
      ACTIVE: active,
      COMPLETED: completed,
      FAILED: failed,
    };
  }
}
