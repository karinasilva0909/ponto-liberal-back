import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'genders',
  timestamps: false,
})
export class Gender extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;
}
