// const { ApolloError } = require("apollo-server-errors")
// const Project = require("../../models/project")
// const { combineResolvers } = require("graphql-resolvers")
// const { isAuthenticated } = require("./middleware")
// const { isValid } = require("../../helpers/validateId")

// module.exports = {
//   Mutation: {
//     createProject: async (_, { createProjectInput }) => {
//       try {
//         // See if an old comment exists with same name and address
//         const oldProject = await Project.findOne({
//           name: createProjectInput.name,
//           addressId: createProjectInput.addressId,
//         })

//         if (oldProject) {
//           throw new ApolloError(
//             `A Project already exists with ID ${createProjectInput.userId}`,
//             "PROJECT_ALREADY_EXISTS"
//           )
//         }
//         // Build mongoose model
//         const newProject = new Project({
//           ...createProjectInput,
//         })

//         // Save the user object
//         const res = await newProject.save()

//         return {
//           id: res.id,
//           ...res._doc,
//         }
//       } catch (error) {
//         console.log(error)
//         throw error
//       }
//     },
//     updateProject: combineResolvers(
//       isAuthenticated,
//       async (_, { updateProjectInput }) => {
//         try {
//           // See if an old user exists with same email
//           const oldProject = await Project.findById(updateProjectInput.id)

//           if (!oldProject) {
//             throw new ApolloError(
//               "No Project was found with ID " + updateProjectInput.id,
//               "PROJECT_NOT_FOUND"
//             )
//           }

//           // Update old account
//           const res = await Project.findOneAndUpdate(
//             { id: updateProjectInput.id },
//             { updateProjectInput },
//             { new: true }
//           )

//           return {
//             id: res.id,
//             ...res._doc,
//           }
//         } catch (error) {
//           console.log(error)
//           throw error
//         }
//       }
//     ),
//   },
//   Query: {
//     project: combineResolvers(isAuthenticated, async (_, __, { teamId }) => {
//       try {
//         // Return all the projects where 1 of the teamIds matches the team this user is part of
//         return await Project.find({ teamIds: { $in: [teamId] } })
//       } catch (error) {
//         console.log(error)
//         throw error
//       }
//     }),
//     getProject: async (_, { id }, __) => {
//       if (!isValid(id)) {
//         throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
//       }
//       return await Project.findById(id)
//     },
//     projects: async () => await Project.find({}),
//   },
// }
