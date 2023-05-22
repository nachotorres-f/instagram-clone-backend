import { config } from '../../utils/config';
import { hashSync } from 'bcrypt';
import { sequelize } from '../db';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare active?: boolean;
  declare codeActivation: number | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const rawValue = this.getDataValue('username');
        return rawValue ? rawValue.toLowerCase() : null;
      },
      set(value: string) {
        this.setDataValue('username', value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'It must be a valid Email address' },
      },
      get() {
        const rawValue = this.getDataValue('email');
        return rawValue ? rawValue.toLowerCase() : null;
      },
      set(value: string) {
        this.setDataValue('email', value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('password', hashSync(value, config.HASH_SALT));
      },
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
    },
    codeActivation: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'users' }
);
