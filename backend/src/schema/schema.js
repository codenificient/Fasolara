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
const Transaction = require('../model/transaction')
const User = require('../model/user')
const Village = require('../model/village')

// SETUP GRAPHQL TYPES
const AccountType = new GraphQLObjectType({
	name: 'Account',
	description:
		'This represent an Account type for storing relevant information regarding the ownership of investment accounts as well as salaries for employees and various other stakeholders',
	fields: () => ({
		id: { type: GraphQLID },
		accountNumber: { type: GraphQLID },
		customerId: { type: GraphQLID },
		balance: { type: GraphQLFloat },
		carrier: { type: GraphQLString },
		solarGroup: { type: GraphQLString },
		debtAmount: { type: GraphQLFloat },
		lifetimeEarning: { type: GraphQLFloat },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		bank: {
			type: BankType,
			resolve(parent, args) {
				return Bank.findById(parent.loaningBankId)
			}
		},
		owner: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.customerId)
			}
		},
		panels: {
			type: new GraphQLList(PanelType),
			resolve(parent, args) {
				return Panel.find({ groupId: parent.solarGroup })
			}
		}
	})
})

const AddressType = new GraphQLObjectType({
	name: 'Address',
	description:
		"This represent an Address type. For delivery and home address purposes, we need to help the country better locate people's addresses",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		mobileNumber: { type: GraphQLString },
		addressType: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
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

const BankType = new GraphQLObjectType({
	name: 'Bank',
	description:
		'This represent a Bank type or any other financial instituation which can provide loans to FasoLara investors as part of the wealth creation scheme',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		branch: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		}
	})
})

const CountryType = new GraphQLObjectType({
	name: 'Country',
	description:
		'This represent a Country type. Added as a way to futureproof the company which might end up expanding to other countries beyond the borders of Burkina',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		population: { type: GraphQLInt },
		continent: { type: GraphQLString },
		polycolor: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		provinces: {
			type: new GraphQLList(ProvinceType),
			resolve(parent, args) {
				return Province.find({ countryId: parent.id })
			}
		}
	})
})

const LocationType = new GraphQLObjectType({
	name: 'Location',
	description:
		'This represent a Location type. It is a placeholder for how to handle GEOJson data which is used for drawing polygons on a map to represent a region, province, country or even an entire continent',
	fields: () => ({
		id: { type: GraphQLID },
		locationId: { type: GraphQLID },
		address: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		location: { type: GraphQLString }
	})
})

const PanelType = new GraphQLObjectType({
	name: 'Panel',
	description:
		'This represent a Panel type, pointing to an individual solar panel. Stores several properties and attributes during the lifetime of a solar panel',
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
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		customer: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.customerId)
			}
		}
	})
})

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	description:
		'This represent a Project type representing a FasoLara permanent and semi perminent installation for producting energy. Tracks various people and organisations involved in the success of each venture',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		zone: { type: GraphQLString },
		dotcolor: { type: GraphQLString },
		impact: { type: GraphQLFloat },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		isActive: { type: GraphQLBoolean },
		isComplete: { type: GraphQLBoolean },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		},
		suppliers: {
			type: new GraphQLList(SupplierType),
			resolve(parent, args) {
				const obj_ids = parent.suppliers.map((obj) => obj.supplierId)
				return Supplier.find({ _id: { $in: obj_ids } })
			}
		}
	})
})

const ProvinceType = new GraphQLObjectType({
	name: 'Province',
	description:
		'This represent a Province type. Every province contains several villages and has a regional seat for administrative purposes which can serve as the main city to base so regional FasoLara offices',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		seat: { type: GraphQLString },
		region: { type: GraphQLString },
		zone: { type: GraphQLString },
		provinceId: { type: GraphQLString },
		polycolor: { type: GraphQLString },
		dotcolor: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		villages: {
			type: new GraphQLList(VillageType),
			resolve(parent, args) {
				return Village.find({ provinceId: parent.id })
			}
		}
	})
})

const SalaryType = new GraphQLObjectType({
	name: 'Salary',
	description:
		'This represent a Salary type for the employees of the company. It is used to track the progress of the carreer of each team member and pay is determined by job title and promotion dates',
	fields: () => ({
		id: { type: GraphQLID },
		jobTitle: { type: GraphQLString },
		startDate: { type: GraphQLString },
		endDate: { type: GraphQLString },
		amount: { type: GraphQLInt },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		employee: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.employeeId)
			}
		}
	})
})

const SupplierType = new GraphQLObjectType({
	name: 'Supplier',
	description:
		'This represent a Supplier type for tracking all kinds of business entities who will one day supply various items needed to the mission of FasoLara. Food, to panels, equipment,e tc.',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		area: { type: GraphQLString },
		isActive: { type: GraphQLBoolean },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
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

const TransactionType = new GraphQLObjectType({
	name: 'Transaction',
	description:
		'This represent a Transaction type for tracking every monetary transaction within the company ranging from orders to salaries and bonuses to donations',
	fields: () => ({
		id: { type: GraphQLID },
		amount: { type: GraphQLFloat },
		memo: { type: GraphQLString },
		tax: { type: GraphQLFloat },
		status: { type: GraphQLString },
		kind: { type: GraphQLString },
		isActive: { type: GraphQLBoolean },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		receiver: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.customerId)
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

const UserType = new GraphQLObjectType({
	name: 'User',
	description:
		'This represent a User with name, national ID, full name, username, date of birth for calculating age, as well as role to determine admins from employees and investors',
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
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		address: {
			type: AddressType,
			resolve(parent, args) {
				return Address.findById(parent.addressId)
			}
		},
		password: { type: GraphQLString },
		confpassword: { type: GraphQLString },
		isActive: { type: GraphQLBoolean },
		hash_password: { type: GraphQLString }
	})
})

const VillageType = new GraphQLObjectType({
	name: 'Village',
	description:
		'This represent a Village type. There are 8 thousand villages in Burkina, but 355 will be used as the base locations from where we can determine the exact geolocation of every FasoLara project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		population: { type: GraphQLInt },
		urbanCommune: { type: GraphQLBoolean },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
		province: {
			type: ProvinceType,
			resolve(parent, args) {
				return Province.findById(parent.provinceId)
			}
		},
		dotcolor: { type: GraphQLString }
	})
})

//#TODO employeeType

/**
 * 
 * #TODO InvestorType
 *  */
const RootQuery = new GraphQLObjectType({
	name: 'RootType',
	fields: {
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
		country: {
			type: CountryType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Country.findById(args.id)
			}
		},
		countries: {
			type: new GraphQLList(CountryType),
			resolve(parent, args) {
				return Country.find({})
			}
		},
		location: {
			type: LocationType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Location.findById(args.id)
			}
		},
		locations: {
			type: new GraphQLList(LocationType),
			resolve(parent, args) {
				return Location.find({})
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
		salary: {
			type: new GraphQLList(SalaryType),
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Salary.findById(args.id)
			}
		},
		salaries: {
			type: new GraphQLList(SalaryType),
			resolve(parent, args) {
				return Salary.find({})
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
		},
		transaction: {
			type: TransactionType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Transaction.findById(args.id)
			}
		},
		transactions: {
			type: new GraphQLList(TransactionType),
			resolve(parent, args) {
				return Transaction.find({})
			}
		},
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
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
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
				solarGroup: { type: new GraphQLNonNull(GraphQLID) }
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
		addBank: {
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
		addCountry: {
			type: CountryType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				locationId: { type: GraphQLID },
				polycolor: { type: GraphQLString },
				continent: { type: new GraphQLNonNull(GraphQLString) },
				population: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let country = new Country({
					name: args.name,
					population: args.population,
					locationId: args.locationId,
					continent: args.continent,
					polycolor: args.polycolor
				})
				return country.save()
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
				suppliers: { type: new GraphQLList(GraphQLID) },
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
		addSalary: {
			type: SalaryType,
			args: {
				jobTitle: { type: GraphQLString },
				startDate: { type: GraphQLString },
				endDate: { type: GraphQLString },
				amount: { type: new GraphQLNonNull(GraphQLFloat) },
				employeeId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let salary = new Salary({
					jobTitle: args.jobTitle,
					endDate: args.endDate,
					amount: args.amount,
					employeeId: args.employeeId
				})
				salary.startDate = new Date()
				return salary.save()
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
		addTransaction: {
			type: TransactionType,
			args: {
				amount: { type: new GraphQLNonNull(GraphQLFloat) },
				accountId: { type: new GraphQLNonNull(GraphQLID) },
				taxRate: { type: new GraphQLNonNull(GraphQLFloat) },
				kind: { type: new GraphQLNonNull(GraphQLString) },
				status: { type: GraphQLString },
				memo: { type: GraphQLString },
				customerId: { type: GraphQLID },
				tax: { type: GraphQLFloat }
			},
			resolve(parent, args) {
				let transaction = new Transaction({
					amount: args.amount,
					accountId: args.accountId,
					customerId: args.customerId,
					taxRate: args.taxRate,
					status: args.status,
					kind: args.kind,
					memo: args.memo,
					tax: args.tax
				})
				return transaction.save()
			}
		},
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

		// UPDATE ALL THE ITEMS
		updateAccount: {
			type: AccountType,
			args: {
				customerId: { type: new GraphQLNonNull(GraphQLID) },
				accountNumber: { type: new GraphQLNonNull(GraphQLString) },
				carrier: { type: new GraphQLNonNull(GraphQLString) },
				debtAmount: { type: GraphQLFloat },
				balance: { type: GraphQLFloat },
				lifetimeEarning: { type: GraphQLFloat },
				loaningBankId: { type: new GraphQLNonNull(GraphQLID) },
				solarGroup: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let localAccount = {}
				if (args.customerId) localAccount.customerId = args.customerId
				if (args.accountNumber) localAccount.accountNumber = args.accountNumber
				if (args.carrier) localAccount.carrier = args.carrier
				if (args.debtAmount) localAccount.debtAmount = args.debtAmount
				if (args.balance) localAccount.balance = args.balance
				if (args.lifetimeEarning) localAccount.lifetimeEarning = args.lifetimeEarning
				if (args.solarGroup) localAccount.solarGroup = args.solarGroup
				return Account.findOneAndUpdate(args.id, localAccount, { new: true })
			}
		},
		updateAddress: {
			type: AddressType,
			args: {
				addressType: { type: GraphQLString },
				created: { type: GraphQLString },
				name: { type: GraphQLString },
				dotcolor: { type: GraphQLString },
				mobileNumber: { type: GraphQLString },
				address: { type: GraphQLString },
				villageId: { type: GraphQLID },
				locationId: { type: GraphQLID }
			},
			resolve(parent, args) {
				let localAddress = {}
				if (args.name) localAddress.name = args.name
				if (args.locationId) localAddress.locationId = args.locationId
				if (args.villageId) localAddress.villageId = args.villageId
				if (args.address) localAddress.address = args.address
				if (args.mobileNumber) localAddress.mobileNumber = args.mobileNumber
				if (args.dotcolor) localAddress.dotcolor = args.dotcolor
				if (args.created) localAddress.created = args.created
				if (args.addressType) localAddress.addressType = args.addressType
				return Address.findOneAndUpdate(args.id, localAddress, { new: true })
			}
		},
		updateBank: {
			type: BankType,
			args: {
				name: { type: GraphQLString },
				addressId: { type: GraphQLID },
				branch: { type: GraphQLString }
			},
			resolve(parent, args) {
				let localBank = {}
				if (args.name) localLocation.name = args.name
				if (args.addressId) localLocation.addressId = args.addressId
				if (args.branch) localLocation.branch = args.branch
				return Bank.findOneAndUpdate(args.id, localBank, { new: true })
			}
		},
		updateCountry: {
			type: CountryType,
			args: {
				locationId: { type: GraphQLID },
				name: { type: GraphQLString },
				polycolor: { type: GraphQLString },
				continent: { type: GraphQLString },
				population: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let localCountry = {}
				if (args.name) localLocation.name = args.name
				if (args.locationId) localLocation.locationId = args.locationId
				if (args.polycolor) localLocation.polycolor = args.polycolor
				if (args.population) localLocation.population = args.population
				if (args.continent) localLocation.continent = args.continent
				return Country.findOneAndUpdate(args.id, localCountry, { new: true })
			}
		},
		updateLocation: {
			type: LocationType,
			args: {
				address: { type: new GraphQLNonNull(GraphQLString) },
				locationId: { type: GraphQLID },
				address: { type: GraphQLString },
				created: { type: GraphQLString },
				location: { type: GraphQLString }
			},
			resolve(parent, args) {
				let localLocation = {}
				if (args.adddressId) localLocation.adddressId = args.adddressId
				if (args.locationId) localLocation.locationId = args.locationId
				if (args.created) localLocation.created = args.created
				return Location.findOneAndUpdate(args.id, localLocation, { new: true })
			}
		},
		updatePanel: {
			type: PanelType,
			args: {
				serialNumber: { type: GraphQLString },
				groupId: { type: GraphQLString },
				customerId: { type: GraphQLID },
				orderDate: { type: GraphQLString },
				installDate: { type: GraphQLString },
				installCost: { type: GraphQLFloat },
				isReplacement: { type: GraphQLBoolean },
				isInstalled: { type: GraphQLBoolean },
				isActive: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let localPanel = {}
				if (args.serialNumber) localPanel.serialNumber = args.serialNumber
				if (args.groupId) localPanel.groupId = args.groupId
				if (args.customerId) localPanel.customerId = args.customerId
				if (args.orderDate) localPanel.orderDate = args.orderDate
				if (args.installDate) localPanel.installDate = args.installDate
				if (args.installCost) localPanel.installCost = args.installCost
				if (args.isReplacement) localPanel.isReplacement = args.isReplacement
				if (args.isInstalled) localPanel.isInstalled = args.isInstalled
				if (args.isActive) localPanel.isActive = args.isActive
				return Panel.findOneAndUpdate(args.id, localPanel, { new: true })
			}
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				zone: { type: GraphQLString },
				addressId: { type: GraphQLID },
				dotcolor: { type: GraphQLString },
				impact: { type: GraphQLFloat },
				created: { type: GraphQLString },
				isActive: { type: GraphQLBoolean },
				isComplete: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let localProject = {}
				if (args.name) localProject.name = args.name
				if (args.zone) localProject.zone = args.zone
				if (args.addressId) localProject.addressId = args.addressId
				if (args.dotcolor) localProject.dotcolor = args.dotcolor
				if (args.impact) localProject.impact = args.impact
				if (args.created) localProject.created = args.created
				if (args.isActive) localProject.isActive = args.isActive
				if (args.isComplete) localProject.isComplete = args.isComplete
				return Project.findOneAndUpdate(args.id, localProject, { new: true })
			}
		},
		updateProvince: {
			type: ProvinceType,
			args: {
				name: { type: GraphQLString },
				region: { type: GraphQLString },
				zone: { type: GraphQLString },
				seat: { type: GraphQLString },
				countryId: { type: GraphQLID },
				polycolor: { type: GraphQLString }
			},
			resolve(parent, args) {
				let localProvince = {}
				if (args.name) localProvince.name = args.name
				if (args.region) localProvince.region = args.region
				if (args.zone) localProvince.zone = args.zone
				if (args.seat) localProvince.seat = args.seat
				if (args.countryId) localProvince.countryId = args.countryId
				if (args.polycolor) localProvince.polycolor = args.polycolor
				return Province.findOneAndUpdate(args.id, localProvince, { new: true })
			}
		},
		updateSalary: {
			type: SalaryType,
			args: {
				jobTitle: { type: GraphQLString },
				startDate: { type: GraphQLString },
				endDate: { type: GraphQLString },
				amount: { type: GraphQLFloat },
				employeeId: { type: GraphQLID }
			},
			resolve(parent, args) {
				let localSalary = {}
				if (args.jobTitle) localSalary.jobTitle = args.jobTitle
				if (args.startDate) localSalary.startDate = args.startDate
				if (args.endDate) localSalary.endDate = args.endDate
				if (args.amount) localSalary.amount = args.amount
				if (args.employeeId) localSalary.employeeId = args.employeeId
				return Salary.findOneAndUpdate(args.id, localSalary, { new: true })
			}
		},
		updateTransaction: {
			type: TransactionType,
			args: {
				amount: { type: GraphQLFloat },
				accountId: { type: GraphQLID },
				taxRate: { type: GraphQLFloat },
				kind: { type: GraphQLString },
				status: { type: GraphQLString },
				memo: { type: GraphQLString },
				customerId: { type: GraphQLID },
				tax: { type: GraphQLFloat }
			},
			resolve(parent, args) {
				let localTransaction = {}
				if (args.amount) localTransaction.amount = args.amount
				if (args.accountId) localTransaction.accountId = args.accountId
				if (args.taxRate) localTransaction.taxRate = args.taxRate
				if (args.kind) localTransaction.kind = args.kind
				if (args.status) localTransaction.status = args.status
				if (args.memo) localTransaction.memo = args.memo
				if (args.customerId) localTransaction.customerId = args.customerId
				if (args.tax) localTransaction.tax = args.tax
				return Transaction.findOneAndUpdate(args.id, localTransaction, { new: true })
			}
		},
		updateVillage: {
			type: VillageType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				population: { type: new GraphQLNonNull(GraphQLInt) },
				provinceId: { type: new GraphQLNonNull(GraphQLID) },
				dotcolor: { type: GraphQLString },
				urbanCommune: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let localVillage = {}
				if (args.name) localVillage.name = args.name
				if (args.population) localVillage.population = args.population
				if (args.urbanCommune) localVillage.urbanCommune = args.urbanCommune
				if (args.dotcolor) localVillage.dotcolor = args.dotcolor
				if (args.provinceId) localVillage.provinceId = args.provinceId
				return Village.findOneAndUpdate(args.id, localVillage, { new: true })
			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				accountId: { type: GraphQLID },
				addressId: { type: GraphQLID },
				role: { type: GraphQLString },
				dob: { type: GraphQLString },
				cnib: { type: GraphQLString },
				firstname: { type: GraphQLString },
				midname: { type: GraphQLString },
				lastname: { type: GraphQLString },
				username: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				confpassword: { type: GraphQLString },
				isActive: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let localUser = {}
				if (args.accountId) localUser.accountId = args.accountId
				if (args.addressId) localUser.addressId = args.addressId
				if (args.cnib) localUser.cnib = args.cnib
				if (args.role) localUser.role = args.role
				if (args.dob) localUser.dob = args.dob
				if (args.firstname) localUser.firstname = args.firstname
				if (args.midname) localUser.midname = args.midname
				if (args.lastname) localUser.lastname = args.lastname
				if (args.email) localUser.email = args.email
				if (args.password) localUser.password = args.password
				if (args.confpassword) localUser.confpassword = args.confpassword
				if (args.isActive) localUser.isActive = args.isActive
				return User.findOneAndUpdate(args.id, localUser, { new: true })
			}
		},
		updateSupplier: {
			type: SupplierType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				accountId: { type: GraphQLID },
				addressId: { type: GraphQLID },
				created: { type: GraphQLString },
				area: { type: GraphQLString },
				isActive: { type: GraphQLBoolean }
			},
			resolve(parent, args) {
				let localSupplier = {}
				if (args.name) localSupplier.name = args.name
				if (args.accountId) localSupplier.accountId = args.accountId
				if (args.addressId) localSupplier.addressId = args.addressId
				if (args.created) localSupplier.created = args.created
				if (args.area) localSupplier.area = args.area
				if (args.isActive) localSupplier.isActive = args.isActive
				return Supplier.findOneAndUpdate(args.id, localSupplier, { new: true })
			}
		},
		updateProjectSupplier: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				supplierId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Project.findOneAndUpdate(
					{ _id: args.id },
					{
						$push: {
							suppliers: {
								$each: [ { supplierId: args.supplierId, hiringDate: new Date() } ]
							}
						}
					},
					{
						new: true
					}
				)
			}
		},

		// DELETE MUTATION FOR ALL ITEMS
		deleteAccount: {
			type: AccountType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Account.findByIdAndDelete({_id: args.id})
			}
		},
		deleteAddress: {
			type: AddressType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Address.findByIdAndDelete({_id: args.id})
			}
		},
		deleteBank: {
			type: BankType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Bank.findByIdAndDelete({_id: args.id})
			}
		},
		deleteCountry: {
			type: CountryType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Country.findByIdAndDelete({_id: args.id})
			}
		},
		deleteLocation: {
			type: LocationType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				l
				return Location.findByIdAndDelete({_id: args.id})
			}
		},
		deletePanel: {
			type: PanelType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Panel.findByIdAndDelete({_id: args.id})
			}
		},
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Project.findByIdAndDelete({_id: args.id})
			}
		},
		deleteProvince: {
			type: ProvinceType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Province.findByIdAndDelete({_id: args.id})
			}
		},
		deleteSalary: {
			type: SalaryType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Salary.findByIdAndDelete({_id: args.id})
			}
		},
		deleteTransaction: {
			type: TransactionType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Transaction.findByIdAndDelete({_id: args.id})
			}
		},
		deleteVillage: {
			type: VillageType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Village.findByIdAndDelete({_id: args.id})
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return User.findByIdAndDelete(args.id)
			}
		},
		deleteSupplier: {
			type: SupplierType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Supplier.findByIdAndDelete({_id: args.id})
			}
		},
		deleteProjectSupplier: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Project.findOneAndUpdate(
					{ _id: args.id },
					{
						$pull: {
							suppliers: {
								$each: [ { supplierId: args.supplierId } ]
							}
						}
					},
					{
						new: true
					}
				)
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
