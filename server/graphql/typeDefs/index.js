const { gql } = require("apollo-server")
const userTypes = require("./user")
const accountTypes = require("./account")
const addressTypes = require("./address")
const bankTypes = require("./bank")
const countryTypes = require("./country")
const employeeTypes = require("./employee")
const orderTypes = require("./order")
const panelTypes = require("./panel")
const projectTypes = require("./project")
const supplierTypes = require("./supplier")
const salaryTypes = require("./salary")
const commentTypes = require("./comment")
const transactionTypes = require("./transaction")
const villageTypes = require("./village")
// const accountTypes = require("./account")

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
module.exports = [
  accountTypes,
  addressTypes,
  bankTypes,
  commentTypes,
  countryTypes,
  employeeTypes,
  orderTypes,
  panelTypes,
  projectTypes,
  supplierTypes,
  salaryTypes,
  transactionTypes,
  villageTypes,
  typeDefs,
  userTypes,
]
