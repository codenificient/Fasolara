export default `

  """
  The Village model stores basic information about villages where projects will be located. The basic unit of location. These may need to be created on site with a smartphone to capture gps coordinates
  """
  type Village {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input CreateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  input UpdateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  extend type Query {
    village: Village
    getVillage(id: ID): Village
    villages: [Village!]
  }

  extend type Mutation {
    createVillage(createVillageInput: CreateVillageInput): Village
    updateVillage(updateVillageInput: UpdateVillageInput): Village
  }
`
