const userResolvers = require("./user")
const accountResolvers = require("./account")
const addressResolvers = require("./address")
const bankResolvers = require("./bank")
const commentResolvers = require("./comment")
const countryResolvers = require("./country")
const employeeResolvers = require("./employee")
const investorResolvers = require("./investor")
const orderResolvers = require("./order")
const panelResolvers = require("./panel")
const projectResolvers = require("./project")
const provinceResolvers = require("./province")
const salaryResolvers = require("./salary")
const supplierResolvers = require("./supplier")
const transactionResolvers = require("./transaction")
const villageResolvers = require("./village")

const { GraphQLDateTime } = require("graphql-iso-date")

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [
  accountResolvers,
  addressResolvers,
  bankResolvers,
  commentResolvers,
  countryResolvers,
  customScalarResolver,
  employeeResolvers,
  investorResolvers,
  orderResolvers,
  panelResolvers,
  projectResolvers,
  provinceResolvers,
  salaryResolvers,
  supplierResolvers,
  transactionResolvers,
  userResolvers,
  villageResolvers,
]
