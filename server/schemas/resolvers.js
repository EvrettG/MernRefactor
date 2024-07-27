// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username });
        },
    },

    Mutation: {

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

        saveBook: async (parent, { user, book }, context) =>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._Id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                ).populate('savedBooks');;
                return updatedUser;
            } 
            throw AuthenticationError;
          },

          removeBook: async (parent, {bookIdPara}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: bookIdPara } } },
                    { new: true }
                ).populate('savedBooks');;
                return updatedUser;
            }
            throw AuthenticationError;
          }
    },
}

module.exports = resolvers;