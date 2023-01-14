const { ApolloError } = require("apollo-server-errors")
const Employee = require("../../models/employee")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createEmployee: async (_, { createEmployeeInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldEmployee = await Employee.findOne({
          userId: createEmployeeInput.userId,
        })

        if (oldEmployee) {
          throw new ApolloError(
            `A Employee already exists with ID ${createEmployeeInput.userId}`,
            "EMPLOYEE_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newEmployee = new Employee({
          ...createEmployeeInput,
        })

        // Save the user object
        const res = await newEmployee.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateEmployee: combineResolvers(
      isAuthenticated,
      async (_, { updateEmployeeInput }) => {
        try {
          // See if an old user exists with same email
          const oldEmployee = await Employee.findById(updateEmployeeInput.id)

          if (!oldEmployee) {
            throw new ApolloError(
              "No Employee was found with ID " + updateEmployeeInput.id,
              "EMPLOYEE_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Employee.findOneAndUpdate(
            { _id: updateEmployeeInput.id },
            { updateEmployeeInput },
            { new: true }
          )

          return {
            id: res.id,
            ...res._doc,
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      }
    ),
  },
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    employee: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Employee.findById(id)
    },
    employees: async () => await Employee.find({}),
  },
}
