import bcrypt from "bcryptjs";
import { combineResolvers } from "graphql-resolvers";
import { PubSub } from "graphql-subscriptions";
import { gql } from "graphql-tag";
import jwt from "jsonwebtoken";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import User from "../../models/user.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  type User {
    id: ID
    cnib: String
    nationality: String
    firstname: String
    midname: String
    lastname: String
    username: String
    fullName: String
    mobileNumber: String
    addressId: ID
    accountId: ID
    dob: Date
    role: String
    isActive: Boolean
    email: String
    password: String
    token: String
    avatar: String
    resetToken: String
    activationToken: String
    teamId: ID
    createdAt: Date
    updatedAt: Date
    createdBy: String
  }

  type Token {
    token: String
  }

  input RegisterInput {
    username: String
    email: String!
    password: String!
    mobileNumber: String
    addressId: ID
    accountId: ID
    cnib: String
    firstname: String!
    midname: String
    lastname: String!
    dob: Date
    role: String
    token: String
    avatar: String
    resetToken: String
    activationToken: String
    teamId: ID
    createdBy: String
  }

  input UpdateUserInput {
    id: ID!
    username: String
    email: String!
    password: String!
    addressId: ID
    accountId: ID
    cnib: String
    firstname: String!
    midname: String
    lastname: String!
    dob: Date
    role: String
    resetToken: String
    activationToken: String
    teamId: ID
    avatar: String
    createdBy: String
  }

  input LoginInput {
    email: String
    password: String
  }

  extend type Query {
    user: User
    getUser(id: ID): User
    users: [User!]
  }

  extend type Mutation {
    registerUser(registerInput: RegisterInput): User
    updateUser(updateUserInput: UpdateUserInput): User
    loginUser(loginInput: LoginInput): Token
  }

  extend type Subscription {
    userCreated: User
    userUpdated: User
    userDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* field:(root, args, context, info) => { result } */
    user: combineResolvers(isAuthenticated, async (_, __, {email} ) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return ApolloError("User not found", "USER_NOT_FOUND");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    getUser: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await User.findById(id);
    },
    users: async () => await User.find({}),
  },
  Mutation: {
    registerUser: async (
      _,
      { registerInput: { email, password, ...rest } }
    ) => {
      try {
        // See if an old user exists with same email
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return ApolloError(
            "A user already exists with email" + email,
            "USER_ALREADY_EXISTS"
          );
        }
        // hash password
        const encryptedPass = await bcrypt.hash(password, 10);
        // Build mongoose model
        const newUser = new User({
          ...rest,
          email: email.toLowerCase(),
          password: encryptedPass,
        });
        // Generate a new token
        const token = jwt.sign(
          { user_id: newUser._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        newUser.token = token;
        // Save the user object
        const res = await newUser.save();
        pubsub.publish("USER_ADDED", {
          userAdded: { ...res },
        });
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    loginUser: async (_, { loginInput: { email, password } }) => {
      try {
        // See if this user exists
        const user = await User.findOne({ email });
        if (!user) {
          return ApolloError("User not found", "USER_NOT_FOUND");
        }
        // check correct password
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          // create a new token and attach
          user.token = token;
          // return found user
          return {
            id: user.id,
            ...user._doc,
          };
        } else {
          // Return incorrect password
          return ApolloError(
            "Email or password is incorrect",
            "INCORRECT_PASSWORD"
          );
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateUser: async (_, { updateUserInput }) => {
      try {
        // See if this user exists
        const user = await User.findById(updateUserInput.id);
        if (!user) {
          return ApolloError("User not found", "USER_NOT_FOUND");
        }
        // Update old account
        const res = await User.findOneAndUpdate(
          { _id: updateUserInput.id },
          { updateUserInput },
          { new: true }
        );
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        return ApolloError(error.message, error.code);
      }
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator("userCreated"),
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator("userUpdated"),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator("userDeleted"),
    },
  },
};

export { typeDefs, resolvers };
