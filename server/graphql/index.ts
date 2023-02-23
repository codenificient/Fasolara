import { DateTimeResolver } from 'graphql-scalars'
import { gql } from 'graphql-tag'

import { resolvers as accountResolvers, typeDefs as accountTypes } from './account/index.js'
import { resolvers as addressResolvers, typeDefs as addressTypes } from './address/index.js'
import { resolvers as bankResolvers, typeDefs as bankTypes } from './bank/index.js'
import { resolvers as commentResolvers, typeDefs as commentTypes } from './comment/index.js'
import { resolvers as convoResolvers, typeDefs as convoTypes } from './conversation/index.js'
import { resolvers as countryResolvers, typeDefs as countryTypes } from './country/index.js'
import { resolvers as orderResolvers, typeDefs as orderTypes } from './order/index.js'
import { resolvers as panelResolvers, typeDefs as panelTypes } from './panel/index.js'
import { resolvers as provinceResolvers, typeDefs as provinceTypes } from './province/index.js'
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
  ${bankTypes} 
  ${commentTypes} 
  ${convoTypes}
  ${countryTypes}
  ${orderTypes}
  ${panelTypes}
  ${provinceTypes}
  ${userTypes}
  ${villageTypes}
`

const resolvers = {
	Date: DateTimeResolver,
	Query: {
		...accountResolvers.Query,
		...addressResolvers.Query,
		...bankResolvers.Query,
		...commentResolvers.Query,
		...convoResolvers.Query,
		...countryResolvers.Query,
		...orderResolvers.Query,
		...panelResolvers.Query,
		...provinceResolvers.Query,
		...userResolvers.Query,
		...villageResolvers.Query
	},
	Mutation: {
		...accountResolvers.Mutation,
		...addressResolvers.Mutation,
		...bankResolvers.Mutation,
		...commentResolvers.Mutation,
		...convoResolvers.Mutation,
		...countryResolvers.Mutation,
		...orderResolvers.Mutation,
		...panelResolvers.Mutation,
		...provinceResolvers.Mutation,
		...userResolvers.Mutation,
		...villageResolvers.Mutation
	},
	Subscription: {
		...accountResolvers.Subscription,
		...addressResolvers.Subscription,
		...bankResolvers.Subscription,
		...commentResolvers.Subscription,
		...convoResolvers.Subscription,
		...countryResolvers.Subscription,
		...orderResolvers.Subscription,
		...panelResolvers.Subscription,
		...provinceResolvers.Subscription,
		...userResolvers.Subscription,
		...villageResolvers.Subscription
	}
}

export { typeDefs, resolvers }
