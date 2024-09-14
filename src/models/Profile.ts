import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Gender } from './Gender';
import { UserProfile } from './UserProfile';

@Table({
  tableName: 'profiles',
  timestamps: true,
})
export class Profile extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city?: string;

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  genderId!: number;

  @BelongsTo(() => Gender)
  gender!: Gender;

  @BelongsToMany(() => User, () => UserProfile)
  users!: User[];
}
