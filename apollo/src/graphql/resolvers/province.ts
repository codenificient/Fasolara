// const { ApolloError } = require("apollo-server-errors")
// const Province = require("../../models/province")
// const { combineResolvers } = require("graphql-resolvers")
// const { isAuthenticated } = require("./middleware")
// const { isValid } = require("../../helpers/validateId")

// module.exports = {
//   Mutation: {
//     createProvince: async (_, { createProvinceInput }) => {
//       try {
//         // See if an old comment exists with same user and message
//         const oldProvince = await Province.findOne({
//           userId: createProvinceInput.userId,
//         })

//         if (oldProvince) {
//           throw new ApolloError(
//             `A Province already exists with ID ${createProvinceInput.userId}`,
//             "Province_ALREADY_EXISTS"
//           )
//         }
//         // Build mongoose model
//         const newProvince = new Province({
//           ...createProvinceInput,
//         })

//         // Save the user object
//         const res = await newProvince.save()

//         return {
//           id: res.id,
//           ...res._doc,
//         }
//       } catch (error) {
//         console.log(error)
//         throw error
//       }
//     },
//     updateProvince: combineResolvers(
//       isAuthenticated,
//       async (_, { updateProvinceInput }) => {
//         try {
//           // See if an old user exists with same email
//           const oldProvince = await Province.findById(updateProvinceInput.id)

//           if (!oldProvince) {
//             throw new ApolloError(
//               "No Province was found with ID " + updateProvinceInput.id,
//               "Province_NOT_FOUND"
//             )
//           }

//           // Update old account
//           const res = await Province.findOneAndUpdate(
//             { id: updateProvinceInput.id },
//             { updateProvinceInput },
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
//     province: async (_, { id }, __) => {
//       if (!isValid(id)) {
//         throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
//       }
//       return await Province.findById(id)
//     },
//     provinces: async () => await Province.find({}),
//   },
// }
