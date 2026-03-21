import { Injectable } from '@nestjs/common';

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

  summary() {
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
