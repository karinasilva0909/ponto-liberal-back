import { Table, Column, Model, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Profile } from './Profile';
import { Role } from './Role';
import { UserProfile } from './UserProfile';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailVerified!: boolean;

  @BelongsToMany(() => Profile, () => UserProfile)
  profiles!: Profile[];

  // Especificar a chave estrangeira para Role
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;
}
