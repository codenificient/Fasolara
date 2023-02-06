import { ApolloError } from '../../helpers/grahql.js'
import { skip } from "graphql-resolvers"

export const isAuthenticated = ( email: string ) =>
{
	if ( !email )
	{
		return ApolloError(
			"Access Denied! Please login to continue",
			"USER_ACCESS_DENIED"
		)
	}
	return skip
}

export const canModifyData = ( parent: any, ctx: any, role: any ) =>
{
	if ( parent.createdBy !== ctx.userId || role !== "admin" || role !== "manager" )
	{
		return ApolloError(
			"Not authorized to Edit as Owner",
			"NOT_AUTHORIZED",
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
		return ApolloError(
			"Not authorized to View as Employee",
			"NOT_AUTHORIZED",
		)
	}
	return skip
}