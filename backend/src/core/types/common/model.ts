export type TTimestamps = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TDefaultModel = {
  id?: number;
} & TTimestamps;
