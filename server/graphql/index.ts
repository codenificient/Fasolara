import { DateTimeResolver } from 'graphql-scalars'
import { gql } from 'graphql-tag'

import { resolvers as accountResolvers, typeDefs as accountTypes } from './account/index.js'
import { resolvers as addressResolvers, typeDefs as addressTypes } from './address/index.js'
import { resolvers as agendaResolvers, typeDefs as agendaTypes } from './agenda/index.js'
import { resolvers as bankResolvers, typeDefs as bankTypes } from './bank/index.js'
import { resolvers as commentResolvers, typeDefs as commentTypes } from './comment/index.js'
import { resolvers as convoResolvers, typeDefs as convoTypes } from './conversation/index.js'
import { resolvers as countryResolvers, typeDefs as countryTypes } from './country/index.js'
import { resolvers as employeeResolvers, typeDefs as employeeTypes } from './employee/index.js'
import { resolvers as investorResolvers, typeDefs as investorTypes } from './investor/index.js'
import { resolvers as locationResolvers, typeDefs as locationTypes } from './location/index.js'
import { resolvers as orderResolvers, typeDefs as orderTypes } from './order/index.js'
import { resolvers as panelResolvers, typeDefs as panelTypes } from './panel/index.js'
import { resolvers as projectResolvers, typeDefs as projectTypes } from './project/index.js'
import { resolvers as provinceResolvers, typeDefs as provinceTypes } from './province/index.js'
import { resolvers as supplierResolvers, typeDefs as supplierTypes } from './supplier/index.js'
import { resolvers as transactionResolvers, typeDefs as transactionTypes } from './transaction/index.js'
import { resolvers as userResolvers, typeDefs as userTypes } from './user/index.js'
import { resolvers as villageResolvers, typeDefs as villageTypes } from './village/index.js'

// Schema definition
const typeDefs = gql`
scalar Date
  type Query {
    _base: String
  }

  type Mutation {
    _base: String
  }

  type Subscription {
    _base: String
  }

  ${accountTypes}
  ${addressTypes}
  ${agendaTypes}
  ${bankTypes} 
  ${commentTypes} 
  ${convoTypes}
  ${countryTypes}
  ${employeeTypes}
  ${investorTypes}
  ${locationTypes}
  ${orderTypes}
  ${panelTypes}
  ${projectTypes}
  ${provinceTypes}
  ${supplierTypes}
  ${transactionTypes}
  ${userTypes}
  ${villageTypes}
`

const resolvers = {
  Date: DateTimeResolver,
  Query: {
    ...accountResolvers.Query,
    ...addressResolvers.Query,
    ...agendaResolvers.Query,
    ...bankResolvers.Query,
    ...commentResolvers.Query,
    ...convoResolvers.Query,
    ...countryResolvers.Query,
    ...employeeResolvers.Query,
    ...investorResolvers.Query,
    ...locationResolvers.Query,
    ...orderResolvers.Query,
    ...panelResolvers.Query,
    ...projectResolvers.Query,
    ...provinceResolvers.Query,
    ...supplierResolvers.Query,
    ...transactionResolvers.Query,
    ...userResolvers.Query,
    ...villageResolvers.Query,
  },
  Mutation: {
    ...accountResolvers.Mutation,
    ...addressResolvers.Mutation,
    ...agendaResolvers.Mutation,
    ...bankResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...convoResolvers.Mutation,
    ...countryResolvers.Mutation,
    ...employeeResolvers.Mutation,
    ...investorResolvers.Mutation,
    ...locationResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...panelResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...provinceResolvers.Mutation,
    ...supplierResolvers.Mutation,
    ...transactionResolvers.Mutation,
    ...userResolvers.Mutation,
    ...villageResolvers.Mutation,
  },
  Subscription: {
    ...accountResolvers.Subscription,
    ...addressResolvers.Subscription,
    ...agendaResolvers.Subscription,
    ...bankResolvers.Subscription,
    ...commentResolvers.Subscription,
    ...convoResolvers.Subscription,
    ...countryResolvers.Subscription,
    ...employeeResolvers.Subscription,
    ...investorResolvers.Subscription,
    ...locationResolvers.Subscription,
    ...orderResolvers.Subscription,
    ...panelResolvers.Subscription,
    ...projectResolvers.Subscription,
    ...provinceResolvers.Subscription,
    ...supplierResolvers.Subscription,
    ...transactionResolvers.Subscription,
    ...userResolvers.Subscription,
    ...villageResolvers.Subscription,
  },
};

export { typeDefs, resolvers }
