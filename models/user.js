import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Username already exists'
        },
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The username can only contain letters and numbers'
          },
          len: {
            args: [3, 25],
            msg: 'The username needs to be 3 - 25 characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email already exists'
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Password must be at least 5 characters long'
          }
        }
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        }
      }
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return User;
};
