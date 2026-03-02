import { Status } from "./mission.enum"
export interface IMission {
    id: string
    codename: string
    status: Status
    targetName: string
    riskLevel: string
    startDate: string
    endDate: string
}