import { skip, combineResolvers } from "graphql-resolvers";
import { ApolloError } from "../../helpers/grahql.js";
import { IUser } from "../../models/user.js"

interface IContext {
  user?: IUser;
  email: string;
  token?: string;
  addressId?: string;
  role?: string;
  groupId?: string;
  teamId?: string;
  villageId?: string;
}

export const isAuthenticated = (root, args, { user }: IContext) => {
  if (!user) {
    return ApolloError(
      "Access Denied! Please login to continue",
      "USER_ACCESS_DENIED"
    );
  }
  return skip;
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  (root, args, { user: { role } }) =>
    role === "admin" ? skip : new Error("Not authorized")
);

export const canModifyData = (root, args, { role, user }) => {
  if (root.createdBy !== user.id || role !== "admin" || role !== "manager") {
    return ApolloError(
      "Not authorized to Edit as Owner or Admin",
      "NOT_AUTHORIZED"
    );
  }
  return skip;
};

interface Role {
  role: "admin" | "manager" | "employee";
}

export const canViewProject = (root, args, { role }) => {
  if (role !== "admin" || role !== "manager" || role !== "employee") {
    return ApolloError("Not authorized to View as Employee", "NOT_AUTHORIZED");
  }
  return skip;
};
