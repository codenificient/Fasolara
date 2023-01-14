const { ApolloError } = require("apollo-server-errors");
const Team = require("../../models/team");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./middleware");
const { isValid } = require("../../helpers/validateId");

module.exports = {
  Mutation: {
    createTeam: async (_, { createTeamInput }) => {
      try {
        // See if an old Team exists with same name and branch
        const oldTeamByLead = await Team.findOne({
          managerId: createTeamInput.managerId,
          teamLeadId: createTeamInput.teamLeadId,
        });

        if (oldTeamByLead) {
          throw new ApolloError(
            `An Team already with manager ID ${createTeamInput.managerId}`,
            "TEAM_ALREADY_EXISTS"
          );
        }

        // Build mongoose model
        const newTeam = new Team({
          ...createTeamInput,
        });

        // Save the user object
        const res = await newTeam.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateTeam: combineResolvers(
      isAuthenticated,
      async (_, { updateTeamInput }) => {
        try {
          // See if an old user exists with same email
          const oldTeam = await Team.findById(updateTeamInput.id);

          if (!oldTeam) {
            throw new ApolloError(
              "No Team was found with ID " + updateTeamInput.id,
              "ACCOUNT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Team.findOneAndUpdate(
            { _id: updateTeamInput.id },
            { updateTeamInput },
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
    updateTeamMember: combineResolvers(
      isAuthenticated,
      async (_, { addTeamInput }) => {
        try {
          // See if an old user exists with same email
          const oldTeam = await Team.findById(addTeamInput.id);

          if (!oldTeam) {
            throw new ApolloError(
              "No Team was found with ID " + addTeamInput.id,
              "ACCOUNT_NOT_FOUND"
            );
          }

          // Update old account
          let res = null;
          if (addTeamInput.memberIds?.length > 1) {
            res = await Team.findByIdAndUpdate(
              { _id: addTeamInput.id },
              {
                $push: {
                  memberIds: { $each: addTeamInput.memberIds },
                },
              },
              { new: true }
            );
          } else {
            res = await Team.findOneAndUpdate(
              { _id: addTeamInput.id },
              { $push: { memberIds: addTeamInput.memberId } },
              { new: true }
            );
          }

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
    /* fieldName:(root, args, context, info) => { result } */
    team: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const account = await Team.findOne({ customerId: userId });
        if (!account) {
          throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
        }
        return account;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    getTeam: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Team.findById(id);
    },
    teams: async () => await Team.find({}),
  },
};
