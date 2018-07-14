import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'Password must be at least 5 characters'
              }
            ]
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({
          ...otherArgs,
          password: hashedPassword
        });
        return {
          ok: true,
          user
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models)
        };
      }
    }
  }
};
