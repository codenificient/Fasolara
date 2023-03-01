import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Project from "../../models/project.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Project model stores information to track various business activities. Everything is a project, for management purposes
  """
  type Project {
    id: ID
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    managerId: ID
    teamIds: [TeamId]
    branch: String
    impact: Float
    suppliers: [Supplier]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Supplier {
    supplierId: ID
    hiringDate: Date
  }

  input CreateProjectInput {
    id: ID
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    supplierId: ID
    teamIds: [ID!]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type TeamId {
    teamId: ID
  }

  input TeamIdInput {
    teamId: ID
  }

  input UpdateProjectInput {
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    supplierId: ID
    teamId: ID
    teamIds: [ID!]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input SupplierInput {
    supplierId: ID
    hiringDate: Date
  }

  input AddSupplierInput {
    id: ID
    supplier: SupplierInput
    suppliers: [SupplierInput!]
  }

  input AddTeamInput {
    id: ID
    teamId: TeamIdInput
    teamIds: [TeamIdInput!]
  }

  extend type Query {
    project: [Project]
    getProject(id: ID): Project
    projects: [Project!]
  }

  extend type Mutation {
    createProject(createProjectInput: CreateProjectInput): Project
    updateProject(updateProjectInput: UpdateProjectInput): Project
    updateProjectSupplier(addSupplierInput: AddSupplierInput): Project
    updateProjectSuppliers(addSupplierInput: AddSupplierInput): Project
    updateProjectTeam(addTeamInput: AddTeamInput): Project
    updateProjectTeams(addTeamInput: AddTeamInput): Project
  }
  extend type Subscription {
    projectCreated: Project
    projectUpdated: Project
    projectDeleted: Boolean
  }
`;

const resolvers = {
  Mutation: {
    createProject: async (_, { createProjectInput }) => {
      try {
        // See if an old comment exists with same name and address
        const oldProject = await Project.findOne({
          name: createProjectInput.name,
          addressId: createProjectInput.addressId,
        });

        if (oldProject) {
          return ApolloError(
            `A Project already exists with ID ${createProjectInput.userId}`,
            "PROJECT_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newProject = new Project({
          ...createProjectInput,
        });

        // Save the user object
        const res = await newProject.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateProject: combineResolvers(
      isAuthenticated,
      async (_, { updateProjectInput }) => {
        try {
          // See if an old user exists with same email
          const oldProject = await Project.findById(updateProjectInput.id);

          if (!oldProject) {
            return ApolloError(
              "No Project was found with ID " + updateProjectInput.id,
              "PROJECT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Project.findOneAndUpdate(
            { _id: updateProjectInput.id },
            { updateProjectInput },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    updateProjectSupplier: combineResolvers(
      isAuthenticated,
      async (_, { addSupplierInput }) => {
        try {
          // See if an old user exists with same email
          const oldProject = await Project.findById(addSupplierInput.id);

          if (!oldProject) {
            return ApolloError(
              "No Project was found with ID " + addSupplierInput.id,
              "PROJECT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Project.findByIdAndUpdate(
            { _id: addSupplierInput.id },
            { $addToSet: { suppliers: addSupplierInput.supplier } },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    updateProjectSuppliers: combineResolvers(
      isAuthenticated,
      async (_, { addSupplierInput }) => {
        try {
          // See if an old user exists with same email
          const oldProject = await Project.findById(addSupplierInput.id);

          if (!oldProject) {
            return ApolloError(
              "No Project was found with ID " + addSupplierInput.id,
              "PROJECT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Project.findByIdAndUpdate(
            { _id: addSupplierInput.id },
            {
              $addToSet: {
                suppliers: {
                  $each: addSupplierInput.suppliers,
                },
              },
            },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    updateProjectTeam: combineResolvers(
      isAuthenticated,
      async (_, { addTeamInput }) => {
        try {
          // See if an old user exists with same email
          const oldProject = await Project.findById(addTeamInput.id);

          if (!oldProject) {
            return ApolloError(
              "No Project was found with ID " + addTeamInput.id,
              "PROJECT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Project.findByIdAndUpdate(
            { _id: addTeamInput.id },
            {
              $addToSet: {
                teamIds: addTeamInput.teamId,
              },
            },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    updateProjectTeams: combineResolvers(
      isAuthenticated,
      async (_, { addTeamInput }) => {
        try {
          // See if an old user exists with same email
          const oldProject = await Project.findById(addTeamInput.id);

          if (!oldProject) {
            return ApolloError(
              "No Project was found with ID " + addTeamInput.id,
              "PROJECT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Project.findByIdAndUpdate(
            { _id: addTeamInput.id },
            {
              $addToSet: {
                teamIds: {
                  $each: addTeamInput.teamIds,
                },
              },
            },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
  Query: {
    project: combineResolvers(isAuthenticated, async (_, __, {teamId} ) => {
      try {
        // Return all the projects where 1 of the teamIds matches the team this user is part of
        return await Project.find({ teamIds: { $in: [teamId] } });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    /* fieldName:(root, args, context, info) => { result } */
    getProject: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Project.findById(id);
    },
    projects: async () => await Project.find({}),
  },
  Subscription: {
    projectCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("projectCreated"),
        (payload, variables) => {
          return payload.projectCreated.location === variables.location;
        }
      ),
    },
    projectUpdated: {
      subscribe: () => pubsub.asyncIterator("projectUpdated"),
    },
    projectDeleted: {
      subscribe: () => pubsub.asyncIterator("projectDeleted"),
    },
  },
};

export { resolvers, typeDefs };
