import { GraphQLError } from 'graphql'
const Panel = require( "../../models/panel" )
const { combineResolvers } = require( "graphql-resolvers" )
const { isAuthenticated } = require( "./middleware" )
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
  Mutation: {
    createPanel: async ( _, { createPanelInput } ) =>
    {
      try
      {
        // See if an old comment exists with same serial number
        const oldPanel = await Panel.findOne( {
          serialNumber: createPanelInput.serialNumber,
        } )

        if ( oldPanel )
        {
          throw new GraphQLError(
            `A Panel already exists with serial ${createPanelInput.serialNumber}`,
          )
        }
        // Build mongoose model
        const newPanel = new Panel( {
          ...createPanelInput,
        } )

        // Save the user object
        const res = await newPanel.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    },
    updatePanel: combineResolvers(
      isAuthenticated,
      async ( _, { updatePanelInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldPanel = await Panel.findById( updatePanelInput.id )

          if ( !oldPanel )
          {
            throw new GraphQLError(
              "No Panel was found with ID " + updatePanelInput.id,
            )
          }

          // Update old account
          const res = await Panel.findOneAndUpdate(
            { id: updatePanelInput.id },
            { updatePanelInput },
            { new: true }
          )

          return {
            id: res.id,
            ...res._doc,
          }
        } catch ( error )
        {
          console.log( error )
          throw error
        }
      }
    ),
  },
  Query: {
    panel: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
    {
      try
      {
        return await Panel.find( { userId } )
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getPanel: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid", )
      }
      return await Panel.findById( id )
    },
    panels: async () => await Panel.find( {} ),
  },
}
