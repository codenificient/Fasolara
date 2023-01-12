import { GraphQLError } from 'graphql'
import { skip } from "graphql-resolvers"

export const isAuthenticated = ( email: string) =>
{
  if ( !email )
  {
    throw new GraphQLError(
      "Access Denied! Please login to continue",
    )
  }
  return skip
}

export const canModifyData = ( parent: any, ctx: any, role: any ) =>
{
  if ( parent.createdBy !== ctx.userId || role !== "admin" || role !== "manager" )
  {
    throw new GraphQLError(
      "Not authorized to Edit as Owner",
    )
  }
  return skip
}

interface Role
{
  role: "admin" | "manager" | "employee"
}

export const canViewProject = ( role: any ) =>
{
  if ( role !== "admin" || role !== "manager" || role !== "employee" )
  {
    throw new GraphQLError(
      "Not authorized to View as Employee",
    )
  }
  return skip
}
