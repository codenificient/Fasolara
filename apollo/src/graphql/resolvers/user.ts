import { GraphQLError } from 'graphql'
const User = require( "../../models/user" )
const bcrypt = require( "bcryptjs" )
const jwt = require( "jsonwebtoken" )
const { combineResolvers } = require( "graphql-resolvers" )
const { isAuthenticated } = require( "./middleware" )
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
  Mutation: {
    registerUser: async ( _, { registerInput: { email, password, ...rest } } ) =>
    {
      try
      {
        // See if an old user exists with same email
        const oldUser = await User.findOne( { email } )

        if ( oldUser )
        {
          throw new GraphQLError(
            "A user already exists with email" + email,
          )
        }
        // hash password
        const encryptedPass = await bcrypt.hash( password, 10 )

        // Build mongoose model
        const newUser = new User( {
          ...rest,
          email: email.toLowerCase(),
          password: encryptedPass,
        } )

        // Generate a new token
        const token = jwt.sign(
          { user_id: newUser._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        )
        newUser.token = token
        // Save the user object
        const res = await newUser.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    },
    loginUser: async ( _, { loginInput: { email, password } } ) =>
    {
      try
      {
        // See if this user exists
        const user = await User.findOne( { email } )
        if ( !user )
        {
          throw new GraphQLError( "User not found" )
        }
        // check correct password
        if ( user && ( await bcrypt.compare( password, user.password ) ) )
        {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          )
          // create a new token and attach
          user.token = token

          // return found user
          return {
            id: user.id,
            ...user._doc,
          }
        } else
        {
          // Return incorrect password
          throw new GraphQLError(
            "Email or password is incorrect",
          )
        }
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    },
  },
  Query: {
    user: combineResolvers( isAuthenticated, async ( _, __, { email } ) =>
    {
      try
      {
        const user = await User.findOne( { email } )
        if ( !user )
        {
          throw new GraphQLError( "User not found" )
        }
        return user
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getUser: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid" )
      }
      return await User.findById( id )
    },
    users: async () => await User.find( {} ),
  },
}
