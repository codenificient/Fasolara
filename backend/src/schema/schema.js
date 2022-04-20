const {
	GraphQLError,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

// Import schemas
const Account = require('../model/account')
const Address = require('../model/address')
const Bank = require('../model/bank')
const Country = require('../model/country')
const Location = require('../model/geojson')
const Panel = require('../model/panel')
const Project = require('../model/project')
const Province = require('../model/province')
const Salary = require('../model/salary')
const Supplier = require('../model/supplier')
const User = require('../model/user')
const Village = require('../model/village')

// SETUP GRAPHQL TYPES
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		account: {
			type: AccountType,
			resolve(parent, args) {
				return Account.findById(parent.accountId)
			}
		},
		cnib: { type: GraphQLString },
		fullname: { type: GraphQLString },
		username: { type: GraphQLString },
		dob: { type: GraphQLString },
		email: { type: GraphQLString },
		role: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		},
		password: { type: GraphQLString },
		confpassword: { type: GraphQLString },
		isActive: { type: GraphQLBoolean },
		hash_password: { type: GraphQLString },
		created: { type: GraphQLString }
	})
})

const VillageType = new GraphQLObjectType({
	name: 'Village',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		population: { type: GraphQLInt },
		urbanCommune: { type: GraphQLBoolean },
		province: {
			type: ProvinceType,
			resolve(parent, args) {
				return Province.findById(parent.provinceId)
			}
		},
		dotcolor: { type: GraphQLString }
	})
})

const SalaryType = new GraphQLObjectType({
	name: 'Salary',
	fields: () => ({
		id: { type: GraphQLID },
		startDate: { type: GraphQLString },
		endDate: { type: GraphQLString },
		amount: { type: GraphQLInt },
		employee: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.employeeId)
			}
		}
	})
})

const ProvinceType = new GraphQLObjectType({
	name: 'Province',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		seat: { type: GraphQLString },
		region: { type: GraphQLString },
		zone: { type: GraphQLString },
		provinceId: { type: GraphQLString },
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

const CountryType = new GraphQLObjectType({
	name: 'Country',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		population: { type: GraphQLInt },
		continent: { type: GraphQLString },
		polycolor: { type: GraphQLString },
		provinces: {
			type: new GraphQLList(ProvinceType),
			resolve(parent, args) {
				return Province.find({ countryId: parent.id })
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
		addressType: { type: GraphQLString },
		created: { type: GraphQLString },
		dotcolor: { type: GraphQLString },
		village: {
			type: VillageType,
			resolve(parent, args) {
				return Village.findById(parent.villageId)
			}
		},
		location: {
			type: LocationType,
			resolve(parent, args) {
				return Location.findById(parent.locationId)
			}
		}
	})
})

const LocationType = new GraphQLObjectType({
	name: 'Location',
	fields: () => ({
		id: { type: GraphQLID },
		locationId: { type: GraphQLID },
		address: { type: GraphQLString },
		created: { type: GraphQLString },
		location: { type: GraphQLString }
	})
})

const AccountType = new GraphQLObjectType({
	name: 'Account',
	fields: () => ({
		id: { type: GraphQLID },
		accountNumber: { type: GraphQLID },
		customerId: { type: GraphQLID },
		balance: { type: GraphQLFloat },
		carrier: { type: GraphQLString },
		solarGroup: { type: GraphQLString },
		debtAmount: { type: GraphQLFloat },
		lifetimeEarning: { type: GraphQLFloat },
		created: { type: GraphQLString },
		loaningBankId: { type: GraphQLID },
		owner: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.customerId)
			}
		}
	})
})

const BankType = new GraphQLObjectType({
	name: 'Bank',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		branch: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		}
	})
})

const PanelType = new GraphQLObjectType({
	name: 'Panel',
	fields: () => ({
		id: { type: GraphQLID },
		serialNumber: { type: GraphQLString },
		groupId: { type: GraphQLString },
		installDate: { type: GraphQLString },
		orderDate: { type: GraphQLString },
		installCost: { type: GraphQLFloat },
		isReplacement: { type: GraphQLBoolean },
		isInstalled: { type: GraphQLBoolean },
		isActive: { type: GraphQLBoolean },
		customer: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.customerId)
			}
		}
	})
})

const SupplierType = new GraphQLObjectType({
	name: 'Supplier',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		area: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		},
		account: {
			type: AccountType,
			resolve(parent, args) {
				return Account.findById(parent.accountId)
			}
		}
	})
})

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		zone: { type: GraphQLString },
		dotcolor: { type: GraphQLString },
		impact: { type: GraphQLFloat },
		created: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		},
		suppliers: {
			type: new GraphQLList(SupplierType),
			resolve(parent, args) {
				return Supplier.find({ id: parent.suppliers.supplierId })
			}
		}
	})
})

//#TODO employeeType

/**
 * 
 * #TODO InvestorType
 *  */
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
		account: {
			type: AccountType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Account.findById(args.id)
			}
		},
		accounts: {
			type: new GraphQLList(AccountType),
			resolve(parent, args) {
				return Account.find({})
			}
		},
		bank: {
			type: BankType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Bank.findById(args.id)
			}
		},
		banks: {
			type: new GraphQLList(BankType),
			resolve(parent, args) {
				return Bank.find({})
			}
		},
		panel: {
			type: PanelType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Panel.findById(args.id)
			}
		},
		panels: {
			type: new GraphQLList(PanelType),
			resolve(parent, args) {
				return Panel.find({})
			}
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id)
			}
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find({})
			}
		},
		supplier: {
			type: SupplierType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Supplier.findById(args.id)
			}
		},
		suppliers: {
			type: new GraphQLList(SupplierType),
			resolve(parent, args) {
				return Supplier.find({})
			}
		}
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
				role: { type: GraphQLString },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				confpassword: { type: new GraphQLNonNull(GraphQLString) },
				accountId: { type: GraphQLID },
				isActive: { type: GraphQLBoolean },
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
					role: args.role,
					isActive: args.isActive,
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
				dotcolor: { type: GraphQLString },
				urbanCommune: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let village = new Village({
					name: args.name,
					dotcolor: args.dotcolor,
					population: args.population,
					provinceId: args.provinceId,
					urbanCommune: args.urbanCommune
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
				countryId: { type: new GraphQLNonNull(GraphQLID) },
				polycolor: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let province = new Province({
					name: args.name,
					region: args.region,
					zone: args.zone,
					countryId: args.countryId,
					seat: args.seat,
					polycolor: args.polycolor
				})
				return province.save()
			}
		},
		addAddress: {
			type: AddressType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
				address: { type: new GraphQLNonNull(GraphQLString) },
				addressType: { type: GraphQLString },
				created: { type: GraphQLString },
				dotcolor: { type: GraphQLString },
				villageId: { type: new GraphQLNonNull(GraphQLID) },
				locationId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let address = new Address({
					name: args.name,
					mobileNumber: args.mobileNumber,
					addressType: args.addressType,
					locationId: args.locationId,
					villageId: args.villageId,
					dotcolor: args.dotcolor
				})
				return address.save()
			}
		},
		addLocation: {
			type: LocationType,
			args: {
				address: { type: new GraphQLNonNull(GraphQLString) },
				created: { type: GraphQLString }
			},
			resolve(parent, args) {
				let location = new Location({
					address: args.address,
					locationId: nanoid()
				})
				location.created = new Date()
				return location.save()
			}
		},
		addAccount: {
			type: AccountType,
			args: {
				customerId: { type: new GraphQLNonNull(GraphQLID) },
				accountNumber: { type: new GraphQLNonNull(GraphQLString) },
				carrier: { type: new GraphQLNonNull(GraphQLString) },
				debtAmount: { type: GraphQLFloat },
				balance: { type: GraphQLFloat },
				lifetimeEarning: { type: GraphQLFloat },
				loaningBankId: { type: new GraphQLNonNull(GraphQLID) },
				created: { type: GraphQLString },
				solarGroup: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let account = new Account({
					customerId: args.customerId,
					accountNumber: args.accountNumber,
					carrier: args.carrier,
					debtAmount: args.debtAmount,
					balance: args.balance,
					loaningBankId: args.loaningBankId,
					villageId: args.villageId,
					solarGroup: args.solarGroup
				})
				account.created = new Date()
				return account.save()
			}
		},
		addBank: {
			// Allows users to add a new bank

			type: BankType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				addressId: { type: new GraphQLNonNull(GraphQLID) },
				branch: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let bank = new Bank({
					name: args.name,
					addressId: args.addressId,
					branch: args.branch
				})
				bank.created = new Date()
				return bank.save()
			}
		},
		addPanel: {
			type: PanelType,
			args: {
				serialNumber: { type: new GraphQLNonNull(GraphQLString) },
				groupId: { type: new GraphQLNonNull(GraphQLString) },
				customerId: { type: new GraphQLNonNull(GraphQLID) },
				orderDate: { type: GraphQLString },
				installDate: { type: GraphQLString },
				installCost: { type: GraphQLFloat },
				isReplacement: { type: GraphQLBoolean },
				isInstalled: { type: GraphQLBoolean },
				isActive: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let panel = new Panel({
					serialNumber: args.serialNumber,
					groupId: args.groupId,
					customerId: args.customerId,
					orderDate: args.orderDate,
					installDate: args.installDate,
					installCost: args.installCost,
					isReplacement: args.isReplacement,
					isInstalled: args.isInstalled,
					isActive: args.isActive
				})
				return panel.save()
			}
		},
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				zone: { type: new GraphQLNonNull(GraphQLString) },
				addressId: { type: new GraphQLNonNull(GraphQLID) },
				dotcolor: { type: GraphQLString },
				impact: { type: GraphQLFloat },
				created: { type: GraphQLString },
				supplierId: { type: GraphQLID },
				isActive: { type: GraphQLBoolean },
				isComplete: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let project = new Project({
					name: args.name,
					zone: args.zone,
					dotcolor: args.dotcolor,
					impact: args.impact,
					created: args.created,
					addressId: args.addressId,
					isComplete: args.isComplete,
					isActive: args.isActive
				})
				project.created = new Date()
				if (args.supplierId) {
					project.suppliers.push({
						supplierId: args.supplierId,
						hiringDate: new Date()
					})
				}
				return project.save()
			}
		},
		addSupplier: {
			type: SupplierType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				accountId: { type: new GraphQLNonNull(GraphQLID) },
				addressId: { type: new GraphQLNonNull(GraphQLID) },
				created: { type: GraphQLString },
				area: { type: GraphQLString },
				isActive: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let supplier = new Supplier({
					name: args.name,
					accountId: args.accountId,
					addressId: args.addressId,
					created: args.created,
					area: args.area,
					isActive: args.isActive
				})
				supplier.created = new Date()
				return supplier.save()
			}
		},
		addSalary: {
			type: SalaryType,
			args: {
				startDate: { type: GraphQLString },
				endDate: { type: GraphQLString },
				amount: { type: new GraphQLNonNull(GraphQLFloat) },
				employeeId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let salary = new Salary({
					endDate: args.endDate,
					amount: args.amount,
					employeeId: args.employeeId
				})
				salary.startDate = new Date()
				return salary.save()
			}
		},
		addCountry: {
			type: CountryType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				polycolor: { type: GraphQLString },
				polycolor: { type: GraphQLString },
				continent: { type: new GraphQLNonNull(GraphQLString) },
				population: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let country = new Country({
					name: args.name,
					population: args.population,
					continent: args.continent,
					polycolor: args.polycolor
				})
				return country.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
