import { GraphQLError } from 'graphql'
import { combineResolvers } from "graphql-resolvers"
import { isValid } from "../../helpers/validateId"
import { isAuthenticated } from "./middleware"
const Employee = require( "../../models/employee" )

module.exports = {
  Mutation: {
    createEmployee: async ( _, { createEmployeeInput } ) =>
    {
      try
      {
        // See if an old comment exists with same user and message
        const oldEmployee = await Employee.findOne( {
          userId: createEmployeeInput.userId,
        } )

        if ( oldEmployee )
        {
          throw new GraphQLError(
            `A Employee already exists with ID ${createEmployeeInput.userId}`,
          )
        }
        // Build mongoose model
        const newEmployee = new Employee( {
          ...createEmployeeInput,
        } )

        // Save the user object
        const res = await newEmployee.save()

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
    updateEmployee: combineResolvers(
      isAuthenticated,
      async ( _, { updateEmployeeInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldEmployee = await Employee.findById( updateEmployeeInput.id )

          if ( !oldEmployee )
          {
            throw new GraphQLError(
              "No Employee was found with ID " + updateEmployeeInput.id,
            )
          }

          // Update old account
          const res = await Employee.findOneAndUpdate(
            { id: updateEmployeeInput.id },
            { updateEmployeeInput },
            { new: true }
          )

          return {
            id: res.id,
            ...res._doc,
          }
        } catch ( error )
        {
          console.log( error )
          throw error
        }
      }
    ),
  },
  Query: {
    employee: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid", )
      }
      return await Employee.findById( id )
    },
    employees: async () => await Employee.find( {} ),
  },
}
