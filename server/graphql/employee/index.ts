import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Employee from "../../models/employee.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Employee model is a superset of user for partners employeed at the company. Education, promotions, salary info
  """
  type Employee {
    id: ID
    userId: ID
    accountId: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    role: String
    promotions: [Promotion!]
    createdAt: Date
    updatedAt: Date
  }

  type Promotion {
    jobTitle: String
    baseSalary: Float
    startDate: Date
    endDate: Date
  }

  input PromotionInput {
    baseSalary: Float
    jobTitle: String
    startDate: Date
    endDate: Date
  }

  input CreateEmployeeInput {
    id: ID
    userId: String
    accountId: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    role: String
    promotion: PromotionInput
    promotions: [PromotionInput!]
    updatedAt: Date
  }

  input UpdateEmployeeInput {
    id: ID
    userId: String
    accountId: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    role: String
    promotion: PromotionInput
    updatedAt: Date
  }

  extend type Query {
    employee: Employee
    getEmployee(id: ID): Employee
    employees: [Employee!]
  }

  extend type Mutation {
    createEmployee(createEmployeeInput: CreateEmployeeInput): Employee
    updateEmployee(updateEmployeeInput: UpdateEmployeeInput): Employee
    removeEmployee(id: ID): Boolean
  }
  extend type Subscription {
    employeeCreated: Employee
    employeeUpdated: Employee
    employeeDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    employee: combineResolvers(
      isAuthenticated,
      async (_, __,  { user } ) => {
        try {
          const employee = await Employee.findOne({ userId: user.id });
          if (!employee) {
            return ApolloError("Employee not found", "EMPLOYEE_NOT_FOUND");
          }
          return employee;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getEmployee: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Employee.findById(id);
    },
    employees: async () => await Employee.find({}),
  },
  Mutation: {
    createEmployee: async (_, { createEmployeeInput }) => {
      try {
        // See if an old Employee exists with same name and branch
        const oldEmployeeByBranch = await Employee.findOne({
          name: createEmployeeInput.name,
          branch: createEmployeeInput.branch,
        });
        if (oldEmployeeByBranch) {
          return ApolloError(
            `An Employee already with name ${createEmployeeInput.name} and branch ${createEmployeeInput.branch}`,
            "EMPLOYEE_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newEmployee = new Employee({
          ...createEmployeeInput,
        });
        // Save the user object
        const res = await newEmployee.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateEmployee: combineResolvers(
      isAuthenticated,
      async (_, { updateEmployeeInput }) => {
        try {
          // See if an old user exists with same email
          const oldEmployee = await Employee.findById(updateEmployeeInput.id);
          if (!oldEmployee) {
            return ApolloError(
              "No Employee was found with ID " + updateEmployeeInput.id,
              "EMPLOYEE_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Employee.findOneAndUpdate(
            { _id: updateEmployeeInput.id },
            { updateEmployeeInput },
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
    removeEmployee: async (id: string) =>
      await Employee.findByIdAndRemove({ _id: id }),
  },
  Subscription: {
    employeeCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("EmployeeCreated"),
        (payload, variables) => {
          return payload.EmployeeCreated.location === variables.location;
        }
      ),
    },
    employeeUpdated: {
      subscribe: () => pubsub.asyncIterator("employeeUpdated"),
    },
    employeeDeleted: {
      subscribe: () => pubsub.asyncIterator("employeeDeleted"),
    },
  },
};

export { resolvers, typeDefs };
