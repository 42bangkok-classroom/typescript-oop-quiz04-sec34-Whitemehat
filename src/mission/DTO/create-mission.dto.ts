import { IsString, IsDateString } from 'class-validator';
export class CreateMissionDTO {
  @IsString()
  codename: string;

  @IsString()
  riskLevel: string;

  @IsString()
  targetName: string;

  @IsString()
  @IsDateString()
  startDate: string;
}
