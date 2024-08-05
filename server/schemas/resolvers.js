const { User } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        async me(_, { id, username }) {
            try {
                const foundUser = await User.findOne({ $or: [{ _id: id }, { username }] });
                return foundUser;
            } catch (error) {
                throw new Error("Cannot find user");
            }
        },
    },
    Mutation: {
        async addUser(_, { username, email, password }) {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user);
                return { token, user };
            } catch (error) {
                throw new Error("Failed to create user");
            }
        },
        async login(_, { emailOrUsername, password }) {
            try {
                const user = await User.findOne({ $or: [{ username: emailOrUsername }, { email: emailOrUsername }] });
                if (!user) {
                    throw new Error("User not found");
                }
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new Error("Incorrect password");
                }
                const token = signToken(user);
                return { token, user };
            } catch (error) {
                throw new Error("Failed to log in");
            }
        },
        async saveBook(_, { book }, { user }) {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (error) {
                throw new Error("Failed to save book");
            }
        },
        async removeBook(_, { bookId }, { user }) {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                throw new Error("Failed to delete book");
            }
        },
    },
};

module.exports = resolvers;