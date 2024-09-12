import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  // Um papel pode ser atribuído a vários usuários
  @HasMany(() => User)
  users!: User[];
}
