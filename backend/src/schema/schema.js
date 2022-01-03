const {
	GraphQLError,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString
} = require('graphql')
const Province = require('../model/province')
const User = require('../model/user')
const Village = require('../model/village')
const Address = require('../model/address')
const bcrypt = require('bcrypt')

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		accountId: { type: GraphQLID },
		cnib: { type: GraphQLString },
		fullname: { type: GraphQLString },
		username: { type: GraphQLString },
		dob: { type: GraphQLString },
		email: { type: GraphQLString },
		address: { type: AddressType,
		resolve(parent, args) {
			Address.findById(parent.addressId)
		} },
		password: { type: GraphQLString },
		confpassword: { type: GraphQLString },
		hash_password: { type: GraphQLString },
		created: { type: GraphQLString }
	})
})

const VillageType = new GraphQLObjectType({
	name: 'Village',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		geo: { type: GraphQLString },
		population: { type: GraphQLInt },
		province: {
			type: ProvinceType,
			resolve(parent, args) {
				return Province.findById(parent.provinceId)
			}
		},
		dotcolor: { type: GraphQLString }
	})
})

const ProvinceType = new GraphQLObjectType({
	name: 'Province',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		seat: { type: GraphQLString },
		region: { type: GraphQLString },
		polycolor: { type: GraphQLString },
		dotcolor: { type: GraphQLString },
		created: { type: GraphQLString },
		villages: {
			type: new GraphQLList(VillageType),
			resolve(parent, args) {
				return Village.find({ provinceId: parent.id })
			}
		}
	})
})

const AddressType = new GraphQLObjectType({
	name: 'Address',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		mobileNumber: { type: GraphQLString },
		streetAddress: { type: GraphQLString },
		city: { type: GraphQLString },
		addressType: { type: GraphQLString },
		postalCode: { type: GraphQLString },
		created: { type: GraphQLString },
		village: {
			type:  VillageType,
			resolve(parent, args) {
				return Village.findById(parent.villageId )
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id)
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({})
			}
		},
		village: {
			type: VillageType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Village.findById(args.id)
			}
		},
		villages: {
			type: new GraphQLList(VillageType),
			resolve(parent, args) {
				return Village.find({})
			}
		},
		province: {
			type: ProvinceType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Province.findById(args.id)
			}
		},
		provinces: {
			type: new GraphQLList(ProvinceType),
			resolve(parent, args) {
				return Province.find({})
			}
		},
		address: {
			type: AddressType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Address.findById(args.id)
			}
		},
		addresses: {
			type: new GraphQLList(AddressType),
			resolve(parent, args) {
				return Address.find({})
			}
		},
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				cnib: { type: new GraphQLNonNull(GraphQLString) },
				firstname: { type: new GraphQLNonNull(GraphQLString) },
				lastname: { type: new GraphQLNonNull(GraphQLString) },
				username: { type: new GraphQLNonNull(GraphQLString) },
				dob: { type: GraphQLString },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				confpassword: { type: new GraphQLNonNull(GraphQLString) },
				accountId: { type: GraphQLID },
				addressId: { type: GraphQLID }
			},
			resolve(parent, args) {
				if (args.password !== args.confpassword) {
					return new GraphQLError("Passwords don't match")
				}
				let hashed = bcrypt.hashSync(args.password, 10)
				let user = new User({
					firstname: args.firstname,
					lastname: args.lastname,
					cnib: args.cnib,
					username: args.username,
					dob: args.dob,
					email: args.email,
					accountId: args.accountId,
					cnib: args.cnib
				})
				if (hashed !== '') user.hash_password = hashed
				user.created = new Date()
				return user.save()
			}
		},
		addVillage: {
			type: VillageType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				population: { type: new GraphQLNonNull(GraphQLInt) },
				provinceId: { type: new GraphQLNonNull(GraphQLID) },
				dotcolor: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let village = new Village({
					name: args.name,
					dotcolor: args.dotcolor,
					population: args.population,
					provinceId: args.provinceId
				})
				village.created = new Date()
				return village.save()
			}
		},
		addProvince: {
			type: ProvinceType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				region: { type: new GraphQLNonNull(GraphQLString) },
				zone: { type: new GraphQLNonNull(GraphQLString) },
				seat: { type: new GraphQLNonNull(GraphQLString) },
				polycolor: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let province = new Province({
					name: args.name,
					region: args.region,
					zone: args.zone,
					seat: args.seat,
					polycolor: args.polycolor
				})
				province.created = new Date()
				return province.save()
			}
		},
		addAddress: {
			type: AddressType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
				streetAddress: { type: new GraphQLNonNull(GraphQLString) },
				addressType: { type: new GraphQLNonNull(GraphQLString) },
				postalCode: { type: new GraphQLNonNull(GraphQLString) },
				created: { type: new GraphQLNonNull(GraphQLString) },
				villageId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let address = new Address({
					name: args.name,
					region: args.region,
					zone: args.zone,
					seat: args.seat,
					polycolor: args.polycolor
				})
				address.created = new Date()
				return address.save()
			}
		},
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
