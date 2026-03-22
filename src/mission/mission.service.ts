import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateMissionDTO } from './DTO/create-mission.dto';
import { Mission } from './mission-data.interface';
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

  findAll(): Mission[] {
    const result: Mission[] = [];
    const filepath = path.join(__dirname, '../../data/missions.json');
    const rawData = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(rawData) as Mission[];

    for (const mission of data) {
      const start = mission.startDate ? new Date(mission.startDate) : null;
      const end = mission.endDate ? new Date(mission.endDate) : null;

      let duration = -1;

      if (start && end) {
        const different = end.getTime() - start.getTime();
        duration = Math.floor(different / (1000 * 60 * 60 * 24));
      }

      const format = {
        id: mission.id,
        codename: mission.codename,
        status: mission.status,
        riskLevel: mission.riskLevel,
        targetName: mission.targetName,
        startDate: mission.startDate,
        endDate: mission.endDate,
        durationDays: duration,
      };

      result.push(format);
    }
    return result;
  }

  findOne(id: string, clearance: string) {
    const filepath = path.join(__dirname, '../../data/missions.json');
    const rawData = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(rawData) as Mission[];
    const mission_need = data.find((m) => m.id === id);
    if (!mission_need) {
      throw new NotFoundException();
    }
    if (
      (mission_need?.riskLevel === 'HIGH' ||
        mission_need?.riskLevel === 'CRITICAL') &&
      clearance !== 'TOP_SECRET'
    ) {
      return {
        ...mission_need,
        targetName: '***REDACTED***',
      };
    } else {
      return {
        ...mission_need,
      };
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

  create(createDto: CreateMissionDTO): Mission {
    const filepath = path.join(__dirname, '../../data/missions.json');
    const rawData = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(rawData) as Mission[];
    const data_id = data.length;
    const createMission: Mission = {
      id: String(data_id + 1),
      codename: createDto.codename,
      status: 'ACTIVE',
      riskLevel: createDto.riskLevel,
      targetName: createDto.targetName,
      startDate: createDto.startDate,
      endDate: null,
    };
    data.push(createMission);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    return createMission;
  }

  remove(id: string) {
    const filepath = path.join(__dirname, '../../data/missions.json');
    const rawData = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(rawData) as Mission[];
    const found = data.find((d) => d.id === id);
    if (!found) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Not Found',
        error: 'Not Found',
      });
    }
    const newData = data.filter((d) => d.id !== id);
    fs.writeFileSync(filepath, JSON.stringify(newData, null, 2));
    return {
      message: `Mission ID ${id} has been successfully deleted.`,
    };
  }
}
