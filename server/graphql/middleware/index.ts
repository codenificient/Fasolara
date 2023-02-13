import { skip } from "graphql-resolvers"
import { ApolloError } from '../../helpers/grahql.js'

export const isAuthenticated = ( req, res, next ) =>
{
	if ( !req.email )
	{
		return ApolloError(
			"Access Denied! Please login to continue",
			"USER_ACCESS_DENIED"
		)
	}
	return skip
}

export const canModifyData = ( parent, args, context ) =>
{
	if ( parent.createdBy !== context.userId || context.role !== "admin" || context.role !== "manager" )
	{
		return ApolloError(
			"Not authorized to Edit as Owner or Admin",
			"NOT_AUTHORIZED",
		)
	}
	return skip
}

interface Role
{
	role: "admin" | "manager" | "employee"
}

export const canViewProject = ( parent, args, context ) =>
{
	if ( context.role !== "admin" || context.role !== "manager" || context.role !== "employee" )
	{
		return ApolloError(
			"Not authorized to View as Employee",
			"NOT_AUTHORIZED",
		)
	}
	return skip
}