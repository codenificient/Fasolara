import { combineResolvers } from "graphql-resolvers"
import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"

import { ApolloError, isValid } from '../../helpers/grahql.js'
import Comment from "../../models/comment.js"
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub()

const typeDefs = gql`
  type Comment {
    id: ID
    isDisabled: Boolean
    userId: ID
    user: User
    index: Int
    content: String
    createdBy: ID
    createdAt: Date
    updatedAt: Date
    isActive: Boolean
    isArchived: Boolean
  }

  input CreateCommentInput {
    id: ID
    isDisabled: Boolean
    userId: ID
    content: String
    index: Int
    updatedAt: Date
    createdBy: ID
    isActive: Boolean
    isArchived: Boolean
  }

  input UpdateCommentInput {
    id: ID
    isDisabled: Boolean
    content: String
    userId: ID
    index: Int
    updatedAt: Date
    createdBy: ID
    isActive: Boolean
    isArchived: Boolean
  }

  extend type Query {
    comment: Comment
    getComment(id: ID): Comment
    comments: [Comment!]
  }
  extend type Mutation {
    createComment(createCommentInput: CreateCommentInput): Comment
    updateComment(updateCommentInput: UpdateCommentInput): Comment
    removeComment(id: ID): Boolean
  }
  extend type Subscription {
    commentCreated: Comment
    commentUpdated: Comment
  }
`

const resolvers = {
    Query: {
        /* fieldName:(root, args, context, info) => { result } */
        comment: combineResolvers( isAuthenticated, async ( _, __,  {user } ) =>
        {
            try
            {
                const comment = await Comment.findOne({ userId: user.id });
                if ( !comment )
                {
                    return ApolloError( "comment not found", "COMMENT_NOT_FOUND" )
                }
                return comment
            }
            catch ( error )
            {
                console.log( error )
                throw error
            }
        } ),
        getComment: async ( _, { id } ) =>
        {
            if ( !isValid( id ) )
            {
                return ApolloError( "Provided ID is not valid", "INVALID_OBJECT_ID" )
            }
            return await Comment.findById( id )
        },
        comments: async () => await Comment.find( {} ),
    },
    Mutation: {
        createComment: async ( _, { createCommentInput } ) =>
        {
            try
            {
                // See if an old comment exists with same user and message
                const oldCommentByUser = await Comment.findOne( {
                    userId: createCommentInput.userId,
                    content: createCommentInput.content,
                } )
                if ( oldCommentByUser )
                {
                    return ApolloError( `A comment already exists with user ${createCommentInput.userId} and content ${createCommentInput.content}`, "COMMENT_ALREADY_EXISTS" )
                }
                // Build mongoose model
                const newComment = new Comment( {
                    ...createCommentInput,
                } )
                // Save the user object
                const res = await newComment.save()
                return {
                    id: res.id,
                    ...res._doc,
                }
            }
            catch ( error )
            {
                console.log( error )
                throw error
            }
        },
        updateComment: combineResolvers( isAuthenticated, async ( _, { updateCommentInput } ) =>
        {
            try
            {
                // See if an old user exists with same email
                const oldComment = await Comment.findById( updateCommentInput.id )
                if ( !oldComment )
                {
                    return ApolloError( "No comment was found with ID " + updateCommentInput.id, "COMMENT_NOT_FOUND" )
                }
                // Update old account
                const res = await Comment.findOneAndUpdate( { _id: updateCommentInput.id }, { updateCommentInput }, { new: true } )
                return {
                    id: res.id,
                    ...res._doc,
                }
            }
            catch ( error )
            {
                console.log( error )
                throw error
            }
        } ),
        removeComment: async ( id: string ) => await Comment.findByIdAndDelete( id )
    },
    Subscription: {
        commentCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator( "commentCreated" ),
                ( payload, variables ) =>
                {
                    return payload.commentCreated.location === variables.location
                }
            ),
        },
        commentUpdated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator( "commentUpdated" ),
                ( payload, variables ) =>
                {
                    return payload.commentUpdated.location === variables.location
                }
            ),
        },
    },
}

export { resolvers, typeDefs }

