const { ApolloError } = require("apollo-server-errors")
const Salary = require("../../models/salary")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createSalary: async (_, { createSalaryInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldSalary = await Salary.findOne({
          userId: createSalaryInput.userId,
        })

        if (oldSalary) {
          throw new ApolloError(
            `A Salary already exists with ID ${createSalaryInput.userId}`,
            "Salary_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newSalary = new Salary({
          ...createSalaryInput,
        })

        // Save the user object
        const res = await newSalary.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateSalary: combineResolvers(
      isAuthenticated,
      async (_, { updateSalaryInput }) => {
        try {
          // See if an old user exists with same email
          const oldSalary = await Salary.findById(updateSalaryInput.id)

          if (!oldSalary) {
            throw new ApolloError(
              "No Salary was found with ID " + updateSalaryInput.id,
              "Salary_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Salary.findOneAndUpdate(
            { _id: updateSalaryInput.id },
            { updateSalaryInput },
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
    salary: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Salary.findById(id)
    },
    salaries: async () => await Salary.find({}),
  },
}
