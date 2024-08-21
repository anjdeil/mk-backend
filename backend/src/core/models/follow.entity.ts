import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import User from './user.entity';

@Table({ tableName: 'follows', freezeTableName: true })
export default class Follow extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  followerId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  followingId: number;

  @BelongsTo(() => User, 'followerId')
  follower: User;

  @BelongsTo(() => User, 'followingId')
  following: User;
}
