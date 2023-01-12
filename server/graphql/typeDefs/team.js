const { gql } = require("apollo-server");

module.exports = gql`
  """
  The Team model stores information about Teams of employees working on the mission
  """
  type Team {
    id: ID
    name: String
    motto: String
    specialty: String
    managerId: ID
    astManagerId: ID
    teamLeadId: ID
    memberIds: [MemberId!]
    createdBy: User
    createdAt: Date
    updatedAt: Date
  }

  type MemberId {
    userId: ID
  }

  input CreateTeamInput {
    id: ID
    name: String
    motto: String
    specialty: String
    managerId: ID
    astManagerId: ID
    teamLeadId: ID
    memberIds: [MemberIdInput!]
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  input UpdateTeamInput {
    name: String
    motto: String
    specialty: String
    managerId: ID
    astManagerId: ID
    teamLeadId: ID
    memberIds: [ID!]
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  input MemberIdInput {
    userId: ID
  }

  input AddTeamInput {
    id: ID
    memberIds: [MemberIdInput!]
    memberId: MemberIdInput
  }

  extend type Query {
    team: Team
    getTeam(id: ID): Team
    teams: [Team!]
  }

  extend type Mutation {
    createTeam(createTeamInput: CreateTeamInput): Team
    updateTeam(updateTeamInput: UpdateTeamInput): Team
    updateTeamMember(addTeamInput: AddTeamInput): Team
    removeTeam(id: ID): Boolean
  }
`;
