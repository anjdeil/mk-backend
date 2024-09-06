import { TDefaultModel } from './common/model';
import { TUser } from './user';
import { ReportStatus } from '../enums/reports';

export type TReport = {
  report: string;
  userId: number;
  status?: ReportStatus;
  managerId?: number;
  musicId: number;
  reportedsubjectid?: number;
  user?: TUser;
  manager?: TUser;
} & TDefaultModel;
