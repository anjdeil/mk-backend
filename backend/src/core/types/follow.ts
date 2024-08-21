import { TDefaultModel } from './common';

export type TFollow = {
    followerId: number;
    followingId: number;
} & TDefaultModel;
