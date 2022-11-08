const { gql } = require("apollo-server")

module.exports = gql`
  type Address {
    id: ID
    name: String
    mobileNumber: String
    locationId: ID
    villageId: ID
    address: String
    addressType: String
    dotcolor: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateAddressInput {
    id: ID
    name: String
    mobileNumber: String
    locationId: ID
    villageId: ID
    addressType: String
    dotcolor: String
    updatedAt: Date
  }

  input UpdateAddressInput {
    name: String
    mobileNumber: String
    locationId: ID
    villageId: ID
    addressType: String
    dotcolor: String
    updatedAt: Date
  }

  extend type Query {
    address: Address
    getAddress(id: ID): Address
    addresses: [Address!]
  }

  extend type Mutation {
    createAddress(createAddressInput: CreateAddressInput): Address
    updateAddress(updateAddressInput: UpdateAddressInput): Address
  }
`
