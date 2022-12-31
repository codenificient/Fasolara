import { GraphQLError } from 'graphql'
import { combineResolvers } from "graphql-resolvers"
import { AddressModel } from "../../models/address"
import { isAuthenticated } from "./middleware"

interface UpdateAddressInput
{
  id: string
  name: string
  mobileNumber: string
  locationId: string
  villageId: string
  address: string
  addressType: string
  dotcolor: string
  updatedAt: Date
}

export const addressResolvers = {
  Mutation: {
    createAddress: combineResolvers(
      isAuthenticated,
      async ( _, { createAddressInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldAddress = await AddressModel.findOne( {
            address: createAddressInput.address,
          } )

          if ( oldAddress )
          {
            throw new GraphQLError(
              "An address already exists with address" +
              createAddressInput.address,
            )
          }

          // Build mongoose model
          const newAddress = new AddressModel( {
            ...createAddressInput,
          } )

          // Save the user object
          const res = await newAddress.save()

          if ( res )
          {
            return {
              id: res.id,
              ...res._doc,
            }
          }


        } catch ( error )
        {
          console.log( error )
          throw error
        }
      }
    ),
    updateAddress: combineResolvers(
      isAuthenticated,
      async ( _, __, updateAddressInput: UpdateAddressInput ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldAddress = await AddressModel.findById( updateAddressInput.id )

          if ( !oldAddress )
          {
            throw new GraphQLError(
              "No account was found with ID  " + updateAddressInput.id,
            )
          }

          // Update old address
          // update address using provided
          const newAddress = new AddressModel()
          if ( updateAddressInput.name ) newAddress.name = updateAddressInput.name
          if ( updateAddressInput.mobileNumber )
            newAddress.mobileNumber = updateAddressInput.mobileNumber
          if ( updateAddressInput.locationId )
            newAddress.locationId = updateAddressInput.locationId
          if ( updateAddressInput.villageId )
            newAddress.villageId = updateAddressInput.villageId
          if ( updateAddressInput.address )
            newAddress.address = updateAddressInput.address
          if ( updateAddressInput.addressType )
            newAddress.addressType = updateAddressInput.addressType
          if ( updateAddressInput.dotcolor )
            newAddress.dotcolor = updateAddressInput.dotcolor
          if ( updateAddressInput.updatedAt )
            newAddress.updatedAt = updateAddressInput.updatedAt

          const res = await AddressModel.findOneAndUpdate(
            { id: updateAddressInput.id },
            { newAddress },
            { new: true }
          )

          if ( res )
          {

            return {
              id: res.id,
              ...res._doc,
            }
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
    address: combineResolvers( isAuthenticated, async ( _, __, { addressId } ) =>
    {
      try
      {
        const address = await AddressModel.findById( { addressId } )
        if ( !address )
        {
          throw new GraphQLError( "Account not found", )
        }
        return address
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getAddress: async ( id: string ) =>
    {
      return AddressModel.findById( id )
    },
    addresses: async () => await AddressModel.find( {} ),
  },
}